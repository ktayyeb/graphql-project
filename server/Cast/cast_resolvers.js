const fs = require("fs");
let castData= require("../dummy.json").Cast;

const resolvers = {
    Cast:{
    
        __resolveReference(ref){
            let filtered = castData;
            filtered = filtered.filter((val,i) => {
              return val.id === ref.id;
            });
            
            return filtered[0];
          },

          movies(member){
            console.log("here");
            return member.movies.map(id=>({__typename:"Movie",id}));
        }
        
    },

    

    Query: {

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
    
            
    
        //     if(args.moviesIds!=undefined){
        //       console.log("I'm here");
        //       filtered = filtered.filter((val)=>{
    
               
        //       let result = args.moviesIds.every((element)=>{
    
        //         return val.movies.some((found)=>{
        //           return found.id===element;
        //         });
    
        //       });
    
        //       return result;
      
    
        //      });
        //    }
    
        //    if(args.moviesTitles!=undefined){
        //     //console.log("I'm here");
        //     filtered = filtered.filter((val)=>{
    
             
        //     let result = args.moviesTitles.every((element)=>{
    
        //       return val.movies.some((found)=>{
        //         return found.title===element;
        //       });
    
        //     });
    
        //     return result;
    
    
        //    });
        //  }
    
      
            return filtered;
          }

    },

    Mutation:{
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