// PiscoBot Script

var commandDescription = {
  name: 'Who Am I',
  trigger: 'who am i',
  author: 'HowdyAI [@howdyai]',
  text: 'Ask the bot what your name is.',
  module: 'Core'
};

global.botHelp.push(commandDescription);

function learnName(bot, message) {
  var msg = '';
  bot.startConversation(message, function(err, convo) {
    if(!err) {
      convo.say('Um... I don\'t think I know your name yet!');
      convo.ask('What should I call you?', function(response, convo) {
        convo.ask('You want me to call you `' + response.text + '`?', [{
          pattern: bot.utterances.yes,
          callback: function(response, convo) {
            convo.next();
          }
        }, {
          pattern: bot.utterances.no,
          callback: function(response, convo) {
            convo.stop();
          }
        }, {
          default: true,
          callback: function(response, convo) {
            convo.repeat();
            convo.next();
          }
        }]);
        convo.next();
      }, { key: 'nickname' });
      convo.on('end', function(convo) {
        if(convo.status === 'completed') {
          msg = 'Okay! Lemme write that down somewhere...';
          bot.reply(message, msg);
          global.piscobot.storage.users.get(message.user, function(err, user) {
            if(!user) {
              user = {
                id: message.user
              };
            }
            user.name = convo.extractResponse('nickname');
            global.piscobot.storage.users.save(user, function() {
              msg = 'Got it! I\'ll call you ';
              msg += user.name + ' from now on.';
              bot.reply(message, msg);
            });
          });
        } else {
          bot.reply(message, 'Okay, nevermind! :sweat_smile:');
        }
      });
    }
  });
}

global.piscobot.hears(
  ['what(\'?s| is) my name', 'who am i'], ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    global.piscobot.storage.users.get(message.user, function(err, user) {
      var msg = '';
      if(user && user.name) {
        msg = 'Your name is ' + user.name + '!';
        msg += ' Hi, ' + user.name + '. :grin:';
        bot.reply(message, msg);
      } else {
        learnName(bot, message);
      }
    });
  }
);
