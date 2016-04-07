// ========================================
//    ___ _                 ___       _   
//   / _ (_)___  ___ ___   / __\ ___ | |_ 
//  / /_)/ / __|/ __/ _ \ /__\/// _ \| __|
// / ___/| \__ \ (_| (_) / \/  \ (_) | |_ 
// \/    |_|___/\___\___/\_____/\___/ \__|
// ========================================
//        Please enjoy responsibly.


// Check for API token
if (!process.env.SLACK_API_TOKEN) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

// Load Botkit dependencies
var Botkit = require('botkit/lib/Botkit.js');
var os = require('os');
var url = require('url');
var scripts = require('./scripts/_index');

// Set debugging to env variable
var controller
if (process.env.PISCOBOT_PRODUCTION) {
    controller = Botkit.slackbot({
        debug: false,
    });
} else {
    controller = Botkit.slackbot({
        debug: true,
    });
}

var bot = controller.spawn({
    token: process.env.SLACK_API_TOKEN
}).startRTM();


var redisURL = url.parse(process.env.REDISCLOUD_URL);
var redisStorage = redis({
    namespace: 'botkit-example',
    host: redisURL.hostname,
    port: redisURL.port,
    auth_pass: redisURL.auth.split(":")[1]
});
var controller = Botkit.slackbot({
    storage: redisStorage
});

// Triggers

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {
    scripts.response.hello(bot, controller, message);
});
controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    scripts.response.callme(bot, controller, message);
});
controller.hears(['what is my name', 'what\'s my name', 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {
    scripts.response.name(bot, controller, message);
});
// controller.hears(['what do you know about me', 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {
//     scripts.response.whoami(bot, controller, message);
// });
controller.hears(['ping'], 'direct_message,direct_mention', function(bot, message) {
    scripts.response.ping(bot, controller, message);
});
controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function(bot, message) {
    scripts.command.shutDown(bot, controller, message);
});
controller.hears(['spotify me (.*)'], 'direct_message,direct_mention', function(bot, message) {
    scripts.command.spotify(bot, controller, message);
});
controller.hears(['8ball'], 'direct_message,direct_mention', function(bot, message) {
    scripts.random.eightBall(bot, controller, message);
});


controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention',
    function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I\'m <@' + bot.identity.name +
            '>! I have been running for `' + uptime + '` on `' + hostname + '`.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}
