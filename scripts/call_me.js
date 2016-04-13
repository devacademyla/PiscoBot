function callMe(bot, controller, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it! I\'ll call you ' + user.name + ' from now on.');
        });
    });
}

module.exports = {
    name: 'callMe',
    author: 'HowdyAI (howdyai)',
    patterns: ['call me (.*)', 'my name is (.*)'],
    types: ['direct_message', 'direct_mention'],
    description: 'Ask the bot to call you something different.',
    command: callMe
}
