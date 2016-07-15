// PiscoBot Script

var commandDescription = {
  name: 'Hubstaff Report',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: '[weekly/daily] hubstaff report',
  version: 1.0,
  description: 'Get a list of the top contributors to your team\'s Hubstaff hours.',
  module: 'Utilities'
};

global.botHelp.push(commandDescription);

var request = require('request');
var _ = require('underscore');

function dailyReport(bot, message, users, organization) {
  users.sort(function(a, b) {
    return b.daily.duration - a.daily.duration;
  });
  var fields = [];
  for(var i = 0; i < 3; i++) {
    var userHours = (users[i].daily.duration / 3600);
    var dailyHours = (organization.daily / 3600);
    var userPercentage = ((userHours / dailyHours) * 100);
    fields.push({
      'title': (i + 1) + '. ' + users[i].name,
      'value': 'Worked ' + userHours.toFixed(2) + ' hour(s) today. Percentage: ' +
        userPercentage.toFixed(2) + '%',
      'short': false
    });
  }
  fields.push({
    'title': 'Team Total:',
    'value': 'Worked ' + dailyHours.toFixed(2) + ' hours today.',
    'short': false
  });
  var info = {
    'attachments': [{
      'fallback': 'Daily Hubstaff Report',
      'color': '#0E68DA',
      'author_name': organization.name,
      'title': 'Daily Hubstaff Report',
      'text': 'Here are the top three contributors to our Hubstaff hours today!',
      'fields': fields,
      'footer': 'Hubstaff',
      'footer_icon': 'http://i.imgur.com/zs9xvrt.png'
    }]
  };
  bot.reply(message, info);
}

function weeklyReport(bot, message, users, organization) {
  users.sort(function(a, b) {
    return b.weekly - a.weekly;
  });
  var fields = [];
  for(var i = 0; i < 3; i++) {
    var userHours = (users[i].weekly / 3600);
    var weeklyHours = (organization.weekly / 3600);
    var userPercentage = ((userHours / weeklyHours) * 100);
    fields.push({
      'title': (i + 1) + '. ' + users[i].name,
      'value': 'Worked ' + userHours.toFixed(2) + ' hour(s) this week. Percentage: ' +
        userPercentage.toFixed(2) + '%',
      'short': false
    });
  }
  fields.push({
    'title': 'Team Total:',
    'value': 'Worked ' + weeklyHours.toFixed(2) + ' hours this week.',
    'short': false
  });
  var info = {
    'attachments': [{
      'fallback': 'Weekly Hubstaff Report',
      'color': '#0E68DA',
      'author_name': organization.name,
      'title': 'Weekly Hubstaff Report',
      'text': 'Here are the top three contributors to our Hubstaff hours this week!',
      'fields': fields,
      'footer': 'Hubstaff',
      'footer_icon': 'http://i.imgur.com/zs9xvrt.png'
    }]
  };
  bot.reply(message, info);
}

function getData(bot, message, weekly) {
  var time = new Date();
  var day = time.getDate();
  var month = time.getMonth() + 1;
  var year = time.getFullYear();
  if(month < 10) {
    month = '0' + month.toString();
  }
  if(day < 10) {
    day = '0' + day.toString();
  }
  var hyphenDate = year.toString() + '-' + month.toString() + '-' + day.toString();
  var options = {
    url: 'https://api.hubstaff.com/v1/weekly/team',
    headers: {
      'Auth-Token': process.env.HUBSTAFF_AUTH_TOKEN,
      'App-Token': process.env.HUBSTAFF_APP_TOKEN
    }
  };
  var userList = [];
  request(options, function callback(error, response, body) {
    if(!error && response.statusCode === 200) {
      var info = JSON.parse(body);
      if(!_.isEmpty(info.organizations) && !_.isEmpty(info.organizations[0])) {
        var organization = info.organizations[0];
        for(var user of organization.users) {
          var date = _.findWhere(user.dates, { date: hyphenDate });
          if(!_.isEmpty(date)) {
            var userInfo = {
              name: user.name,
              id: user.id,
              type: 'user',
              weekly: user.duration,
              daily: date
            };
            userList.push(userInfo);
          }
        }
        var dailyDuration = 0;
        for(user of userList) {
          dailyDuration += user.daily.duration;
        }
        var org = {
          name: organization.name,
          id: organization.id,
          type: 'organization',
          weekly: organization.duration,
          daily: dailyDuration
        };
        if(weekly) {
          weeklyReport(bot, message, userList, org);
        } else {
          dailyReport(bot, message, userList, org);
        }
      } else {
        bot.reply(message,
          'Hubstaff didn\'t send me any data on your team. Try again later, maybe? :confused:'
        );
      }
    } else {
      bot.reply(message, 'There was an error getting the data from Hubstaff. :disappointed:');
    }
  });
}

global.piscobot.hears(['(weekly) hubstaff report', 'hubstaff report'], ['direct_mention',
    'direct_message'
  ],
  function(bot, message) {
    if(message.match[1] && message.match[1] === 'weekly') {
      getData(bot, message, true);
    } else {
      getData(bot, message, false);
    }
  }
);
