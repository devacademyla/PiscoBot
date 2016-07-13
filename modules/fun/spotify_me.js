// PiscoBot Script

var spotifyDescription = {
  name: 'Spotify',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'spotify me [search term]',
  version: 1.0,
  description: 'Search for a song on Spotify.',
  module: 'Fun'
};

global.botHelp.push(spotifyDescription);

var request = require('request');
global.piscobot.hears('spotify me (.*)', ['direct_message', 'direct_mention'],
  function(bot, message) {
    var spotifyAPI = 'https://api.spotify.com/v1/search?q=' + message.match[1] + '&type=track';
    var error = 'Huh... I couldn\'t find `' + message.match[1] + '` on Spotify. :';
    request.get(spotifyAPI, function(err, res, body) {
      if(!err && res.statusCode === 200) {
        var response = JSON.parse(body);
        var tracks = response.tracks.items.length;
        // jscs:disable
        // Disabled because `external_urls` is an external
        // variables and is not part of the application.
        var urls = response.tracks.items[0].external_urls;
        // jscs:enable
        if(tracks > 0 && urls !== null) {
          bot.reply(message, urls.spotify);
        } else {
          bot.reply(message, error);
        }
      } else {
        bot.reply(message, error);
      }
    });
  }
);
