var helpers = require(__dirname + '/../helpers/');

function shipIt(bot, controller, message) {
    shipIt = [
        "http://i.imgur.com/RLQpXfX.png",
        "http://i.imgur.com/DEnnA6m.jpg",
        "http://i.imgur.com/oHJIlXI.jpg",
        "http://i.imgur.com/BVpkdrU.jpg",
        "http://i.imgur.com/NSanWiX.jpg",
        "http://i.imgur.com/TEVqIZQ.jpg",
        "http://i.imgur.com/mUuDkyK.jpg",
        "http://i.imgur.com/ERCNrhd.jpg",
        "http://i.imgur.com/nxMZSJi.png",
        "http://i.imgur.com/Z8pEk5X.png"
    ]
    motivation = helpers.randomFromArray(shipIt);
    bot.reply(message, motivation);
}

module.exports = {
    name: 'shipit',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['ship.*it'],
    types: ['direct_message', 'direct_mention', 'ambient', 'mention'],
    description: 'Provide Sciuridaedean motivation',
    command: shipIt
}
