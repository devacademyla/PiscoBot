function buildErrored(bot, controller, message) {
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'poop',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });
    bot.reply(message, message.match[1] + ' did it! :speak_no_evil:')
}
module.exports = {
    name: 'Build Errored',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['by (.*) failed in'],
    types: ['ambient'],
    description: 'Oops.',
    command: buildErrored
}
