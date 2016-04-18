'use strict';

function ping(bot, controller, message) {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'tropical_drink',
  }, function(err) {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(', err);
    }
  });
}

module.exports = {
  name: 'ping',
  author: 'Daniel Gallegos (thattacoguy)',
  patterns: ['pisco'],
  types: ['ambient', 'direct_message', 'direct_mention', 'mention'],
  description: 'Ping the bot!',
  command: ping,
};
