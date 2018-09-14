require("dotenv").config();
var keys = require("./keys.js");

var request = require("request");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var twitter = new Twitter(keys.twitter);   

// var inquirer = require('inquirer');
const inquirer = require('inquirer');



////////////// ******************* USING INQUIRE *****************************************

// console.log("Im in"); 
// exports.myDateTime = function () {
//     return Date();
// };

inquirer.prompt([
    {
         type: "list",
         message: "Which option would you like to try?",
         choices: ["spotify-this-song", "my-tweets", "movie-this", "do-what-it-says"],
         name: "program",
     },    

 ]).then(function(inquirerResponse){              

         if (inquirerResponse.program === "spotify-this-song" ){
                     inquirer.prompt(

                           {      type: "input",

                                  message: "Please introduce the name of a song:",

                                  name: "action",
                           },
                    ).then(function(actionResponse){
                        spotifyThisSong(actionResponse.action);

                    })

        }
         else if(inquirerResponse.program === "my-tweets"){
            console.log("myTweets()");
            myTweets();
        }

         else if(inquirerResponse.program === "movie-this"){
                     inquirer.prompt(
                           {      type: "input",

                                  message: "Please introduce the name of a movie:",

                                  name: "action",
                           },
                     ).then(function(movieResponse){
                        movieThis(movieResponse.action);
                    })
         }
         else if (inquirerResponse.program === "do-what-it-says"){
            console.log("do what is says");
            doWhatItSays();
         } 

        else {
          console.log("Error");
        }

});

////////////// ******************* Simple Version *****************************************

// var program = process.argv[2];
// var action = process.argv[3];


// if (program.toLowerCase() === "spotify-this-song" ){
//     spotifyThisSong(action);
// }
// else if(program.toLowerCase() === "my-tweets"){
//     myTweets();
// }
// else if(program.toLowerCase() === "movie-this"){
//     movieThis(action);
// }
// else if (program.toLowerCase() === "do-what-it-says"){
//     doWhatItSays();
// }

// else {
//     console.log("Error");
// }

////////////// ******************* SPOTIFY *****************************************


function spotifyThisSong (song){   
    if(song){
        var query = song;
    }  
    else{
        var query = "let it go";
    }

    spotify.search({ type: 'track', query: query , limit: 30 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   console.log(data.tracks.items[0].artists[0].name); 
   console.log(data.tracks.items[0].name); 
   console.log(data.tracks.items[0].preview_url); 
   console.log(data.tracks.items[0].album.name); 
  });
}



////////////// ******************* TWITTER *****************************************


function myTweets(){

    var params = {screen_name: 'nodejs'};
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i =0; i < 20;  i++){
            console.log(tweets[i].text);           
            console.log(tweets[i].created_at + "\n");
        }
           
    }
    }); 

}

////////////// ******************* sOMDB*****************************************

function movieThis (movie){

    if(movie){
        var query = movie;
    }  
    else{
        var query = "IT";
    }
    
    request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        if (!error && response.statusCode === 200) {
            
            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movi: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Year);
            console.log("The Movie's Genre: " + JSON.parse(body).Genre);
            console.log("Country where the movie was produced.: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);

        }
});


}

////////////// ******************* FS command ****************************************

function doWhatItSays (){

    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {

     if (error) {
         return console.log(error);
        }

  console.log(data);

 });
    
}


