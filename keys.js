var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter({
  consumer_key: '5rM6xk5nN3trJZge8miceCudn',
  consumer_secret: 'NczBW2VIbzIrjjWo6iZJfdmEl937Ien5UKjgE0aHNOv1JQNHAW',
  access_token_key: '928165853471707136-cGpiEjoJCfRfaR3zhs79CR2VEGXRUoX',
  access_token_secret: 'mw1r5j8AKkrgvGNqeSwmkTMYBW6WIO3Jif4jYSJ6VZOz5'
});

var spotify = new Spotify({
	id: "781a395eb3ff4da2a3931c821b86f4ee",
	secret: "f84b4f6c1ca840d3bf7d2b281d766915"
});

module.exports = {
	client: client, 
	spotify: spotify
};