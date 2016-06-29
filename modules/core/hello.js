// PiscoBot Script
// Script Name:     Hello
// Author:          Daniel Gallegos [@that_taco_guy]
// Creation Date:   29-06-2016

/* eslint-disable */
piscobot.hears('hello', ['direct_message', 'direct_mention', 'mention'],
/* eslint-enable */
    function(bot, message) {
        bot.reply(message, 'Hello yourself, .');
    }
);