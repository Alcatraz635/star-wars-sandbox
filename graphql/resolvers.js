const GraphQLJSON = require('graphql-type-json');

module.exports = {
  SuggestionResult: {
    __resolveType(obj) {
      if (obj.hairColor) {
        return 'Character';
      }
      if (obj.hyperdriveRating) {
        return 'Starship';
      }
      return null;
    },
  },
  JSON: GraphQLJSON,
  Film: {
    THE_PHANTOM_MENACE: 'The Phantom Menace',
    ATTACK_OF_THE_CLONES: 'Attack of the Clones',
    THE_REVENGE_OF_THE_SITH: 'Revenge of the Sith',
    A_NEW_HOPE: 'A New Hope',
    THE_EMPIRE_STRICKS_BACK: 'The Empire Strikes Back',
    RETURN_OF_THE_JEDI: 'Return of the Jedi',
    THE_FORCE_AWAKENS: 'The Force Awakens',
  },
  Query: {
    allCharacters:
      async (_source, args, { dataSources }) => dataSources.charactersAPI.findBatch(),
    characters:
      async (_source, { input }, { dataSources }) => dataSources.charactersAPI.findBatch(input),
    character:
      async (_source, { id }, { dataSources }) => dataSources.charactersAPI.find(id),
    allStarships:
      async (_source, args, { dataSources }) => dataSources.starshipsAPI.findBatch(),
    starships:
      async (_source, { input }, { dataSources }) => dataSources.starshipsAPI.findBatch(input),
    starship:
      async (_source, { id }, { dataSources }) => dataSources.starshipsAPI.find(id),
    suggest:
      async (_source, { input, type }, { dataSources }) => dataSources.starWarsAPI
        .getSuggestions(input, type),
  },
  Mutation: {
    insertCharacter:
      async (_source, { input }, { dataSources }) => dataSources.charactersAPI.insert(input),
    insertCharacters:
      async (_source, { input }, { dataSources }) => dataSources.charactersAPI.insert(input),
    editCharacter:
      async (_source, { id, input }, { dataSources }) => dataSources.charactersAPI.edit(id, input),
    removeCharacter:
      async (_source, { id }, { dataSources }) => dataSources.charactersAPI.remove(id),
    removeCharacters:
      async (_source, { ids }, { dataSources }) => dataSources.charactersAPI.removeBatch(ids),
  },
};
