const CharacterDatabase = require('../db');

const db = new CharacterDatabase();

module.exports = {
  Query: {
    allCharacters: async () => db.findBatch(),
    characters: async (root, { input }) => db.findBatch(input),
    character: async (root, { id }) => db.find(id),
  },
  Mutation: {
    insertCharacter: async (root, { input }) => db.insert(input),
    insertCharacters: async (root, { input }) => db.insert(input),
    editCharacter: async (root, { id, input }) => db.edit(id, input),
    removeCharacter: async (root, { id }) => db.remove(id),
    removeCharacters: async (root, { ids }) => db.removeBatch(ids),
  },
};
