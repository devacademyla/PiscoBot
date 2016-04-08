// Check for API token
if (!process.env.SLACK_API_TOKEN) {
    console.log('Error: SLACK_API_TOKEN not found, exiting.');
    process.exit(1);
}

// Require modules needed for Core
var url = require('url');
var os = require('os');

// Declare constants
var controller;
var Botkit = require('botkit');
if (process.env.REDISCLOUD_URL) {
    var redisURL = url.parse(process.env.REDISCLOUD_URL);
    Botkit = require('botkit'),
        redisConfig = {
            namespace: 'botkit-example',
            host: redisURL.hostname,
            port: redisURL.port,
            auth_pass: redisURL.auth.split(":")[1]
        },
        redisStorage = require('botkit-storage-redis')(redisConfig),
        controller = Botkit.slackbot({
            debug: false,
            storage: redisStorage
        });
} else {
    Botkit = require('botkit');
    controller = Botkit.slackbot({
        debug: false,
    });
}
var bot = controller.spawn({
    token: process.env.SLACK_API_TOKEN
}).startRTM();

module.exports = {
    controller: controller,
    bot: bot,
    os: os
}
