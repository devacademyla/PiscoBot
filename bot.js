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


var piscobot = Botkit.slackbot({
    // Turns off debugging since this is a production deployment,
    // most likely.
    debug: false
});

if (process.env.SLACK_API_TOKEN) {
    // Connect the bot to Slack's RTM API.
    piscobot.spawn({
        // Grabs the token from the currently running process. 
        token: process.env.SLACK_API_TOKEN
    }).startRTM();
}
/* eslint-disable */
var scripts = require('require-all')({
/* eslint-enable */
    dirname: __dirname + '/modules',
    recursive: true
});
