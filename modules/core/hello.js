// PiscoBot Script

var commandDescription = {
  name: 'Hello',
  author: 'HowdyAI [@HowdyAI]',
  trigger: 'hello',
  version: 1.3,
  description: 'Say hello to PiscoBot!',
  module: 'Core'
};

global.botHelp.push(commandDescription);

global.piscobot.hears('hello', ['direct_message', 'direct_mention'],
  function(bot, message) {
    global.piscobot.storage.users.get(message.user, function(err, user) {
      if (user && user.name) {
        bot.api.reactions.add({
          timestamp: message.ts,
          channel: message.channel,
          name: 'smile'
        }, function(err) {
          if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
          }
        });
        bot.reply(message, 'Hey, there, ' + user.name + '! :smile:');
      } else {
        bot.api.reactions.add({
          timestamp: message.ts,
          channel: message.channel,
          name: 'open_mouth'
        }, function(err) {
          if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
          }
        });
        bot.reply(message, 'Oh, hello! :sweat_smile:');
      }
    });
  }
);
