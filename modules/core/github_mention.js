// PiscoBot Script

var commandDescription = {
  name: 'GitHub Mention',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: '[none]',
  version: 1.0,
  description: 'Have the bot reply to new commits on GitHub.',
  module: 'Core'
};

global.botHelp.push(commandDescription);

var _ = require('underscore');

global.piscobot.hears(['PiscoBot.*new commits by', 'PiscoBot.*new commit by'], ['bot_message'],
  function(bot, message) {
    var emoji = [
      'thinking_face',
      'open_mouth',
      'face_with_rolling_eyes',
      'sweat_smile'
    ];
    bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: _.sample(emoji)
    }, function(err) {
      if(err) {
        bot.botkit.log('Failed to add emoji reaction :(', err);
      }
    });
  }
);
