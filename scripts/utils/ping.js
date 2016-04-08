function ping(bot, controller, message) {
    bot.reply(message, 'Pong!');
}
module.exports = {
    name: 'ping',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['ping'],
    types: ['direct_message', 'direct_mention'],
    description: 'Ping the bot!',
    command: ping
}
