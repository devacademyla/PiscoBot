// PiscoBot Script
// Script Name:     Hello
// Author:          Daniel Gallegos [@that_taco_guy]
// Creation Date:   29-06-2016

/* eslint-disable */
global.piscobot.hears('hello', ['direct_message', 'direct_mention', 'mention'],
  /* eslint-enable */
  function(bot, message) {
    global.piscobot.storage.users.get(message.user, function(err, user) {
      if (user && user.name) {
        bot.api.reactions.add({
          timestamp: message.ts,
          channel: message.channel,
          name: 'smile',
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
          name: 'open_mouth',
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
