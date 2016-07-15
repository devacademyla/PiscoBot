var http = require('http');
var _ = require('underscore');

function server() {
  // Create HTTP service to let bot stay alive
  http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    var htmlhead =
      '<html><head>';
    htmlhead +=
      '<link href=\'https://fonts.googleapis.com/css?family=Work+Sans:700\' rel=\'stylesheet\' ';
    htmlhead += 'type=\'text/css\'>';
    htmlhead +=
      '<title>PiscoBot</title> ';
    htmlhead +=
      '<style>body{background: #00B8F4; color: #fff; font-family: \'Work Sans\', sans-serif; ';
    htmlhead += 'margin-top: 10em;}';
    htmlhead += 'h1{text-align: center;}.red{color: #FF000A;}</style></head><body> <h1>';
    var responses = [
      'This was a triumph.',
      'I\'m making a n<span class="red">o</span>te here:\nHUGE SUCCESS.',
      'It\'s hard to overstate my satisfacti<span class="red">o</span>n.',
      'Aperture Science.',
      'We d<span class="red">o</span> what we must because we can.',
      'For the g<span class="red">o</span>od of all of us\nExcept the ones who are dead.',
      'But there\'s n<span class="red">o</span> sense crying over every mistake.',
      'You just keep <span class="red">o</span>n trying till you run out of cake.',
      'And the science gets d<span class="red">o</span>ne and you make a neat gun.',
      'F<span class="red">o</span>r the people who are still alive.'
    ];
    // jscs:enable
    var htmlfoot = '</h1></body></html>';
    var res = htmlhead + _.sample(responses) + htmlfoot;
    response.end(res);
  }).listen(process.env.PORT || 3000);
}

module.exports = {
  start: server
};
