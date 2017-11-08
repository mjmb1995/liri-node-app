
var request = require("request");
var client = require("./keys.js");

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

if (command === "my-tweets"){
	showTweets();
} else if (command === "spotify-this-song"){
	spotifySong()
} else if(command === "movie-this"){
	movieThis()
} else if(command === "do-what-it-says"){
	doWhatItSays();
} else {
	console.log("Appologies. That command is currently unavailable.\nTry another command.")
}


