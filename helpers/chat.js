function pmCheck(bot, message) {
  if(message.event !== 'direct_message') {
    bot.reply(message, 'Hey, <@' + message.user + '>, I sent you a PM. :wink:');
  }
}

module.exports = {
  pmCheck: pmCheck
};
