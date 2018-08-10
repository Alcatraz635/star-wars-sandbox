const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Character {
        _id: ID
        name: String
        height: Int
        mass: Int
        hairColor: String
        eyeColor: String
        birthYear: String
        image: String
    }
    type Query {
        allCharacters: [Character]
        characters(input: characterInput): [Character]
        character(id: ID): Character
        hello: Character
    }
    input characterInput {
        name: String
        height: Int
        mass: Int
        hairColor: String
        eyeColor: String
        birthYear: String
        image: String
    }
    type Mutation {
        insertCharacter(input: characterInput) : Character
        insertCharacters(input: [characterInput]) : [Character]
        editCharacter(id: ID, input: characterInput) : Character
        removeCharacter(id: ID) : Character
        removeCharacters(ids: [ID]) : [Character]
    }
`;

module.exports = typeDefs;
