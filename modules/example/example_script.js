// Everything below the following line is an example of how you should write a 
// script for PiscoBot. Comments that you shouldn't include are in {curly 
// braces}.
// ==========================================================================
'use strict';
// PiscoBot Script
module.exports = {
    name: 'Example Script',
    author: 'Daniel Gallegos [@that_taco_guy]', 
    // {Format: name [twitter handle]}
    date: '29-06-2016' 
    // {Format: dd/mm/yyyy}
};

// {Require anything you need up here.}
var helpers = require('./../../helpers');

// {We're using the native .hears() function from BotKit in most of our scripts.
// It's written really well, so why reinvent the wheel?}
/* eslint-disable */
piscobot.hears('example', ['direct_mention', 'mention'],
/* eslint-enable */
    function(bot, message) {
        // {This moduleAllowed check is to make sure that this command can be
        // executed in a channel. It's an an important part of all of the 
        // scripts we have in PiscoBot.}
        var moduleAllowed = helpers.module.checkPermissions();
        if (moduleAllowed) {
            // {If the module is allowed, run any code that's in here. This is 
            // where you'll be writing your script!}
            bot.reply(
                message,
                'This is an example script.' +
                'It should be disabled by default, hopefully!'
            );
        } else {
            // {If the module isn't allowed, throw an error message privately
            // to the user.}
            helpers.modules.disabledMessage();
        }
    }
);
