# liri-node-app

Language Interpretation and Recognition Interface (LIRI)

App can take the following commands:

node liri.js my-tweets
	-Shows my most recent 20 tweets

node liri.js spotify-this-song '<song name here>'
	-This will show the following information about the song in your terminal/bash window:
		* Artist(s)
		* The song's name
		* A preview link of the song from Spotify
		* The album that the song is from
	-If no song is provided then the program will default to "The Sign" by Ace of Base.


node liri.js movie-this '<movie name here>'
	-This will output the following information to your terminal/bash window:
	   * Title of the movie.
	   * Year the movie came out.
	   * IMDB Rating of the movie.
	   * Rotten Tomatoes Rating of the movie.
	   * Country where the movie was produced.
	   * Language of the movie.
	   * Plot of the movie.
	   * Actors in the movie.
	-If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


node liri.js do-what-it-says
	-It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt