var helpers = require(__dirname + '/../helpers/');
function tableFlip(bot, controller, message) {
    var flips = [
        '(╯°□°）╯︵ ┻━┻',
        '┬─┬﻿ ノ( ゜-゜ノ)',
        '(ノ ゜Д゜)ノ ︵ ┻━┻',
        '(╯°□°)╯︵ ┻━┻ ︵ ╯(°□° ╯)',
        '┬─┬﻿ ︵ /(.□. \\）',
        '‎(ﾉಥ益ಥ）ﾉ﻿ ┻━┻',
        '(ノ^_^)ノ┻━┻ ┬─┬ ノ( ^_^ノ)',
        '(╯°Д°）╯︵ /(.□ . \\)',
        "(╯'□')╯︵ ┻━┻",
        '(ﾉಥДಥ)ﾉ︵┻━┻･/',
        '(/ .□.)\\ ︵╰(゜Д゜)╯︵ /(.□. \\)',
        '(._.) ~ ︵ ┻━┻',
        'ʕノ•ᴥ•ʔノ ︵ ┻━┻',
        '(/¯◡ ‿ ◡)/¯ ~ ┻━┻',
        '(/¯◡ ‿ ◡)/¯ ~ ┻━┻',
        '┻━┻ ︵ ლ(⌒-⌒ლ)',
        'ʎɯǝpɐɔɐ ︵ヽ(`Д´)ﾉ︵ ʌǝp'
    ];
    rage = helpers.randomFromArray(flips);
    bot.reply(message, rage);
}
module.exports = {
    name: 'Table Flip',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['flip', 'flip a table', 'table flip'],
    types: ['direct_message', 'direct_mention', 'mention'],
    description: 'rage',
    command: tableFlip
}
