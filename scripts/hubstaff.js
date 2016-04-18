'use strict';
var request = require('request');

function getHubstaffHours(bot, message, type) {
  var options = {};
  var typeOfReport = '';
  var date = '';
  var hyphenDate = '';
  var msg = '';
  if (type === 'weekly') {
    options = {
      url: 'https://api.hubstaff.com/v1/weekly/team/',
      headers: {
        'Auth-Token': process.env.HUBSTAFF_AUTH_TOKEN,
        'App-Token': process.env.HUBSTAFF_APP_TOKEN,
      },
    };
    typeOfReport = 'this week';
  } else {
    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth();
    month = month + 1;
    if (month < 10) {
      month = '0' + month.toString();
    }
    var year = now.getFullYear();
    date = year.toString() + month.toString() + day.toString();
    hyphenDate = year.toString();
    hyphenDate += '-' + month.toString();
    hyphenDate += '-' + day.toString();
    options = {
      url: 'https://api.hubstaff.com/v1/custom/by_date/team',
      headers: {
        'Auth-Token': process.env.HUBSTAFF_AUTH_TOKEN,
        'App-Token': process.env.HUBSTAFF_APP_TOKEN,
      },
      qs: {
        // jscs:disable
        // Disabled because `start_date` and `end_date` 
        // are external variables and are not part of the application.
        start_date: date,
        end_date: date,
        // jscs:enable
      },
    };
    typeOfReport = 'today';
  }
  request(options, function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(body);
      var organization = info.organizations;
      organization = organization[0];
      var time = organization.duration;
      var hours = Math.round((time / 60) / 60);
      msg = 'Hey, team! We\'ve worked a total of `';
      msg += hours.toString() + ' hours` ' + typeOfReport + '! :smile:';
      var top = {
        duration: 0,
        name: 'John Doe',
        time: 0,
      };
      var i = 0;
      if (typeOfReport === 'this week') {
        for (i = 0; i < organization.users.length; i++) {
          if (organization.users[i].duration > top.duration) {
            top = {
              duration: organization.users[i].duration,
              name: organization.users[i].name,
              time: Math.round((organization.users[i].duration / 60) / 60),
            };
          }
        }
      } else {
        for (i = 0; i < organization.dates[0].users.length; i++) {
          if (organization.dates[0].users[i].duration > top.duration) {
            var user = organization.dates[0].users[i];
            top = {
              duration: user.duration,
              name: user.name,
              time: Math.round((user.duration / 60) / 60),
            };
          }
        }
      }

      var percentage = Math.round((top.time / hours) * 100);
      msg += '\nMajor props to ' + top.name.toString();
      msg += ', who worked `' + top.time.toString() + ' hours` ';
      msg += typeOfReport + '!';
      msg += ' That\'s like-... `' + percentage.toString();
      msg += '%` of all of the hours worked ' + typeOfReport;
      msg += '. Woah! :open_mouth:';
      bot.reply(message, msg);
    } else {
      msg = 'That\'s weird...';
      msg += 'Sorry, but I couldn\'t get the Hubstaff stats. :disappointed:';
      bot.reply(message, msg);
    }
  });
}

function hubstaff(bot, controller, message) {
  var res = message.text.match(/(weekly|daily)/i);
  var typeOfDay = res || 'daily';
  switch (typeOfDay[1]) {
    case 'weekly':
      getHubstaffHours(bot, message, 'weekly');
      break;
    case 'daily':
      getHubstaffHours(bot, message, 'daily');
      break;
    default:
      getHubstaffHours(bot, message, 'daily');
  }
}
module.exports = {
  name: 'Hubstaff',
  author: 'Daniel Gallegos (thattacoguy)',
  patterns: ['( weekly| daily)? hubstaff report',
    'hubstaff( weekly| daily)? report',
    'give me a( weekly| daily)? hubstaff report',
  ],
  types: ['direct_message', 'direct_mention'],
  description: 'Hubstaff reports!',
  command: hubstaff,
};
