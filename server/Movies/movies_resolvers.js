const fs = require("fs");
let moviesData= require("../dummy.json").Movies;


const resolvers = {
  Movie: {
    __resolveReference(ref){
      let filtered = moviesData;
      filtered = filtered.filter((val,i) => {
      //console.log(i);
        return val.id === ref.id;
      });
      
      return filtered[0];
    },
    
    cast(movie){
      console.log("here");
      return movie.cast.map(id=>({__typename:"Cast",id}));
  }

  },

  Query: {
    Movies(parent, args, context, info) {
      let filtered = moviesData;

      if (args.id != undefined) {
        filtered = filtered.filter((val) => {
          return val.id === args.id;
        });
      }

      if (args.title != undefined) {
        filtered = filtered.filter((val) => {
          return val.title === args.title;
        });
      }

      if (args.year != undefined) {
        filtered = filtered.filter((val) => {
          return val.year === args.year;
        });
      }

      if (args.length != undefined) {
        filtered = filtered.filter((val) => {
          return val.length === args.length;
        });
      }

      if (args.rating != undefined) {
        filtered = filtered.filter((val) => {
          return val.rating === args.rating;
        });
      }
      return filtered;
    },
  },

  Mutation: {
    addMovie(_, { id, title, cast, year, length, rating }) {
      const newMovie = { id, title, cast, year, length, rating };
      moviesData.push(newMovie);
      const jsonString = JSON.stringify(moviesData);
      fs.writeFile("./movies.json", jsonString, (err) => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });
      return newMovie;
    },
  },
};

  module.exports = resolvers;