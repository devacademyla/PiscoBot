function lilmoises(bot, controller, message) {
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'violin',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });
}
module.exports = {
    name: 'lilmoises',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['lilmoises'],
    types: ['ambient'],
    description: 'lilmoises6996.',
    command: lilmoises
}
