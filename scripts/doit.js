var helpers = require(__dirname + '/../helpers/');
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
module.exports = {
    name: 'doit',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['do.*it'],
    types: ['direct_message', 'direct_mention', 'ambient', 'mention'],
    description: 'Provide LeBoufian motivation',
    command: doIt
}
