const {ApolloServer,gql} = require('apollo-server');
const {buildFederatedSchema} = require('@apollo/federation');
const resolvers = require('./movies_resolvers');

const port = 4001;

const typeDefs=gql`

"A track is a group of Modules that teaches about a specific topic"

type Movie @key(fields : "id") {
    "The unique id for the movie"
    id: ID

    "The title of the movie"
    title: String

    "The list of names of the cast members"
    cast: [Cast]

    "year of release"
    year: Int

    "The runtime of the movie in minutes"
    length: Int

    "Movie's Rating"
    rating: Float
    
}

extend type Cast @key(fields:"id"){
    id:ID @external
}

extend type Query {    
    Movies(id:ID,title:String,year:Int,length:Int,rating:Float): [Movie]
}

extend type Mutation{
    addMovie(id:ID,title:String,cast:[String],year:Int,length:Int,rating:Float): Movie
}

`;


const server = new ApolloServer({ schema: buildFederatedSchema([{typeDefs,resolvers}]) });

server.listen({port}).then(({url})=> {
    console.log(`movies is up and running\nlistening on port ${url}`);
});
