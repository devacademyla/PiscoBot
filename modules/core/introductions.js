// PiscoBot Script

var commandDescription = {
  name: '',
  author: '',
  trigger: '',
  version: 1.0,
  description: '',
  module: ''
};

global.botHelp.push(commandDescription);

var helpers = require('./../../helpers');

global.piscobot.hears(
  ['introduce yourself', '(who|what) are you', 'intro(duction)?'], ['direct_message',
    'direct_mention'
  ],
  function(bot, message) {
    helpers.chat.pmCheck(bot, message);
    bot.startPrivateConversation(message,
      function(err, dm) {
        var introduction = {
          'attachments': [{
            'fallback': 'PiscoBot Intro Text',
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
