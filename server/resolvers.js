const castData= require("./dummy.json").Cast;
const moviesData= require("./dummy.json").Movies;

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