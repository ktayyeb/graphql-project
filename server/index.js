const {ApolloServer} = require('apollo-server');
const {ApolloGateway} = require('@apollo/gateway');

const port = 4000;

const gateway = new ApolloGateway({
    serviceList: [
        {"name": "movies", url:"http://localhost:4001"},
        {"name": "cast", url:"http://localhost:4002"},
    ]
});

// const typeDefs = require('./schema');
// const resolvers = require('./resolvers');

const server = new ApolloServer({ gateway, subscriptions:false});

console.log("object");

server.listen(port).then(({url})=> {
    console.log(`server is running\nlistening on port port ${url}`)
});
