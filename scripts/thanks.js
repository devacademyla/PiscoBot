var helpers = require(__dirname + '/../helpers/');

function thanks(bot, controller, message) {
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: '+1',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });
    responses = [
        'You\'re welcome! :smile:',
        'Don\'t mention it. :wink:',
        'It wasn\'t any bother at all, honestly. :sweat_smile:',
        'Thank _you_! :grin:',
        'My pleasure. :grin:'
    ];
    response = helpers.randomFromArray(responses);
    bot.reply(message, response);
}
module.exports = {
    name: 'hello',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['thank(s| you)'],
    types: ['direct_message', 'direct_mention', 'mention'],
    description: 'Be polite!',
    command: thanks
}
