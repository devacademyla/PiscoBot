'use strict';
// ========================================
//    ___ _                 ___       _
//   / _ (_)___  ___ ___   / __\ ___ | |_
//  / /_)/ / __|/ __/ _ \ /__\/// _ \| __|
// / ___/| \__ \ (_| (_) / \/  \ (_) | |_
// \/    |_|___/\___\___/\_____/\___/ \__|
// ========================================
//        Please enjoy responsibly.

// Require core Botkit library, because we need to do things with it (obviously)
var Botkit = require('botkit');

if(process.env.MONGODB_URI) {
  var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI });
}
// Set botConfig variable
var botConfig = {};
if(process.env.DEVELOPMENT) {
  botConfig = {
    debug: true,
    logLevel: 7,
    storage: mongoStorage
  };
} else {
  botConfig = {
    debug: false,
    storage: mongoStorage
  };
}

// Set the bot controller as a global variable which can be accessed in 
// any file without having to pass it through anything.
global.piscobot = Botkit.slackbot(botConfig);

// Set a global `botHelp` array that can be modified by any script
// to be able to include itself in the `help` command. 
global.botHelp = [];


// If there's a SLACK_API_TOKEN,
if(process.env.SLACK_API_TOKEN) {
  // Connect the bot to Slack's RTM API.
  global.piscobot.spawn({
    // Grab the token from the currently running process. 
    token: process.env.SLACK_API_TOKEN
  }).startRTM();
} else {
  // Otherwise exit cleanly.
  Botkit.log(
    'WARNING: No SLACK_API_TOKEN present, can\'t connect to Slack!'
  );
  Botkit.log(
    'NOTICE: Exiting app because we can\'t do anything without a token.'
  );
  process.end(0);
}


// Load all of the scripts into the bot.
// Disable ESLint because this is necessary for the app to work.
/* eslint-disable */
var scripts = require('require-all')({
  dirname: __dirname + '/modules',
  recursive: true
});
/* eslint-enable */

// Start up our webserver.

var helpers = require('./helpers');
helpers.webserver.start();
