'use strict';

var request = require('request');

function spotify(bot, controller, message) {
  var msg = '';
  var url = 'https://api.spotify.com/v1/search?q=';
  url += message.match[1] + '&type=track';
  request.get(url, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      var response = JSON.parse(body);
      var tracks = response.tracks.items.length;
      // jscs:disable
      // Disabled because `external_urls` is an external
      // variables and is not part of the application.
      var urls = response.tracks.items[0].external_urls;
      // jscs:enable
      if (tracks > 0 && urls !== null) {
        bot.reply(message, urls.spotify);
      } else {
        msg = 'Huh... I couldn\'t find `' + message.match[1] + '` on Spotify.';
        bot.reply(message, msg);
      }
    } else {
      msg = 'Huh... I couldn\'t find `' + message.match[1] + '` on Spotify.';
      bot.reply(message, msg);
    }
  });
}

module.exports = {
  name: 'spotify me',
  author: 'Daniel Gallegos (thattacoguy)',
  patterns: ['spotify me (.*)'],
  types: ['direct_message', 'direct_mention'],
  description: 'Search for a song on Spotify',
  command: spotify,
};
