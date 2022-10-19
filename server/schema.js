const { gql } = require('apollo-server');

const typeDefs=gql`
type Query {
    Cast: [Member]
    Movies: [Movie]
}

type Member {
    "The id of the cast member"
    id:ID!

    "The cast member's name"
    name: String!

    "The cast member's birthdate"
    birthdate: String!

    "The cast member's nationality"
    nation:String!

    "The movies that he/she played a role in"
    movies:[Movie]
}


"A track is a group of Modules that teaches about a specific topic"
type Movie{
    "The unique id for the movie"
    id: ID!

    "The title of the movie"
    title: String!

    "The list of names of the cast members"
    cast: [String!]

    "year of release"
    year: Int

    "The runtime of the movie in minutes"
    length: Int

    "Movie's Rating"
    rating: Float
    
}
`;


module.exports = typeDefs;



