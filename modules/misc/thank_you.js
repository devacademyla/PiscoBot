// PiscoBot Script

var commandDescription = {
  name: 'Thank You',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'thank you',
  description: 'You\'re welcome!',
  module: 'Misc'
};

global.botHelp.push(commandDescription);

var _ = require('underscore');

global.piscobot.hears(['thank(s| you)'], ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: '+1'
    }, function(err) {
      if(err) {
        bot.botkit.log('Failed to add emoji reaction :(', err);
      }
    });
    var responses = [
      'You\'re welcome! :smile:',
      'Don\'t mention it. :wink:',
      'It wasn\'t any bother at all, honestly. :sweat_smile:',
      'Thank _you_! :grin:',
      'My pleasure. :grin:'
    ];
    bot.reply(message, _.sample(responses));
  }
);
