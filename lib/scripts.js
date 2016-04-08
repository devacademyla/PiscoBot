var rawScripts = require('require-all')(__dirname + '/../scripts');
var async = require('async');
var keywords = [];
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
    return keywords;
}

function context(keyword, type) {
    var match = [false];
    async.forEachOf(rawScripts, function(value, key, callback) {
        triggers = value;
        async.each(triggers, function(trigger, callback) {
            if (keyword !== trigger) {
                callback();
            } else {
                async.each(rawScripts[key].types, function(asyncType, callback) {
                    if (type !== asyncType) {
                        callback();
                    } else {
                        match[0] = true;
                        match[1] = rawScripts[key].command;
                        callback();
                    }
                });
                callback();
            }
        });
    });
}

module.exports = {
    rawScripts: rawScripts,
    index: index,
    context: context
};
