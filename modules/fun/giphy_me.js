// PiscoBot Script

var commandDescription = {
  name: 'Giphy Me',
  author: 'Deiby Toralva [@deibytb]',
  trigger: 'giphy me [search terms]',
  description: 'Search for a gif on Giphy',
  module: 'Fun'
};

global.botHelp.push(commandDescription);

var request = require('request');

global.piscobot.hears('giphy me (.*)', ['direct_message', 'direct_mention'],
  function(bot, message) {
    var msg = '';
    var url = 'http://api.giphy.com/v1/gifs/search?q=';
    url += message.match[1] + '&api_key=dc6zaTOxFJmzC';
    request.get(url, function(err, res, body) {
      if(!err && res.statusCode === 200) {
        var response = JSON.parse(body);
        var gifs = response.data.length;
        var urls = response.data[0].images.fixedHeight.url;
        if(gifs > 0 && urls !== null) {
          bot.reply(message, urls);
        } else {
          msg = 'Huh... I couldn\'t find `' + message.match[1] + '` on Giphy.';
          bot.reply(message, msg);
        }
      } else {
        msg = 'Huh... I couldn\'t find `' + message.match[1] + '` on Giphy.';
        bot.reply(message, msg);
      }
    });
  }
);
