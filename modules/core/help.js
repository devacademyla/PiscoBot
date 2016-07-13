// PiscoBot Script

var commandDescription = {
  name: 'Help',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'help',
  version: 1.0,
  description: 'General help function to learn how PiscoBot works.',
  module: 'Core'
};

global.botHelp.push(commandDescription);

var helpers = require('./../../helpers');
var _ = require('underscore');

function botInfo(response, convo) {
  var pjson = require('./../../package.json');
  var repo = 'https://github.com/devacademyla/piscobot';
  var info = {
    'attachments': [{
      'fallback': 'Required plain-text summary of the attachment.',
      'color': '#FF7300',
      'pretext': 'Alright! Here\'s what I can tell you about me:',
      'author_name': 'devAcademy',
      'author_link': 'https://devacademy.la',
      'author_icon': 'https://devacademy.la/favicon.png',
      'title': 'PiscoBot',
      'title_link': 'https://github.com/devacademyla/piscobot',
      'text': 'Enjoy responsibly. :tropical_drink:',
      'fields': [{
        'title': 'Version',
        'value': pjson.version,
        'short': true
      }, {
        'title': 'Uptime',
        'value': helpers.core.uptime(),
        'short': true
      }, {
        'title': 'Source code',
        'value': '<' + repo + '|On GitHub>',
        'short': false
      }, {
        'title': 'Issue tracker',
        'value': '<' + repo + '/issues|Submit feature requests and bug reports here!>',
        'short': false
      }]
    }]
  };
  convo.say(info);
  convo.say('Hope that helps! :smile:');
  convo.next();
}

function commandList(response, convo) {
  var helpList = _.sortBy(global.botHelp, function(help) {
    return help.name;
  });
  var fields = [];
  for(var moduleName of helpers.modules.list) {
    var moduleCommands = _.where(helpList, { module: moduleName });
    var triggers = '';
    for(var command of moduleCommands) {
      if(command.trigger) {
        triggers += '"' + command.trigger + '", ';
      }
    }
    if(!(_.isEmpty(triggers))) {
      triggers = triggers.slice(0, -1);
    }
    var field = {
      'title': moduleName,
      'value': triggers,
      'short': false
    };
    fields.push(field);
  }
  var commands = {
    'attachments': [{
      'fallback': '',
      'color': '#FF7300',
      'pretext': 'Here\'s a list of things I can do for you!',
      'title': 'Command list',
      'fields': fields
    }]
  };
  convo.say(commands);
  convo.say('Hope that helps! :smile:');
  convo.next();
}

function commandInfo(response, convo) {
  var search = new RegExp(response.match[1], 'i');
  var fields = [];
  for(var command of global.botHelp) {
    if(command.name.match(search) || command.trigger.match(search)) {
      var field = {
        'title': command.name,
        'value': '"' + command.trigger + '" - ' + command.description,
        'short': false
      };
      fields.push(field);
    }
  }
  if(_.isEmpty(fields)) {
    convo.say('I wasn\'t able to find any thing I can do that matches `' + response.match[1] +
      '`... Sorry! :worried:');
    convo.next();
  } else {
    convo.say({
      'attachments': [{
        'fallback': 'PiscoBot command search list',
        'color': '#FF7300',
        'pretext': 'Here\'s what I found for "' + response.match[1] +
          '" in the list of stuff I can do for you...',
        'title': 'Search results',
        'fields': fields
      }]
    });
  }
  convo.next();
}

function helpController(response, convo) {
  convo.ask('What can I help you with?', [{
    pattern: /^info/,
    callback: function(response, convo) {
      botInfo(response, convo);
    }
  }, {
    pattern: /^command list/,
    callback: function(response, convo) {
      commandList(response, convo);
    }
  }, {
    pattern: /^command info (.*)/,
    callback: function(response, convo) {
      commandInfo(response, convo);
    }
  }, {
    pattern: /(nothing|nevermind|exit)/,
    callback: function(response, convo) {
      convo.say('Alright, nevermind! :smile:');
      convo.next();
    }
  }, {
    default: true,
    callback: function(response, convo) {
      convo.say('I didn\'t quite get what you meant by that. Say `exit` if you\'re stuck.');
      convo.repeat();
      convo.next();
    }
  }]);
}

global.piscobot.hears('^help', ['direct_mention', 'direct_message'],
  function(bot, message) {
    if(message.event !== 'direct_message') {
      bot.reply(
        message,
        'Hey, <@' + message.user + '>, I sent you a PM. :wink:'
      );
    }
    bot.startPrivateConversation(message,
      function(err, dm) {
        var commandIntro = {
          'attachments': [{
            'fallback': 'PiscoBot list of commands.',
            'color': '#FF7300',
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
              'title': '\"command info [command name]\"',
              'value': 'Show you information on how a command works.',
              'short': false
            }, {
              'title': '\"nothing\"/\"nevermind\"/\"exit\"',
              'value': ' ¯\\_(ツ)_/¯',
              'short': false
            }]
          }]
        };
        dm.say(commandIntro);
        helpController(message, dm);
      }
    );
  }
);

global.piscobot.hears('^command list', ['direct_message'],
  function(bot, message) {
    bot.startPrivateConversation(message,
      function(err, dm) {
        commandList(message, dm);
      }
    );
  }
);
global.piscobot.hears('^command info (.*)', ['direct_message'],
  function(bot, message) {
    bot.startPrivateConversation(message,
      function(err, dm) {
        commandInfo(message, dm);
      }
    );
  }
);
