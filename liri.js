require('dotenv').config()

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var keys = require("./keys.js");

var spot = new Spotify(keys.spotify);
var tweet = new Twitter(keys.twitter);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv;
var command = input[2];
var search = input[3];

if (command === "my-tweets") {
    client.get('search/tweets', { q: search, count: 20, result_type: 'recent' }, function (error, tweets, response) {
        for (var i = 0; i < tweets.statuses.length; i++) {
            console.log(JSON.stringify(tweets.statuses[i].created_at) + " " + JSON.stringify(tweets.statuses[i].text));
        }
    });
}

else if (command === "spotify-this-song") {
    if (search == null) {
        spotify
            .search({ type: 'track', query: 'The Sign Ace of Base', limit: 1 })
            .then(function (response) {
                console.log(JSON.stringify(response.tracks.items[0].album.artists[0].name));
                console.log(JSON.stringify(response.tracks.items[0].album.external_urls.spotify));
                console.log(JSON.stringify(response.tracks.items[0].album.name));
                console.log(JSON.stringify(response.tracks.items[0].name));
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    else {
        spotify
            .search({ type: 'track', query: search, limit: 1 })
            .then(function (response) {
                console.log(JSON.stringify(response.tracks.items[0].album.artists[0].name));
                console.log(JSON.stringify(response.tracks.items[0].album.external_urls.spotify));
                console.log(JSON.stringify(response.tracks.items[0].album.name));
                console.log(JSON.stringify(response.tracks.items[0].name));
            })
            .catch(function (err) {
                console.log(err);
            });


    }
}
else if (command === "movie-this") {

    var queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + search;

    if (userQuery == null) {
        userQuery = "Mr. Nobody";
    }
    request.get(queryURL, function (error, response, body) {
        if (error) {
            console.log('error:', error);
        }

        var results = JSON.parse(body);

        console.log(results.Title);
        console.log(results.Year);
        console.log(results.Ratings[0].Value);
        console.log(results.Ratings[1].Value);
        console.log(results.Country);
        console.log(results.Language);
        console.log(results.Plot);
        console.log(results.Actors);
    });
}

else if (command === "do-what-it-says") {
    var fs = require('fs');

    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        var dataSplit = data.split(',"');
        console.log(data);
    });
}
