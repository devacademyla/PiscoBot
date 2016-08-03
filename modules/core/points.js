// PiscoBot Script

var commandDescription = {
  name: 'Points',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: ':pisco:/:poop:',
  version: 1.0,
  description: 'Give or take away points from other users.',
  module: 'Core'
};

global.botHelp.push(commandDescription);

var _ = require('underscore');

function notifyRecipient(bot, message, value, user) {
  bot.startPrivateConversation({ user: user.id }, function(err, convo) {
    var notif = 'You just got ';
    if(value > 0) {
      notif += 'a shot of Pisco from <@' + message.user + '>! :tropical_drink: :sunglasses:';
    } else if(value < 0) {
      notif += 'some :shit: from <@' + message.user + '>. :joy:';
    }
    notif += '\nYou have `' + user.points + '` points now.';
    convo.say(notif);
    convo.next();
  });
}

function notifyGiver(bot, message, value, user) {
  bot.startPrivateConversation(message, function(err, convo) {
    var info = 'You just gave ';
    if(value > 0) {
      info += 'a shot of Pisco to <@' + user.id + '>. :tropical_drink: :smile';
    } else if(value < 0) {
      info += 'some :shit: to <@' + user.id + '>. :joy:';
    }
    convo.say(info);
    convo.next();
  });
}

function modifyPoints(bot, message, value) {
  var userMatcher = /<@([A-Z0-9]*)>/g;
  var usersMatched = message.text.match(userMatcher);
  var userIDs = [];
  for(var rawUser of usersMatched) {
    var trimmedID = rawUser.replace(/(<|@|>)/g, '');
    if(trimmedID !== message.user) {
      userIDs.push(trimmedID);
    }
  }
  if(!_.isEmpty(userIDs)) {
    for(var userID of userIDs) {
      global.piscobot.storage.users.get(userID, function(err, user) {
        if(!err) {
          if(!user) {
            user = { id: userID };
            user.points = 0;
          }
          user.points += value;
          global.piscobot.storage.users.save(user, function(err) {
            if(!err) {
              notifyRecipient(bot, message, value, user);
              notifyGiver(bot, message, value, user);
            }
          });
        }
      });
    }
  }
}

global.piscobot.hears(
  [':poop:', ':hankey:', ':shit:', ':pisco:', ':tropical_drink:'], ['ambient'],
  function(bot, message) {
    var add = [':pisco:', ':tropical_drink:'];
    var remove = [':poop:', ':hankey:', ':shit:'];
    if(_.contains(add, message.match[0])) {
      modifyPoints(bot, message, +1);
    } else if(_.contains(remove, message.match[0])) {
      modifyPoints(bot, message, -1);
    }
  }
);

global.piscobot.hears(
  ['^leaderboard'], ['direct_message', 'direct_mention'],
  function(bot, message) {
    bot.api.users.list({ token: process.env.SLACK_API_TOKEN }, function(err, team) {
      if(team.ok) {
        var users = [];
        var promises = [];
        team.members.forEach(function(member) {
          if(member.is_bot === false && member.deleted === false) {
            var promise = new Promise(function(resolve, reject) {
              global.piscobot.storage.users.get(member.id, function(err, user) {
                if(err) {
                  return reject(err);
                } else {
                  if(user && user !== null) {
                    if(!user.points) {
                      user.points = 0;
                    }
                    user.username = member.name;
                  } else {
                    user = { id: member.id, points: 0 };
                    global.piscobot.storage.users.save(user);
                  }
                  users.push(user);
                  return resolve();
                }
              });
            });
            promises.push(promise);
          } else {
            return;
          }
        });
        Promise.all(promises).then(function() {
          var fields = [];
          users.sort(function(a, b) {
            return b.points - a.points;
          });
          for(var user of users) {
            fields.push({
              'title': user.username,
              'value': user.points,
              'short': false
            });
          }
          var response = {
            'attachments': [{
              'fallback': 'Leaderboard for PiscoBot points system.',
              'color': '#FF7300',
              'pretext': 'Here\'s how many points everyone has, <@' + message.user +
                '>!',
              'title': 'Leaderboard',
              'fields': fields,
              'footer': 'PiscoBot',
              'footer_icon': 'https://raw.githubusercontent.com/' +
                'twitter/twemoji/gh-pages/72x72/1f379.png'
            }]
          };
          bot.reply(message, response);
        });
      } else {
        bot.reply(message,
          'There was a problem getting the points from Slack. Sorry! :disappointed:');
      }
    });
  }
);
