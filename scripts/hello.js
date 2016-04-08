function hello(bot, controller, message) {
    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.api.reactions.add({
                timestamp: message.ts,
                channel: message.channel,
                name: 'open_mouth',
            }, function(err, res) {
                if (err) {
                    bot.botkit.log('Failed to add emoji reaction :(', err);
                }
            });
            bot.reply(message, 'Hello ' + user.name + '! :smile:');
        } else {
            bot.api.reactions.add({
                timestamp: message.ts,
                channel: message.channel,
                name: 'smile',
            }, function(err, res) {
                if (err) {
                    bot.botkit.log('Failed to add emoji reaction :(', err);
                }
            });
            bot.reply(message, 'Oh, hello! :sweat_smile:');
        }
    });
}
module.exports = {
    name: 'hello',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['hello', 'hi'],
    types: ['direct_message', 'direct_mention', 'mention'],
    description: 'Say hello!',
    command: hello
}
