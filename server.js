if (process.env !== 'production') {
  require('dotenv').config();
}

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const { app, apolloServer } = require('./app');

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i += 1) {
    const worker = cluster.fork();
    worker.on('listening', ({ port }) => console.log(`worker ${worker.process.pid} listening on http://${HOST}:${port}`));
    worker.on('exit', (code, signal) => {
      if (signal) {
        console.log(`worker was killed by signal: ${signal}`);
      } else if (code !== 0) {
        console.log(`worker exited with error code: ${code}`);
      } else {
        console.log('worker success!');
      }
    });
  }
} else {
  app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://${HOST}:${PORT}${apolloServer.graphqlPath}`));
}
