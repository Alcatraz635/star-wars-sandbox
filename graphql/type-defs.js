const { gql } = require('apollo-server-express');

const typeDefs = gql`
    union SuggestionResult = Character | Starship
    scalar JSON
    enum Film {
        THE_PHANTOM_MENACE
        ATTACK_OF_THE_CLONES
        THE_REVENGE_OF_THE_SITH
        A_NEW_HOPE
        THE_EMPIRE_STRICKS_BACK
        RETURN_OF_THE_JEDI
        THE_FORCE_AWAKENS
    }
    type Character {
        _id: ID
        name: String
        height: String
        mass: String
        hairColor: String
        eyeColor: String
        birthYear: String
        image: String
        films: [Film]
    }
    type Starship {
        _id: ID
        MGLT: String
        cargoCapacity: String
        costInCredits: String
        crew: String
        hyperdriveRating: String
        length: String
        manufacturer: String
        maxAtmospheringSpeed: String
        model: String
        name: String
        passengers: String
        starshipClass: String
        image: String
        films: [Film]
    }
    type Query {
        allCharacters: [Character]
        characters(input: CharacterInput): [Character]
        character(id: ID): Character
        allStarships: [Starship]
        starships(input: CharacterInput): [Starship]
        starship(id: ID): Starship
        suggest(input: String, type: String) : [SuggestionResult]
        byFilm(film: Film) : [SuggestionResult]
    }
    input CharacterInput {
        name: String
        height: String
        mass: String
        hairColor: String
        eyeColor: String
        birthYear: String
        image: String
        films: [String]
    }
    type Mutation {
        insertCharacter(input: CharacterInput) : Character
        insertCharacters(input: [CharacterInput]) : [Character]
        editCharacter(id: ID, input: CharacterInput) : Character
        removeCharacter(id: ID) : Character
        removeCharacters(ids: [ID]) : [Character]
    }
`;

module.exports = typeDefs;
