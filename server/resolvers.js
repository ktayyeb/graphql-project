const fs = require("fs");
let castData= require("./dummy.json").Cast;
let moviesData= require("./dummy.json").Movies;

const resolvers = {
    Query: {

      Movies(parent,args, context,info) {
        let filtered = moviesData;
        
        if(args.id!=undefined){
          filtered = filtered.filter((val)=>{
            return val.id===args.id;
          });
        }

        if(args.title!=undefined){
           filtered = filtered.filter((val)=>{
            return val.title===args.title;
          });
        }

        if(args.year!=undefined){
           filtered = filtered.filter((val)=>{
            return val.year===args.year;
          });
        }

        if(args.length!=undefined){
          filtered = filtered.filter((val)=>{
           return val.length===args.length;
         });
       }

        if(args.rating!=undefined){
          filtered = filtered.filter((val)=>{
           return val.rating===args.rating;
         });
       }
        return filtered;
      },

      Cast(parent,args, context,info){
        let filtered = castData;
        
        if(args.id!=undefined){
          filtered = filtered.filter((val)=>{
            return val.id===args.id;
          });
        }

        if(args.name!=undefined){
           filtered = filtered.filter((val)=>{
            return val.name===args.name;
          });
        }

        if(args.birthdate!=undefined){
           filtered = filtered.filter((val)=>{
            return val.birthdate===args.birthdate;
          });
        }

        if(args.nation!=undefined){
           filtered = filtered.filter((val)=>{
            return val.nation===args.nation;
          });
        }

        

        if(args.moviesIds!=undefined){
          console.log("I'm here");
          filtered = filtered.filter((val)=>{

           
          let result = args.moviesIds.every((element)=>{

            return val.movies.some((found)=>{
              return found.id===element;
            });

          });

          return result;
  

         });
       }

       if(args.moviesTitles!=undefined){
        //console.log("I'm here");
        filtered = filtered.filter((val)=>{

         
        let result = args.moviesTitles.every((element)=>{

          return val.movies.some((found)=>{
            return found.title===element;
          });

        });

        return result;


       });
     }



        return filtered;
      },
    },

    Mutation:{
      addMovie(_,{id,title,cast,year,length,rating}){
        const newMovie = {id,title,cast,year,length,rating};
        moviesData.push(newMovie);
        const jsonString = JSON.stringify(moviesData);
            fs.writeFile('./movies.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err);
                } else {
                    console.log('Successfully wrote file');
                }
            });
        return newMovie
      },

      addMember(_,{id,name,birthdate,nation}){
        const newMember = {id,name,birthdate,nation};
        castData.push(newMember);
        const jsonString = JSON.stringify(castData);
            fs.writeFile('./members.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err);
                } else {
                    console.log('Successfully wrote file');
                }
            });
        return newMember
      }



    },
  };

  module.exports = resolvers;