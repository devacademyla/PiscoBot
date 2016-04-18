'use strict';
var helpers = require(__dirname + '/../helpers/');

var eightBallStart = function(response, convo) {
  var msg = 'Ahh, you have come to seek answers! :grin:';
  msg += '\nWhat *YES or NO question* would you like to ask?';
  convo.ask(msg, function(response, convo) {
    var answers = [
      'It is certain!',
      'It is decidedly so.',
      'Without a doubt!',
      'Yes, definitely.',
      'You may rely on it.',
      'As I see it, yes!',
      'Most likely.',
      'Outlook good!',
      'Yes.',
      'Signs point to yes.',
      'Reply hazy... try again later.',
      'Ask again later...',
      '...I\'d rather not tell you now...',
      'Cannot predict now.',
      'Concentrate and ask again.',
      '...don\'t count on it.',
      'My reply is no.',
      'Outlook... not so good.',
      'Very doubtful.',
    ];
    var responses = [
      'Lemme think about that',
      'Let\'s see here',
      'One moment, please',
      'Hold on, lemme check',
      'Wait, almost got it',
    ];
    var wisdom = helpers.randomFromArray(answers);
    var res = helpers.randomFromArray(responses);
    msg = '...\n:crystal_ball: My crystal ball says... _*';
    convo.say(':thinking_face: ' + res + msg + wisdom + '*_');
    convo.next();
  });
};

function eightBall(bot, controller, message) {
  bot.startConversation(message, eightBallStart);
}

module.exports = {
  name: '8ball',
  author: 'Daniel Gallegos (thattacoguy)',
  patterns: ['8ball', '8ball (.*)'],
  types: ['direct_message', 'direct_mention'],
  description: 'Ask for advice from the universe, oooo~',
  command: eightBall,
};
