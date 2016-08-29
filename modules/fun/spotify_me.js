// PiscoBot Script

var commandDescription = {
  name: 'Spotify Me',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'spotify me [search term]',
  description: 'Search for a song on Spotify.',
  module: 'Fun'
};

global.botHelp.push(commandDescription);

var request = require('request');
global.piscobot.hears('spotify me (.*)', ['direct_message', 'direct_mention'],
  function(bot, message) {
    var spotifyAPI = 'https://api.spotify.com/v1/search?q=' + message.match[1] + '&type=track';
    var error = 'Huh... I couldn\'t find `' + message.match[1] + '` on Spotify.';
    request.get(spotifyAPI, function(err, res, body) {
      if(!err && res.statusCode === 200) {
        var response = JSON.parse(body);
        var tracks = response.tracks.items.length;
        var result = response.tracks.items[0];
        if(tracks > 0 && result !== null) {
          var artistList = '';
          for(var artist of result.artists) {
            artistList += artist.name + ', ';
          }
          artistList = artistList.slice(0, -2);
          var songObject = {
            'attachments': [{
              'fallback': result.name,
              'color': '#1DD069',
              'pretext': 'Here\'s what I found for "' + message.match[1] +
                '" on Spotify:',
              'author_name': artistList,
              'author_link': result.album.external_urls.spotify,
              'title': result.name,
              'title_link': result.external_urls.spotify,
              'text': result,
              'fields': [{
                'title': 'Open this in Spotify',
                'value': '<' + result.uri + '|Click Here>',
                'short': true
              }, {
                'title': 'See this song on the web',
                'value': '<' + result.external_urls.spotify + '|Click Here>',
                'short': true
              }],
              'thumb_url': result.album.images[0].url,
              'footer': 'Spotify',
              'footer_icon': 'http://i.imgur.com/FzytcEk.png'
            }]
          };
          bot.reply(message, songObject);
        } else {
          bot.reply(message, error);
        }
      } else {
        bot.reply(message, error);
      }
    });
  }
);
