const castData= require("./dummy.json").Cast;
const moviesData= require("./dummy.json").Movies;
const test=require('./test.json');

const resolvers = {
    Query: {
      Cast() {
        return castData;
      },
    },

    Query: {
        Movies() {
          return moviesData;
        },
      },

  };

  module.exports = resolvers;