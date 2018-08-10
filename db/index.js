const axios = require('axios');

require('./conf');

module.exports = class CharactersDatabase {
  constructor() {
    this.BASE_URL = 'https://starwarssandbox-ed1c.restdb.io/rest/characters';
  }

  find(id) {
    return axios
      .get(`${this.BASE_URL}/${id}`)
      .then(({ data }) => data);
  }

  findBatch(query) {
    const url = (`${this.BASE_URL}${query ? `?q=${JSON.stringify(query)}` : ''}`).toString();
    return axios
      .get(url)
      .then(({ data }) => data);
  }

  insert(doc) {
    return axios
      .post(this.BASE_URL, doc)
      .then(({ data }) => data);
  }

  edit(id, doc) {
    return axios
      .put(`${this.BASE_URL}/${id}`, doc)
      .then(({ data }) => data);
  }

  async remove(id) {
    const character = await this.find(id);
    await axios
      .delete(`${this.BASE_URL}/${id}`)
      .then(({ data }) => data);
    return character;
  }

  async removeBatch(batch) {
    const res = await Promise.all(batch.map(id => this.remove(id)));
    return res;
  }
};
