// PiscoBot Script

var commandDescription = {
  name: 'Ping',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'ping',
  description: 'Ping the bot!',
  module: 'Utilities'
};

global.botHelp.push(commandDescription);

var _ = require('underscore');

global.piscobot.hears('ping', ['direct_mention', 'direct_message'],
  function(bot, message) {
    var timeNow = (_.now() / 1000);
    var timeTaken = +((timeNow - message.ts).toFixed(3));
    bot.reply(message, 'Pong! That took `' + timeTaken + '` seconds.');
  }
);
