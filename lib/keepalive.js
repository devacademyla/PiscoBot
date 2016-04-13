var http = require('http');
var helpers = require('./../helpers/');
var request = require('request');

function keepAlive(controller) {
    // Create HTTP service to let bot stay alive
    http.createServer(function(request, response) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        htmlhead = "<html><head> <link href='https://fonts.googleapis.com/css?family=Work+Sans:700' rel='stylesheet' type='text/css'> <title>PiscoBot</title> <style>body{background: #00B8F4; color: #fff; font-family: 'Work Sans', sans-serif; margin-top: 10em;}h1{text-align: center;}.red{color: #FF000A;}</style></head><body> <h1>"
        responses = [
            'This was a triumph.',
            'I\'m making a n<span class="red">o</span>te here:\nHUGE SUCCESS.',
            'It\'s hard to overstate my satisfacti<span class="red">o</span>n.',
            'Aperture Science.',
            'We d<span class="red">o</span> what we must because we can.',
            'For the g<span class="red">oo</span>d of all of us\nExcept the ones who are dead.',
            'But there\'s n<span class="red">o</span> sense crying over every mistake.',
            'You just keep <span class="red">o</span>n trying till you run out of cake.',
            'And the science gets do<span class="red">o</span>ne and you make a neat gun.',
            'F<span class="red">o</span>r the people who are still alive.'
        ]
        htmlfoot = '</h1></body></html>'
        res = htmlhead + helpers.randomFromArray(responses) + htmlfoot
        response.end(res);
        controller.log('Serving keepalive page.')
    }).listen(process.env.PORT || 3000);
}

module.exports = {
    start: keepAlive
}
