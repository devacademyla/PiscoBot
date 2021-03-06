// PiscoBot Script

var commandDescription = {
  name: 'Introductions',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'introduction',
  description: 'Have PiscoBot introduce itself.',
  module: 'Core'
};

global.botHelp.push(commandDescription);

global.piscobot.hears(
  ['introduce yourself', '(who|what) are you', 'intro(duction)?'], ['direct_message',
    'direct_mention'
  ],
  function(bot, message) {
    if(message.event !== 'direct_message') {
      bot.reply(message, 'Just sent you a PM about that, <@' + message.user + '>. :grin:');
    }
    bot.startPrivateConversation(message,
      function(err, dm) {
        var introduction = {
          'attachments': [{
            'fallback': 'Hey, there! I\'m PiscoBot!',
            'color': '#FF7300',
            'pretext': 'Hey, there! I\'m PiscoBot!',
            'author_name': 'devAcademy',
            'author_link': 'https://devacademy.la',
            'author_icon': 'https://devacademy.la/favicon.png',
            'title': 'PiscoBot Introduction',
            'title_link': 'https://github.com/devacademyla/PiscoBot',
            'text': 'PiscoBot is a bot made by <https://devacademy.la|devAcademy>' +
              ' with lots of love. Here are a few things I can do to help make your life a ' +
              'little easier. Enjoy responsibly. :tropical_drink:',
            'fields': [{
              'title': '\"spotify me (.*)\"',
              'value': 'Look up a song on Spotify.',
              'short': false
            }, {
              'title': '\"calc\"',
              'value': 'Do some math for you.',
              'short': false
            }, {
              'title': '\"command list\"',
              'value': 'Get you a complete list of commands.',
              'short': false
            }],
            'footer': 'PiscoBot',
            'footer_icon': 'https://raw.githubusercontent.com/' +
              'twitter/twemoji/gh-pages/72x72/1f379.png'
          }]
        };
        dm.say(introduction);
      }
    );
  }
);
