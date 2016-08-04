// PiscoBot Script

var commandDescription = {
  name: 'Rewards',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'reward',
  version: 1.0,
  description: 'Manage and redeem rewards with the points you\'ve earned.',
  module: 'Core'
};

global.botHelp.push(commandDescription);

var helpers = require('./../../helpers');
var _ = require('underscore');

global.piscobot.hears(['^reward($|s$)', '^reward help'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    bot.reply(message, '');
  }
);

global.piscobot.hears(['^add reward'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    bot.reply(message, '');
  }
);

global.piscobot.hears(['^redeem reward'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    bot.reply(message, '');
  }
);

global.piscobot.hears(['^reward list'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    helpers.chat.pmCheck(bot, message);
    global.piscobot.storage.teams.get({ id: message.team }, function(err, teamData) {
      if(!err && !_.isEmpty(teamData)) {
        bot.startPrivateConversation(message, function(err, convo) {
          if(!_.isEmpty(teamData.rewards)) {
            convo.say('No rewards currently exist for this team.');
            convo.ask('Would you like to make one?' [{
              pattern: bot.utterances.yes,
              callback: function(response, convo) {
                convo.say('Cool, let\'s get started!');
                convo.next();
              }
            }, {
              pattern: bot.utterances.no,
              callback: function(response, convo) {
                convo.say('Maybe later, then. :sweat_smile:');
                convo.next();
              }
            }]);
          } else {
            var fields = [];
            for(var reward of teamData.rewards) {
              fields.push({
                'title': reward.name,
                'value': reward.value + ' points - by <@' + reward.user + '>',
                'short': true
              });
            }
            var response = {
              'attachments': [{
                'fallback': 'List of rewards for the PiscoBot Points system.',
                'color': '#FF7300',
                'pretext': 'Here\'s a list of available rewards!',
                'title': 'Rewards',
                'fields': fields,
                'footer': 'PiscoBot',
                'footer_icon': 'https://raw.githubusercontent.com/' +
                  'twitter/twemoji/gh-pages/72x72/1f379.png'
              }]
            };
            convo.say(response);
          }
        });
      } else {
        bot.startPrivateConversation(message, function(err, convo) {
          convo.say(
            'Err... ran into an error when trying to get the list of rewards.' +
            ' Mind trying again later? :sweat_smile:');
        });
      }
    });
  }
);
