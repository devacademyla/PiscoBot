// PiscoBot Script

var doItDescription = {
  name: 'Do It',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'do it',
  version: 1.0,
  description: 'Motivate your team using Shia Lebouf.',
  module: 'Fun'
};

global.botHelp.push(doItDescription);

var _ = require('underscore');
global.piscobot.hears(['do(it| it)'], ['ambient', 'direct_mention', 'direct_message', 'mention'],
  function(bot, message) {
    var doIt = [
      'http://i.giphy.com/10FUfTApAeoZK8.gif',
      'http://i.giphy.com/qvdqF0PGFPfyg.gif',
      'http://i.giphy.com/wCiFka9RsSW9W.gif',
      'http://i.giphy.com/ypO01RIuQ3tHW.gif',
      'http://i.giphy.com/87xihBthJ1DkA.gif'
    ];
    var motivation = _.sample(doIt);
    bot.reply(message, '<@' + message.user + '>: ' + motivation);
  }
);
