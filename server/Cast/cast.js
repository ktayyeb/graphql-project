const {ApolloServer,gql} = require('apollo-server');
const {buildFederatedSchema} = require('@apollo/federation');
const resolvers = require('./cast_resolvers');

const port = 4002;

const typeDefs=gql`

type Cast @key(fields:"id") {
    "The id of the cast member"
    id:ID
    
    "The cast member's name"
    name: String
    
    "The cast member's birthdate"
    birthdate: String
    
    "The cast member's nationality"
    nation:String
    
    "The movies that he/she played a role in"
    movies:[Movie]
}

extend type Movie @key(fields:"id"){
    id:ID @external
    
}

extend type Query {    
    Cast(id:ID,name:String,birthdate:String,nation:String,moviesIds:[ID],moviesTitles:[String]): [Cast]
}

extend type Mutation{
    addMember(id:ID,name:String,birthdate:String,nation:String): Cast
}

`;


const server = new ApolloServer({ schema: buildFederatedSchema([{typeDefs,resolvers}])});

server.listen({port}).then(({url})=> {
    console.log(`cast is up and running\nlistening on port ${url}`);
});
