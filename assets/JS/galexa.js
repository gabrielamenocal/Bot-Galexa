require("dotenv").config();
var keys = require("./keys.js");

var request = require("request");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var twitter = new Twitter(keys.twitter);   



////////////// ******************* SPOTIFY *****************************************



var program = process.argv[2];
var action = process.argv[3];


if (program.toLowerCase() === "spotify-this-song" ){
    spotifyThisSong(action);
}
else if(program.toLowerCase() === "my-tweets"){
    myTweets();
}
else if(program.toLowerCase() === "movie-this"){
    movieThis(action);
}
else if (program.toLowerCase() === "do-what-it-says"){
    doWhatItSays();
}

else {
    console.log("Error");
}



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

////////////// ******************* OMDB*****************************************

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

////////////// ******************* FS command****************************************

function doWhatItSays (){

    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {

     if (error) {
         return console.log(error);
        }

  console.log(data);

 });
    
}


