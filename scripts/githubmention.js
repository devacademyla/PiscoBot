var helpers = require(__dirname + '/../helpers/');

function piscoGithub(bot, controller, message) {
    emoji = [
        'thinking_face',
        'open_mouth',
        'face_with_rolling_eyes',
        'sweat_smile'
    ]
    emote = helpers.randomFromArray(emoji);
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: emote,
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });
    responses = [
        'Woah, those look like new features! :open_mouth:',
        'Great, what are you breaking _now_? :face_with_rolling_eyes:',
        'Hey, be careful with that! :flushed:',
        'Mmm, I love that new commit smell. :smile:',
        'Man, I hope that fixes something. :sweat_smile:'
    ];
    response = helpers.randomFromArray(responses);
    bot.reply(message, response);
}
module.exports = {
    name: 'PiscoBot GitHub',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['PiscoBot.*new commits by', 'PiscoBot.*new commit by'],
    types: ['ambient'],
    description: 'Dude. Meta.',
    command: piscoGithub
}
