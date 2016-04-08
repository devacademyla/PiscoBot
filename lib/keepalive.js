var http = require('http');
var CronJob = require('cron').CronJob;
var helpers = require('./../helpers/');
var request = require('request');

function keepAlive(controller) {
    // Create HTTP service to let bot stay alive
    http.createServer(function(request, response) {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        responses = [
            'This was a triumph.',
            'I\'m making a note here:\nHUGE SUCCESS.',
            'It\'s hard to overstate my satisfaction.',
            'Aperture Science.',
            'We do what we must because we can.',
            'For the good of all of us\nExcept the ones who are dead.',
            'But there\'s no sense crying over every mistake.',
            'You just keep on trying till you run out of cake.',
            'And the science gets done and you make a neat gun.',
            'For the people who are still alive.'
        ]
        res = helpers.randomFromArray(responses)
        response.end(res);
        controller.log('Serving keepalive page.')
    }).listen(process.env.PORT || 3000);
    new CronJob('*/5 * * * *', function() {
        controller.log('Pinging bot to keep it alive... ')
        url = process.env.KEEPALIVE_URL || 'http://localhost'
        port = process.env.PORT || 3000
        var req = request.get(url + ':' + port, function(err, res, body) {
            if (!err && res.statusCode == 200) {
                controller.log('Still alive! :D')
            } else {
                controller.log('Warning: Couldn\'t ping bot! D:')
            }
        });
    }, null, true, 'America/Los_Angeles');
}

module.exports = {
    start: keepAlive
}
