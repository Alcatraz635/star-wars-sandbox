const https = require('https');

const host = 'api.cognitive.microsoft.com';
const path = '/bing/v7.0/images/search';

const bingImageSearch = search => new Promise((resolve, reject) => {
  const requestParams = {
    method: 'GET',
    hostname: host,
    path: `${path}?q=${encodeURIComponent(search)}`,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.AZURE_KEY,
    },
  };

  const req = https.request(requestParams, (res) => {
    let body = '';
    res.on('data', (d) => {
      body += d;
    });
    res.on('end', () => {
      if (JSON.parse(body).value) {
        resolve(JSON.parse(body).value[0]);
      } else {
        resolve('');
      }
    });
    res.on('error', (err) => {
      reject(err);
    });
  });
  req.end();
});

module.exports = bingImageSearch;
