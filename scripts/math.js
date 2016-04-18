'use strict';
// Original script by canadianveggie
// https://github.com/hubot-scripts/hubot-calculator

var mathjs = require('mathjs');
var helpers = require(__dirname + '/../helpers/');

function doIt(bot, controller, message) {

  var error, result;
  try {
    result = mathjs['eval'](message.match[3]);
    var msgs = [
      'I punched that in and it came out to',
      'Seems that that equals',
      'That equals',
      'That is _probably_',
    ];
    var calc = helpers.randomFromArray(msgs);
    return bot.reply(message, '' + calc + ' `' + result + '`.');
  } catch (_error) {
    error = _error;
    var err = error.message || 'Could not compute. :disappointed:';
    return bot.reply(message, err);
  }
}
module.exports = {
  name: 'math',
  author: 'Daniel Gallegos (thattacoguy)',
  patterns: ['(calc|calculate|calculator|convert|math|maths)( me)? (.*)'],
  types: ['direct_message', 'direct_mention', 'mention'],
  description: 'Do some math!',
  command: doIt,
};
