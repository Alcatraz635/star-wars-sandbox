const axios = require('axios');

axios.defaults.headers.common['x-apikey'] = process.env.API_KEY;
axios.interceptors.response.use(null, (error) => {
  throw new Error(error.message);
});
