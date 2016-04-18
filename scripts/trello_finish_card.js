'use strict';

function trelloFinish(bot, controller, message) {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'clap',
  }, function(err) {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(', err);
    }
  });
}
module.exports = {
  name: 'Trello Finish Card',
  author: 'Daniel Gallegos (thattacoguy)',
  patterns: ['Card moved: .* from list .* to list .Finished.'],
  types: ['bot_message'],
  description: 'Yay, you did it!',
  command: trelloFinish,
};
