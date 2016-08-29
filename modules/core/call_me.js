// PiscoBot Script

var commandDescription = {
  name: 'Call Me',
  author: 'HowdyAI [@HowdyAI]',
  trigger: 'call me [nickname]',
  description: 'Add a nickname to yourself.',
  module: 'Core'
};

global.botHelp.push(commandDescription);

global.piscobot.hears(['call me (.*)', 'my name is (.*)'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    var name = message.match[1];
    var msg = '';
    global.piscobot.storage.users.get(message.user, function(err, user) {
      if(!user) { user = { id: message.user }; }
      user.nickname = name;
      global.piscobot.storage.users.save(user, function() {
        msg = 'Got it! I\'ll call you ' + user.nickname + ' from now on.';
        bot.reply(message, msg);
      });
    });
  }
);
