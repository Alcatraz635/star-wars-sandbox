const axios = require('axios');

module.exports = class CharactersAPI {
  constructor() {
    this.baseURL = 'https://starwarssandbox-ed1c.restdb.io/rest/characters';
  }

  async find(id) {
    return axios.get(`${this.baseURL}/${id}`);
  }

  async findBatch(query) {
    const url = await (`${this.baseURL}${query ? `?q=${JSON.stringify(query)}` : ''}`).toString();
    return axios.get(url);
  }

  async insert(doc) {
    return axios.post(this.baseURL, doc);
  }

  async edit(id, doc) {
    return axios.put(`${this.baseURL}/${id}`, doc);
  }

  async remove(id) {
    const character = await this.find(id);
    await axios.delete(`${this.baseURL}/${id}`);
    return character;
  }

  async removeBatch(batch) {
    return Promise.all(batch.map(id => this.remove(id)));
  }
};
