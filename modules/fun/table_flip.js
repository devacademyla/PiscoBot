// PiscoBot Script

var commandDescription = {
  name: 'Table Flip',
  author: 'Daniel Gallegos [@that_taco_guy]',
  trigger: 'table flip',
  description: '(╯°□°）╯︵ ┻━┻',
  module: 'Fun'
};

global.botHelp.push(commandDescription);

var _ = require('underscore');

global.piscobot.hears(['table(flip| flip)', 'flip( | a )table'], 
  ['direct_mention', 'direct_message'],
  function(bot, message) {
    var flips = [
      '(╯°□°）╯︵ ┻━┻',
      '┬─┬﻿ ノ( ゜-゜ノ)',
      '(ノ ゜Д゜)ノ ︵ ┻━┻',
      '(╯°□°)╯︵ ┻━┻ ︵ ╯(°□° ╯)',
      '┬─┬﻿ ︵ /(.□. \\）',
      '‎(ﾉಥ益ಥ）ﾉ﻿ ┻━┻',
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
      'ʎɯǝpɐɔɐ ︵ヽ(`Д´)ﾉ︵ ʌǝp'
    ];
    bot.reply(message, _.sample(flips));
  }
);
