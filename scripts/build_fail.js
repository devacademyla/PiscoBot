'use strict';

function buildFailed(bot, controller, message) {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'poop',
  }, function(err) {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(', err);
    }
  });
  var msg = message.match[1] + ' did it! :speak_no_evil:';
  bot.reply(message, msg);
}
module.exports = {
  name: 'Build Failed',
  author: 'Daniel Gallegos (thattacoguy)',
  patterns: ['by (.*) (failed|errored) in'],
  types: ['bot_message'],
  description: 'Oops.',
  command: buildFailed,
};
