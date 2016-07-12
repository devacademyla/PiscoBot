// PiscoBot Script

var commandDescription = {
  name: 'Spotify',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'spotify me [search term]',
  version: 1.0,
  description: 'Search for a song on Spotify.',
  module: 'Fun'
};

global.botHelp.push(commandDescription);

global.piscobot.hears('spotify me (.*)', ['direct_message', 'direct_mention'],
  function(bot, message) {
    var msg = '';
    var spotifyAPI = 'https://api.spotify.com/v1/search?q=' + message.match[1] + '&type=track';
    var err = 'Huh... I couldn\'t find `' + message.match[1] + '` on Spotify. :';
    request.get(url, function(err, res, body) {
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
          msg = ;
          bot.reply(message, msg);
        }
      } else {
        msg = 'Huh... I couldn\'t find `' + message.match[1] + '` on Spotify.';
        bot.reply(message, msg);
      }
    });
  }
);
