var request = require('request');

function spotify(bot, controller, message) {
    var req = request.get('https://api.spotify.com/v1/search?q=' + message.match[1] + '&type=track', function(err, res, body) {
        if (!err && res.statusCode == 200) {
            var response = JSON.parse(body);
            if (response.tracks.items.length > 0 && response.tracks.items[0].external_urls !== null) {
                bot.reply(message, response.tracks.items[0].external_urls.spotify);
            } else {
                bot.reply(message, "Even _I_ couldn't find that dumb song called \"" + query + "\"! :unamused:\nTry searching for some _better_ music. :face_with_rolling_eyes:");
            }
        } else {
            bot.reply(message, "Oops! Something weird happened and I couldn't find that song. :confused:");
        }
    });
}

module.exports = {
    name: 'spotify me',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['spotify me (.*)'],
    types: ['direct_message', 'direct_mention'],
    description: 'Search for a song on Spotify',
    command: spotify
}
