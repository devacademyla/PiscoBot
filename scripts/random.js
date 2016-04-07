var helpers = require('./_helpers');

function doIt(bot, controller, message) {
    doIt = [
        "http://i.giphy.com/10FUfTApAeoZK8.gif",
        "http://i.giphy.com/qvdqF0PGFPfyg.gif",
        "http://i.giphy.com/wCiFka9RsSW9W.gif",
        "http://i.giphy.com/ypO01RIuQ3tHW.gif",
        "http://i.giphy.com/87xihBthJ1DkA.gif"
    ]
    motivation = helpers.randomFromArray(doIt);
    bot.reply(message, motivation);
}

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

function eightBall(bot, controller, message) {
    bot.startConversation(message, eightBallStart);
}
eightBallStart = function(response, convo) {
    convo.ask("Ahh, you have come to seek the wisdom of the universe! What would you like to ask?", function(response, convo) {
    	convo.say('Let me see here...\n `GET http://universe.api/wisdom?q=' + response.text + '`')
        answers = [
            'It is certain!',
            'It is decidedly so.',
            'Without a doubt!',
            'Yes, definitely.',
            'You may rely on it.',
            'As I see it, yes!',
            'Most likely.',
            'Outlook good!',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy... try again later.',
            'Ask again later...',
            '...I\'d rather not tell you now...',
            'Cannot predict now.',
            'Concentrate and ask again.',
            '...don\'t count on it.',
            'My reply is no.',
            'Outlook... not so good.',
            'Very doubtful.'
        ];
        wisdom = helpers.randomFromArray(answers);
        convo.say("My, uh, crystal ball says... _" + wisdom + "_")
        convo.next();
    });
}

module.exports = {
    doIt: function(bot, controller, message) {
        doit(bot, controller, message);
    },
    shipIt: function(bot, controller, message) {
        shipIt(bot, controller, message)
    },
    eightBall: function(bot, controller, message) {
        eightBall(bot, controller, message);
    }
}
