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

var _ = require('underscore');

function modifyPoints(bot, message, value) {
  var userMatcher = /<@([A-Z0-9]*)>/g;
  var usersMatched = message.text.match(userMatcher);
  var userIDs = [];
  for(var rawUser of usersMatched) {
    var trimmedID = rawUser.replace(/(<|@|>)/g, '');
    userIDs.push(trimmedID);
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
          global.piscobot.storage.users.save(user);
        }
      });
    }
  }
}

global.piscobot.hears(
  [':poop:', ':hankey:', ':shit:', ':pisco:', ':tropical_drink:'], 
  ['ambient'],
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
