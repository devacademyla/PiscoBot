var rawScripts = require('require-all')(__dirname + '/../scripts')

var keywords = []
for (var script in rawScripts) {
    properties = rawScripts[script];
    for (var property in properties) {
        if (property === 'patterns') {
            var pattern = properties[property];
            for (var i = 0; i < pattern.length; i++) {
                keywords.push(pattern[i]);
            }
        }
    }
}

function index() {
    return keywords
}

function context(keyword, type) {
    var match = [false];
    for (var script in rawScripts) {
        properties = rawScripts[script];
        for (var i = 0; i < properties.patterns.length; i++) {
            var regex = new RegExp(properties.patterns[i])
            if (regex.test(keyword)) {
                for (var i = 0; i < properties.types.length; i++) {
                    if (type === properties.types[i]) {
                        match[0] = true
                        match[1] = properties.command;
                        return match
                    }
                }
            }
        }
    }
}

module.exports = {
    rawScripts: rawScripts,
    index: index,
    context: context
}
