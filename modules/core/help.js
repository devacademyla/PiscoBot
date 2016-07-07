// PiscoBot Script

var help = {
  name: 'Help',
  author: 'Daniel Gallegos [@that_taco_guy]',
  date: '04-07-2016',
  text: 'Get information on the different commands that PiscoBot offers.'
};

global.botHelp.push(help);

global.piscobot.hears('help', ['direct_mention'],
  function(bot, message) {
    bot.reply(
      message,
      'Hey, <@' + bot.user + '>, I sent you a PM. :wink:'
    );
    bot.startPrivateConversation(message,
      function(err, dm) {
        var commandIntro = {
          'attachments': [{
            'color': '#00B8F4',
            'pretext': 'Hey, there! Here\'s some stuff I can do for you.',
            'fields': [{
              'title': '\"info\"',
              'value': 'Give you some info on me.',
              'short': false
            }, {
              'title': '\"command list\"',
              'value': 'Show you a list of commands.',
              'short': false
            }, {
              'title': '\"nothing\"',
              'value': ' ¯\\_(ツ)_/¯',
              'short': false
            }]
          }]
        };
        dm.say(commandIntro);
        dm.ask('So, what can I help you with?', function(response, convo) {
          convo.say('This is just a bug test thing for now.');
          convo.next();
        });
      }
    );
  }
);
