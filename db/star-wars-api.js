const { RESTDataSource } = require('apollo-datasource-rest');
const merge = require('lodash.merge');

const { formatCharacter, formatStarship } = require('./conf');
const bingImageSearch = require('./bing-images');

module.exports = class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.co/api/';
    this.films = {
      1: 'The Phantom Menace',
      2: 'Attack of the Clones',
      3: 'Revenge of the Sith',
      4: 'A New Hope',
      5: 'The Empire Strikes Back',
      6: 'Return of the Jedi',
      7: 'The Force Awakens',
    }
  }

  willSendRequest(request) {
    request.headers.set('Ocp-Apim-Subscription-Key', process.env.AZURE_KEY);
  }

  async getPeople(id) {
    return this.get(`people/${id}`);
  }

  async getFilms(id) {
    return this.get(`films/${id}`);
  }

  async getStarships(id) {
    return this.get(`starships/${id}`);
  }

  async getVehicles(id) {
    return this.get(`vehicles/${id}`);
  }

  async getSpecies(id) {
    return this.get(`species/${id}`);
  }

  async getPlanets(id) {
    return this.get(`planets/${id}`);
  }

  async getSuggestions(input, type) {
    let results;
    if (type) {
      const res = await this.get(`${type}?search=${encodeURIComponent(input)}`);
      results = res.results; // eslint-disable-line
    } else {
      const [people, starships] = await Promise.all([
        await this.get(`people?search=${encodeURIComponent(input)}`),
        await this.get(`starships?search=${encodeURIComponent(input)}`),
      ]);
      results = merge(people.results, starships.results);
    }
    const formattedSuggestions = await results.map(suggestion => suggestion.mass
      ? formatCharacter(suggestion)
      : formatStarship(suggestion));
    await formattedSuggestions.forEach(suggestion => {
      const suggestionFilms = suggestion.films.map(film => {
        const episodeNumber = film.split('/')[film.split('/').length - 2];
        return this.films[episodeNumber];
      });
      suggestion.films = suggestionFilms;
      return suggestion;
    });
    const images = await Promise
      .all(formattedSuggestions.map(result => bingImageSearch(result.name)));
    await images.forEach((image, index) => {
      if (image) {
        formattedSuggestions[index].image = image.thumbnailUrl;
      }
    });
    console.log(formattedSuggestions);
    return formattedSuggestions;
  }
};
