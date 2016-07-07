// PiscoBot Script
// Script Name:     Math
// Author:          Daniel Gallegos [@that_taco_guy]
// Creation Date:   03-07-2016

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
      if(error) {
        err += '\n Here\'s why: ' + error.message;
      }
      return bot.reply(message, err);
    }
  }
);
