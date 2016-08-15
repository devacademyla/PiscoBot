// PiscoBot Script

var commandDescription = {
  name: 'GitHub Mention',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: '',
  version: 1.0,
  description: 'Have the bot react to new commits on GitHub.',
  module: 'Core'
};

global.botHelp.push(commandDescription);

var _ = require('underscore');

global.piscobot.on('bot_message', function(bot, message) {
  if(!_.isEmpty(message.attachments)) {
    var botMessage = message.attachments[0];
    var regex = /PiscoBot.*new commit(s | )by/g;
    if(!_.isEmpty(botMessage.pretext) && regex.test(botMessage.pretext)) {
      var emoji = [
        'thinking_face',
        'open_mouth',
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
  }
});
