// Everything below the following line is an example of how you should write a 
// script for PiscoBot. Comments that you shouldn't include are in {curly 
// braces}.
// ==========================================================================
// PiscoBot Script

var example = {
  name: 'Example Script',
  author: 'Daniel Gallegos [@that_taco_guy]',
  commandTrigger: 'example',
  version: 1.0,
  description: 'Use this space to describe how to use your function.',
  module: 'Example'
};

global.botHelp.push(example);

// {Require anything else you need up here.}

// {We're using the native .hears() function from BotKit in most of our scripts. It's written really
// well, so why reinvent the wheel?}
global.piscobot.hears('example', ['direct_mention'],
  function(bot, message) {
    bot.reply(message, 'This is an example script.');
  }
);
