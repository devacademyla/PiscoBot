// PiscoBot Script

// This script is special! It's where you add things that the bot should react to in chat with 
// emotes. It's not added to the help file so it doesn't clutter up the rest of the commands.

global.piscobot.hears(['lilmoises', 'lilmoises69'], 
  ['ambient', 'direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: 'violin'
    }, function(err) {
      if(err) {
        bot.botkit.log('Failed to add emoji reaction :(', err);
      }
    });
  }
);

global.piscobot.hears(['hangover', 'drunk', 'alcohol'], 
  ['ambient', 'direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: 'tropical_drink'
    }, function(err) {
      if(err) {
        bot.botkit.log('Failed to add emoji reaction :(', err);
      }
    });
  }
);
