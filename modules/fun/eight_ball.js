var commandDescription = {
  name: '8ball',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: '8ball [question]',
  version: 1.0,
  description: 'Seek advice from the Gods of Chance.',
  module: 'Fun'
};

global.botHelp.push(commandDescription);

var _ = require('underscore');
global.piscobot.hears(['8ball (.*)'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    var responses = [
      'Let\'s see, uhh...',
      'Let\'s see, here...',
      'One moment, please.',
      'Hold on, lemme check...',
      'Lemme dust off the ol\' crystal ball, here...'
    ];
    bot.reply(message, _.sample(responses));
    var answers = [
      'It is certain!',
      'It is decidedly so.',
      'Without a doubt!',
      'Yes, definitely.',
      'Yeah, sure, whatever.',
      'As I see it, yes!',
      'Most likely.',
      'Outlook good!',
      'Yes.',
      'Signs point to yes.',
      'i dunno lol ¯\\_(ツ)_/¯',
      'Ask again later...',
      '...I\'d, uh, rather not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      '...don\'t count on it.',
      'My reply is no.',
      'Outlook... not so good.',
      'Very doubtful.'
    ];
    var answer = 'Here\'s your answer, <@' + message.user + '>: *';
    answer += _.sample(answers) + '*';
    bot.reply(message, answer);
  }
);
