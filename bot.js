// ========================================
//    ___ _                 ___       _   
//   / _ (_)___  ___ ___   / __\ ___ | |_ 
//  / /_)/ / __|/ __/ _ \ /__\/// _ \| __|
// / ___/| \__ \ (_| (_) / \/  \ (_) | |_ 
// \/    |_|___/\___\___/\_____/\___/ \__|
// ========================================
//        Please enjoy responsibly.

// Load PiscoBot library
var lib = require('./lib');
var async = require('async');

// Declare variables
var bot = lib.core.bot
var controller = lib.core.controller
var scriptIndex = lib.scripts.index()
var scriptContext = lib.scripts.context

// Seperate listening into different functions
controller.hears(scriptIndex, ['direct_message'], function(bot, message) {
    scriptMatches = scriptContext(message.match[0], 'direct_message');
    if (scriptMatches && scriptMatches[0] === true) {
        command = scriptMatches[1];
        command(bot, controller, message);
    }
});
controller.hears(scriptIndex, ['direct_mention'], function(bot, message) {
    scriptMatches = scriptContext(message.match[0], 'direct_mention');
    if (scriptMatches && scriptMatches[0] === true) {
        command = scriptMatches[1];
        command(bot, controller, message);
    }
});
controller.hears(scriptIndex, ['bot_message'], function(bot, message) {
    scriptMatches = scriptContext(message.match[0], 'bot_message');
    if (scriptMatches && scriptMatches[0] === true) {
        command = scriptMatches[1];
        command(bot, controller, message);
    }
});
controller.hears(scriptIndex, ['mention'], function(bot, message) {
    scriptMatches = scriptContext(message.match[0], 'mention');
    if (scriptMatches && scriptMatches[0] === true) {
        command = scriptMatches[1];
        command(bot, controller, message);
    }
});
controller.hears(scriptIndex, ['ambient'], function(bot, message) {
    scriptMatches = scriptContext(message.match[0], 'ambient');
    if (scriptMatches && scriptMatches[0] === true) {
        command = scriptMatches[1];
        command(bot, controller, message);
    }
});
controller.on('bot_message', function(bot, message) {
    async.each(scriptIndex, function(matcher, callback) {
        var regex = new RegExp(matcher, 'i');
        var match = message.match(regex)
        if (match) {
            scriptMatches = scriptContext(match[0], 'bot_message');
            if (scriptMatches && scriptMatches[0] === true) {
                command = scriptMatches[1];
                command(bot, controller, message);
            }
        }
    });
});

// Start bot keepAlive server
var keepAlive = lib.keepalive.start(controller)
