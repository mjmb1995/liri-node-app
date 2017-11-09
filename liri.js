var request = require("request");
var myKeys = require("./keys.js");
var fs = require("fs");
var client = myKeys.client;
var spotify = myKeys.spotify;

var nodeArgs = process.argv;
var command = process.argv[2];


var showTweets = function() {
	var queryUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=928165853471707136&count=20"
 
	var params = {screen_name: 'JSmithTestAcct'};

	client.get(queryUrl, params, function(error, tweets, response) {
  		if (!error) {
  			console.log("My latest 20 Tweets!")
  			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
	  		for (var i = 0; i < 20; i++){
	  			var number = i + 1
	  			console.log("Tweet " + number + ":" + tweets[i].text);
	  			console.log("Created on: " + tweets[i].created_at);
	  			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	  		}
  		}
	});
}

var getSong = function(){
	var song = ""
	if (nodeArgs.length === 3){
		song = "The Sign"
	} else {
		song = process.argv[3];
		for (var i = 4; i < nodeArgs.length; i++){
			song += " " + nodeArgs[i]
		}
	}
	spotifySong(song);
}


var spotifySong = function(song){
	 
	spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
		if (err) {
		    return console.log('Error occurred: ' + err);
		}
		 	
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		console.log("The artist is: " + data.tracks.items[0].artists[0].name)
		console.log("The song title is: " + data.tracks.items[0].name)
		if (data.tracks.items[0].preview_url === !null){
			console.log("Here is the preview URL: " + data.tracks.items[0].preview_url)
		} else{
			console.log("Appologies, a Spotify preview URL does not exist for this song.")
		}
		console.log("This is the album the song is from: " + data.tracks.items[0].album.name)

		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
	});
}


var movieThis = function(){
	var movieName = ""
	if (nodeArgs.length === 3){
		movieName = "tt0485947"
	} else {
		movieName = process.argv[3];
		for (var i = 4; i < nodeArgs.length; i++){
		movieName += " " + nodeArgs[i]
		}
	}
	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?i=" + movieName + "&y=&plot=short&apikey=40e9cece";
	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);
	// Then create a request to the queryUrl

	request(queryUrl, function(error, response, body) {
  		// If the request is successful

	    if (!error && response.statusCode === 200) {
	    console.log(JSON.parse(body));
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		console.log("Title: " + JSON.parse(body).Title);
		console.log("Release Year: " + JSON.parse(body).Year);
		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

		  for (var i = 0; i < (JSON.parse(body).Ratings).length; i++){
			if (JSON.parse(body).Ratings[i].Source === 'Rotten Tomatoes'){
		  		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		  	}
		  }
		  
		console.log("Country the movie was produced: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Movie Plot: " + JSON.parse(body).Plot);
		console.log("Notable Actors in the movie: " + JSON.parse(body).Actors);
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
	  	}
	});
}

var doWhatItSays = function(){
	fs.readFile("random.txt", "utf8", function(err, data){
		if (err){
			return console.log(err);
		}
	data = data.split(",");
	spotifySong(data[1]);	
	}) 
}

// bonus section
var logCommands = function(){
	var commandToLog = process.argv[2]

	for (var i = 3; i < nodeArgs.length; i++){
		commandToLog += " " + nodeArgs[i];
	}

	// We then append the contents "commandToLog" into the file
	// If the file didn't exist then it gets created on the fly.
	fs.appendFile("log.txt", commandToLog, function(err) {
  	// If an error was experienced we say it.
	  	if (err) {
	    	console.log(err);
	  	}
	  	// If no error is experienced, we'll log the phrase "Content Added" to our node console.
	  	else {
	    	console.log("Your command has been log!");
	  	}
	});
}

logCommands();

if (command === "my-tweets"){
	showTweets();
} else if (command === "spotify-this-song"){
	// node liri.js spotify-this-song '<song name here>'
	getSong()
} else if(command === "movie-this"){
	movieThis()
} else if(command === "do-what-it-says"){
	doWhatItSays();
} else {
	console.log("Appologies. That command is currently unavailable.\nTry another command.")
}
