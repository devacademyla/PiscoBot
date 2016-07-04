'use strict';
// ========================================
//    ___ _                 ___       _
//   / _ (_)___  ___ ___   / __\ ___ | |_
//  / /_)/ / __|/ __/ _ \ /__\/// _ \| __|
// / ___/| \__ \ (_| (_) / \/  \ (_) | |_
// \/    |_|___/\___\___/\_____/\___/ \__|
// ========================================
//        Please enjoy responsibly.

// Require core Botkit library, because we need to
// do things with it (obviously).
var Botkit = require('botkit');

var botConfig = {};
if (process.env.DEBUG) {
    botConfig = {
        debug: true,
        logLevel: 7
    };
} else {
    botConfig = {
        debug: false
    };
}

global.piscobot = Botkit.slackbot(botConfig);

if (process.env.SLACK_API_TOKEN) {
    // Connect the bot to Slack's RTM API.
    global.piscobot.spawn({
        // Grabs the token from the currently running process. 
        token: process.env.SLACK_API_TOKEN
    }).startRTM();
} else {
    console.log(
        'WARNING: No SLACK_API_TOKEN present' +
        ', can\'t connect to Slack!'
    );
    console.log(
        'NOTICE: Exiting app because we can\'t' +
        ' really do anything without a token.'
    );
    process.end(1);
}

// Set more global variables.

global._ = require('underscore');

/* eslint-disable */
var scripts = require('require-all')({
    /* eslint-enable */
    dirname: __dirname + '/modules',
    recursive: true
});
