// PiscoBot Script

var commandDescription = {
  name: 'Math',
  trigger: 'calc',
  author: 'HowdyAI [@howdyai]',
  text: 'Make PiscoBot crunch some numbers for you.',
  module: 'Utilities'
};

global.botHelp.push(commandDescription);

var _ = require('underscore');
var mathjs = require('mathjs');
global.piscobot.hears(['(calc|calculate|calculator|convert|math|maths)( me)? (.*)'], 
  ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    var result;
    try {
      result = mathjs.eval(message.match[3]);
      var msgs = [
        'That seems to equal',
        'That equals',
        'That is most likely always',
        'That\'s almost always'
      ];
      var calc = _.sample(msgs);
      return bot.reply(message, calc + ' `' + result + '`.');
    } catch(error) {
      var err = 'Could not compute. :disappointed:';
      if(error.message) {
        err += '\n Here\'s why: ' + error.message;
      }
      return bot.reply(message, err);
    }
  }
);
