// PiscoBot Script

var commandDescription = {
  name: 'Ship It',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'ship it',
  description: 'Celebrate the launch of a new release with squirrels.',
  module: 'Fun'
};

global.botHelp.push(commandDescription);

var _ = require('underscore');

global.piscobot.hears(['ship(it| it)'], ['ambient', 'direct_mention', 'direct_message', 'mention'],
  function(bot, message) {
    var squirrels = [
      'http://i.imgur.com/RLQpXfX.png',
      'http://i.imgur.com/DEnnA6m.jpg',
      'http://i.imgur.com/oHJIlXI.jpg',
      'http://i.imgur.com/BVpkdrU.jpg',
      'http://i.imgur.com/NSanWiX.jpg',
      'http://i.imgur.com/TEVqIZQ.jpg',
      'http://i.imgur.com/mUuDkyK.jpg',
      'http://i.imgur.com/ERCNrhd.jpg',
      'http://i.imgur.com/nxMZSJi.png',
      'http://i.imgur.com/Z8pEk5X.png'
    ];
    var motivation = _.sample(squirrels);
    bot.reply(message, '<@' + message.user + '>: ' + motivation);
  }
);
