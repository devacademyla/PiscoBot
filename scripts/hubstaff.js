var request = require('request')

var options = {
    url: 'https://api.hubstaff.com/v1/weekly/team/',
    headers: {
        'Auth-Token': process.env.HUBSTAFF_AUTH_TOKEN,
        'App-Token': process.env.HUBSTAFF_APP_TOKEN
    }
};

function ping(bot, controller, message) {
    request(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var organization = info.organizations;
            organization = organization[0];
            var time = organization.duration;
            var hours = Math.round((time / 60) / 60);
            var msg = 'Hey, team! We\'ve worked `' + hours.toString() + ' hours` total this week! :smile:';
            var top = {
                duration: 0,
                name: 'John Doe',
                time: 0
            };
            for (var i = 0; i < organization.users.length; i++) {
                if (organization.users[i].duration > top.duration) {
                    top = {
                        duration: organization.users[i].duration,
                        name: organization.users[i].name,
                        time: Math.round((organization.users[i].duration / 60) / 60)
                    }
                }
            }
            percentage = Math.round((top.time / hours) * 100);
            msg += '\nMajor props to ' + top.name.toString() + ', who worked `' + top.time.toString() + ' hours` this week!';
            msg += 'That\'s like-... ' + percentage.toString() + '% of all of the hours worked this week. Woah! :open_mouth:'
            bot.reply(message, msg);
        } else {
            bot.reply(message, 'That\'s weird... I couldn\'t get the Hubstaff stats. :disappointed:')
        }
    });

}
module.exports = {
    name: 'ping',
    author: 'Daniel Gallegos (thattacoguy)',
    patterns: ['hubstaff', 'hubstaff report', 'give me a hubstaff report', 'show me a hubstaff report'],
    types: ['direct_message', 'direct_mention'],
    description: 'Ping the bot!',
    command: ping
}
