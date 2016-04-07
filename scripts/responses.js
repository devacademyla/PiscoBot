function hello(bot, controller, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.api.reactions.add({
                timestamp: message.ts,
                channel: message.channel,
                name: 'open_mouth',
            }, function(err, res) {
                if (err) {
                    bot.botkit.log('Failed to add emoji reaction :(', err);
                }
            });
            bot.reply(message, 'Hello ' + user.name + '! :smile:');
        } else {
            bot.api.reactions.add({
                timestamp: message.ts,
                channel: message.channel,
                name: 'smile',
            }, function(err, res) {
                if (err) {
                    bot.botkit.log('Failed to add emoji reaction :(', err);
                }
            });
            bot.reply(message, 'Oh, hello! :sweat_smile:');
        }
    });
}

function name(bot, controller, message) {
    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name + '! Hi, ' + user.name + '. :grin:');
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('Um... I don\'t think I know your name yet!');
                    convo.ask('What should I call you? :sweat_smile:', function(response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [{
                            pattern: bot.utterances.yes,
                            callback: function(response, convo) {
                                // since no further messages are queued after this,
                                // the conversation will end naturally with status == 'completed'
                                convo.next();
                            }
                        }, {
                            pattern: bot.utterances.no,
                            callback: function(response, convo) {
                                // stop the conversation. this will cause it to end with status == 'stopped'
                                convo.stop();
                            }
                        }, {
                            default: true,
                            callback: function(response, convo) {
                                convo.repeat();
                                convo.next();
                            }
                        }]);

                        convo.next();

                    }, { 'key': 'nickname' }); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! Lemme write that down somewhere...');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Got it! I\'ll call you ' + user.name + ' from now on.');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind! :sweat_smile:');
                        }
                    });
                }
            });
        }
    });
}

function callMe(bot, controller, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it! I\'ll call you ' + user.name + ' from now on.');
        });
    });
}

function ping(bot, controller, message) {
	bot.reply(message, 'Pong!');
}

function simsimi(bot, controller, message) {
	bot.reply(message, 'SimSimi? :thinking_face:');
}

module.exports = {
    hello: function(bot, controller, message) {
        hello(bot, controller, message)
    },
    name: function(bot, controller, message) {
        whoami(bot, controller, message)
    },
    callMe: function(bot, controller, message) {
        callme(bot, controller, message)
    },
    askMe: function(bot, controller, message) {
        askme(bot, controller, message)
    },
    ping: function(bot, controller, message) {
    	ping(bot, controller, message)
    }
}
