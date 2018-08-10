const express = require('express');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/type-defs');
const resolvers = require('./graphql/resolvers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true,
}));


app.use(express.static(path.join(__dirname, 'client', 'build')));

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.applyMiddleware({ app });

module.exports = { app, apolloServer };
