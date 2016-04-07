var request = require('request');

function shutDown(bot, controller, message) {
    bot.startConversation(message, function(err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [{
            pattern: bot.utterances.yes,
            callback: function(response, convo) {
                convo.say('Bye!');
                convo.next();
                setTimeout(function() {
                    process.exit();
                }, 3000);
            }
        }, {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }]);
    });
}

function spotify(bot, controller, message) {
    var req = request.get('https://api.spotify.com/v1/search?q=' + message.match[1] + '&type=track', function(err, res, body) {
        console.log(message.match[1])
        if (!err && res.statusCode == 200) {
            var response = JSON.parse(body);
            if (response.tracks.items.length > 0 && response.tracks.items[0].external_urls !== null) {
                bot.reply(message, response.tracks.items[0].external_urls.spotify);
            } else {
                bot.reply(message, "Even _I_ couldn't find that dumb song called \"" + query + "\"! :unamused:\nTry searching for some _better_ music. :face_with_rolling_eyes:");
            }
        } else {
            console.log(err)
            console.log(res.statusCode)
            bot.reply(message, "Oops! Something weird happened and I couldn't find that song. :confused:");
        }
    });
}

module.exports = {
    shutDown: function(bot, controller, message) {
        shutDown(bot, controller, message)
    },
    spotify: function(bot, controller, message) {
        spotify(bot, controller, message)
    }
}
