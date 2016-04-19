'use strict';

function whoami(bot, controller, message) {
  controller.storage.users.get(message.user, function(err, user) {
    var msg = '';
    if (user && user.name) {
      msg = 'Your name is ' + user.name + '!';
      msg += 'Hi, ' + user.name + '. :grin:';
      bot.reply(message, msg);
    } else {
      bot.startConversation(message, function(err, convo) {
        if (!err) {
          convo.say('Um... I don\'t think I know your name yet!');
          convo.ask('What should I call you?', function(response, convo) {
            convo.ask('You want me to call you `' + response.text + '`?', [{
              pattern: bot.utterances.yes,
              callback: function(response, convo) {
                convo.next();
              },
            }, {
              pattern: bot.utterances.no,
              callback: function(response, convo) {
                convo.stop();
              },
            }, {
              default: true,
              callback: function(response, convo) {
                convo.repeat();
                convo.next();
              },
            },]);
            convo.next();
          }, {key: 'nickname'});
          convo.on('end', function(convo) {
            if (convo.status === 'completed') {
              msg = 'OK! Lemme write that down somewhere...';
              bot.reply(message, msg);
              controller.storage.users.get(message.user, function(err, user) {
                if (!user) {
                  user = {
                    id: message.user,
                  };
                }
                user.name = convo.extractResponse('nickname');
                controller.storage.users.save(user, function() {
                  msg = 'Got it! I\'ll call you ' + user.name + ' from now on.';
                  bot.reply(message, msg);
                });
              });
            } else {
              bot.reply(message, 'OK, nevermind! :sweat_smile:');
            }
          });
        }
      });
    }
  });
}
module.exports = {
  name: 'whoami',
  author: 'HowdyAI (howdyai)',
  patterns: ['what is my name', 'who am i', 'what\'s my name'],
  types: ['direct_message', 'direct_mention'],
  description: 'What _is_ your name, anyway?',
  command: whoami,
};
