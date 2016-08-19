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
    'Alright, let\'s make a new reward! (You can say "exit" at any time to back out.)');
  var reward = {
    title: '',
    description: '',
    price: 0,
    owner: convo.source_message.user
  };
  askRewardTitle(response, convo, reward);
  convo.next();
};

var askRewardTitle = function(response, convo, reward, editing) {
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
    'How would you describe your reward?\n(Example: _"Grab a cup of coffee at Starbucks on us."_)',
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
    'How many points is your reward worth?\n(Example: _"25 points"_. ' +
    'For reference, $5 ≈ 25 points, but your mileage may vary.)',
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
        'value': reward.price + ' points',
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
      editReward(response, convo, reward);
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

function editReward(response, convo, reward) {
  convo.ask('What do you want to change? Say "title", "description" or "price" to choose.', [{
    pattern: /title/,
    callback: function(response, convo) {
      askRewardTitle(response, convo, reward, true);
      convo.next();
    }
  }, {
    pattern: /description/,
    callback: function(response, convo) {
      askRewardDescription(response, convo, reward, true);
      convo.next();
    }
  }, {
    pattern: /price/,
    callback: function(response, convo) {
      askRewardValue(response, convo, reward, true);
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
}

function exitConvo(response, convo) {
  var quitMessages = ['exit', 'quit', 'stop', 'end'];
  if(_.contains(quitMessages, response.text)) {
    convo.say('Alright, another time, then. :sweat_smile:');
    convo.stop();
  }
}

function saveReward(convo, reward) {
  global.piscobot.storage.teams.get(convo.task.source_message.team, function(err, team) {
    if(!err) {
      if(_.isEmpty(team) || _.isNull(team)) {
        team = {
          id: convo.task.source_message.team
        };
      }
      if(_.isEmpty(team.rewards) || _.isNull(team.rewards)) {
        team.rewards = [];
      }
      team.rewards.push(reward);
      team.rewards.sort(function(a, b) {
        return b.title - a.title;
      });
      global.piscobot.storage.teams.save(team, function(err) {
        if(!err) {
          convo.say('Cool, reward saved!');
          convo.next();
        }
      });
    }
  });
}

var listRewards = function(response, convo) {
  global.piscobot.storage.teams.get(convo.task.source_message.team, function(err, team) {
    if(!err) {
      if(_.isEmpty(team) || _.isNull(team) || _.isEmpty(team.rewards)) {
        convo.say('Doesn\'t seem like your team has any rewards available! ');
        convo.next();
      } else {
        var fields = [];
        for (var reward of team.rewards) {
          var field = {
            title: reward.title,
            value: reward.price + ' points (<@'+ reward.owner + '>)',
            short: true
          };
          fields.push(field);
        }
        var rewardListAttachment = {
          'attachments': [{
            'fallback': 'Here\'s a list of rewards that I found for your team:',
            'pretext': 'Here\'s a list of rewards that I found for your team:',
            'title': 'Rewards',
            'text': 'Get yourself some prizes!',
            'fields': fields,
            'footer': 'PiscoBot',
            'footer_icon': 'https://raw.githubusercontent.com/' +
              'twitter/twemoji/gh-pages/72x72/1f379.png',
            'color': '#FF7300'
          }]
        };
        convo.say(rewardListAttachment);
        convo.next();
      }
    } else {
      convo.say('There was an error trying to get the rewards.\nHere\'s what went wrong: ' +
        err);
      convo.next();
    }
  });
};

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

global.piscobot.hears(['^reward(s | )list', 'list rewards?'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    helpers.chat.pmCheck(bot, message);
    bot.startPrivateConversation(message, listRewards);
  }
);
