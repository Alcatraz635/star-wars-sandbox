const axios = require('axios');

axios.defaults.headers.common['x-apikey'] = process.env.API_KEY;

axios.interceptors.response.use((res) => res.data, (error) => {
  console.error(error.message);
});

const formatCharacter = ({
                            name, height, mass, hair_color, eye_color, birth_year, films // eslint-disable-line
}) => {
  const suggestion = {
    name,
    height,
    mass,
    hairColor: hair_color,
    eyeColor: eye_color,
    birthYear: birth_year,
    films,
  };
  Object.keys(suggestion).forEach(key => {
    if (suggestion[key] === 'unknown') {
      suggestion[key] = null;
    }
  });
  return suggestion;
};

const formatStarship = ({
  MGLT,
  cargo_capacity, // eslint-disable-line
  cost_in_credits, // eslint-disable-line
  crew,
  hyperdrive_rating, // eslint-disable-line
  length,
  manufacturer,
  max_atmosphering_speed, // eslint-disable-line
  model,
  name,
  passengers,
  starship_class, // eslint-disable-line
  films,
}) => {
  const suggestion = {
    MGLT,
    cargoCapacity: cargo_capacity,
    costInCredits: cost_in_credits,
    crew,
    hyperdriveRating: hyperdrive_rating,
    length,
    manufacturer,
    maxAtmospheringSpeed: max_atmosphering_speed,
    model,
    name,
    passengers,
    starshipClass: starship_class,
    films,
  };
  Object.keys(suggestion).forEach(key => {
    if (suggestion[key] === 'unknown') {
      suggestion[key] = null;
    }
  });
  return suggestion;
};

module.exports = { formatCharacter, formatStarship };
