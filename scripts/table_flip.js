'use strict';
var helpers = require(__dirname + '/../helpers/');

function tableFlip(bot, controller, message) {
  var flips = [
    '(╯°□°）╯︵ ┻━┻',
    '┬─┬﻿ ノ( ゜-゜ノ)', // jshint ignore:line
    '(ノ ゜Д゜)ノ ︵ ┻━┻',
    '(╯°□°)╯︵ ┻━┻ ︵ ╯(°□° ╯)',
    '┬─┬﻿ ︵ /(.□. \\）', // jshint ignore:line
    '‎(ﾉಥ益ಥ）ﾉ﻿ ┻━┻', // jshint ignore:line
    '(ノ^_^)ノ┻━┻ ┬─┬ ノ( ^_^ノ)',
    '(╯°Д°）╯︵ /(.□ . \\)',
    '(╯\'□\')╯︵ ┻━┻',
    '(ﾉಥДಥ)ﾉ︵┻━┻･/',
    '(/ .□.)\\ ︵╰(゜Д゜)╯︵ /(.□. \\)',
    '(._.) ~ ︵ ┻━┻',
    'ʕノ•ᴥ•ʔノ ︵ ┻━┻',
    '(/¯◡ ‿ ◡)/¯ ~ ┻━┻',
    '(/¯◡ ‿ ◡)/¯ ~ ┻━┻',
    '┻━┻ ︵ ლ(⌒-⌒ლ)',
    'ʎɯǝpɐɔɐ ︵ヽ(`Д´)ﾉ︵ ʌǝp',
  ];
  var rage = helpers.randomFromArray(flips);
  bot.reply(message, rage);
}
module.exports = {
  name: 'Table Flip',
  author: 'Daniel Gallegos (thattacoguy)',
  patterns: ['flip', 'flip a table', 'table flip'],
  types: ['direct_message', 'direct_mention', 'mention'],
  description: 'rage',
  command: tableFlip,
};
