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

global.piscobot.hears(['^reward($|s$)', '^reward( |s )help'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    helpers.chat.pmCheck(bot, message);
    bot.startPrivateConversation(message, function(err, convo) {
      var response = {
        'attachments': [{
          'fallback': 'Hey, there! Here\'s some more information on rewards.',
          'pretext': 'Hey, there! Here\'s some more information on rewards.',
          'title': 'PiscoBot Rewards',
          'text': 'Rewards are obtained by using some of your points to get awesome prizes from ' +
            'your team members! Here\'s some of the things you can do with rewards:',
          'fields': [{
            'title': '\"reward list\"',
            'value': 'Show you a list of commands.',
            'short': false
          }, {
            'title': '\"redeem reward\"',
            'value': 'Redeem a reward.',
            'short': false
          }, {
            'title': '\"add reward\"',
            'value': 'Add a reward to the list.',
            'short': false
          }, {
            'title': '\"edit reward\"',
            'value': 'Change one of your rewards.',
            'short': false
          }, {
            'title': '\"delete reward\"',
            'value': 'Delete one of your rewards.',
            'short': false
          }],
          'footer': 'PiscoBot',
          'footer_icon': 'https://raw.githubusercontent.com/' +
            'twitter/twemoji/gh-pages/72x72/1f379.png',
          'color': '#FF7300'
        }]
      };
      convo.say(response);
    });
  }
);

var createReward = function(response, convo) {
  convo.sayFirst(
    'Alright, let\'s make a new reward! (You can say "quit" at any time to back out.)');
  var reward = {
    title: '',
    description: '',
    price: 0,
    owner: convo.source_message.user
  };
  askRewardName(response, convo, reward);
  convo.next();
};

var askRewardName = function(response, convo, reward, editing) {
  convo.ask(
    'What\'s the name of your reward?\n(Examples: _"$5 Starbucks coffee"_,' +
    ' _"$5 Humble Bundle/Steam game"_ or _"Day off of work"_.)',
    function(response, convo) {
      exitConvo(response, convo);
      convo.say('Sweet.');
      reward.title = response.text;
      if(editing) {
        confirmReward(response, convo, reward);
      } else {
        askRewardDescription(response, convo, reward);
      }
      convo.next();
    }
  );
};

var askRewardDescription = function(response, convo, reward, editing) {
  convo.ask(
    'How would you describe your reward?\n(Example: "Grab a cup of coffee at Starbucks on us.")',
    function(response, convo) {
      exitConvo(response, convo);
      reward.description = response.text;
      if(editing) {
        confirmReward(response, convo, reward);
      } else {
        askRewardValue(response, convo, reward);
      }
      convo.next();
    }
  );
};

var askRewardValue = function(response, convo, reward) {
  convo.ask(
    'How many points is your reward worth?\n($5 ≈ 25 points, but your mileage may vary.)',
    function(response, convo) {
      exitConvo(response, convo);
      var number = response.text.replace(/\D+/g, '');
      if(!_.isEmpty(number)) {
        reward.price = parseInt(number);
        confirmReward(response, convo, reward);
        convo.next();
      } else {
        convo.say('Err... I don\'t think that\'s a valid number of points.');
        convo.repeat();
      }
    }
  );
};

var confirmReward = function(response, convo, reward) {
  var confirmAttachment = {
    'attachments': [{
      'fallback': 'Okay, let\'s go over the reward you just made...',
      'pretext': 'Okay, let\'s go over the reward you just made...',
      'title': reward.title,
      'text': reward.description,
      'fields': [{
        'title': 'Value:',
        'value': reward.value + ' points',
        'short': false
      }],
      'footer': 'PiscoBot',
      'footer_icon': 'https://raw.githubusercontent.com/' +
        'twitter/twemoji/gh-pages/72x72/1f379.png',
      'color': '#FF7300'
    }]
  };
  convo.say(confirmAttachment);
  convo.ask('Does that look good to you?', [{
    pattern: convo.task.bot.utterances.yes,
    callback: function(response, convo) {
      convo.say('Awesome! Let me write that down somewhere...');
      saveReward(convo, reward);
      convo.next();
    }
  }, {
    pattern: convo.task.bot.utterances.no,
    callback: function(response, convo) {
      // TODO: Ask for editing things
      convo.say('WIP: Edit function');
      convo.next();
    }
  }, {
    default: true,
    callback: function(response, convo) {
      convo.say('I didn\'t quite get that.');
      convo.repeat();
      convo.next();
    }
  }]);
};

function exitConvo(response, convo) {
  if(response.text === 'exit') {
    convo.say('Alright, another time, then. :sweat_smile:');
    convo.stop();
  }
}

function saveReward(convo, reward) {
  global.piscobot.storage.teams.get(convo.source_message.team, function(err, team) {
    if(!err) {
      team.rewards.push(reward);
      global.piscobot.storage.teams.save(team, function(err) {
        if(!err) {
          convo.say('Cool, reward saved!');
          convo.next();
        }
      });
    }
  });
}

global.piscobot.hears(['^add reward', '^reward add'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    helpers.chat.pmCheck(bot, message);
    bot.startPrivateConversation(message, createReward);
  }
);

global.piscobot.hears(['^redeem reward( |s )', '^reward redeem'], ['direct_message',
    'direct_mention'
  ],
  function(bot, message) {
    bot.reply(message, 'WIP');
  }
);

global.piscobot.hears(['^reward(s | )list'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    bot.reply(message, 'WIP');
  }
);
