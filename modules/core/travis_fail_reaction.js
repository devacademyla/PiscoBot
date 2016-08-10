// PiscoBot Script

var commandDescription = {
  name: 'Travis CI Build Fails',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: '',
  version: 1.0,
  description: 'Have the bot react to a build failing on Travis CI.',
  module: 'Core'
};

global.botHelp.push(commandDescription);

var _ = require('underscore');

global.piscobot.on('bot_message', function(bot, message) {
  if(!_.isEmpty(message.attachments)) {
    var botMessage = message.attachments[0];
    var regex = /Build.*of.*by .* (failed|errored) in/g;
    if(!_.isEmpty(botMessage.text) && regex.test(botMessage.text)) {
      bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'poop'
      }, function(err) {
        if(err) {
          bot.botkit.log('Failed to add emoji reaction :(', err);
        }
      });
    }
  }
});
