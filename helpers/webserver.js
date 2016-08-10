var express = require('express');
var app = express();
var _ = require('underscore');

app.use(express.static('public'));
app.set('view engine', 'pug');
app.get('/', function(req, res) {
  var og = {
    title: 'PiscoBot',
    url: 'http://devacademy-piscobot.herokuapp.com',
    image: 'https://cdn.rawgit.com/twitter/twemoji/gh-pages/72x72/1f379.png',
    favicon: 'https://cdn.rawgit.com/twitter/twemoji/gh-pages/36x36/1f379.png',
    icon: 'https://cdn.rawgit.com/twitter/twemoji/gh-pages/72x72/1f379.png',
    description: 'A Slackbot by devAcademy. Enjoy responsibly.',
    svg: 'https://cdn.rawgit.com/twitter/twemoji/gh-pages/svg/1f379.svg'
  };
  var responses = [
    'Pretty cool, amirite?',
    '"Hey, that\'s pretty good."',
    'It\'s something.',
    '¯\\_(ツ)_/¯',
    'We did it, Reddit!',
    '<pre>git clone https://github.com/devacademyla/PiscoBot</pre>',
    '#BienKattya',
    'baia baia',
    'Pretty awesome.',
    '[insert witty text here]',
    ':v',
    'This was a triumph.',
    'I\'m making a note here: HUGE SUCCESS.',
    'It\'s hard to overstate my satisfaction.',
    'Aperture Science.',
    'We do what we must because we can.',
    'For the good of all of us. Except the ones who are dead.',
    'But there\'s no sense crying over every mistake.',
    'You just keep on trying till you run out of cake.',
    'And the science gets done and you make a neat gun.',
    'For the people who are still alive.'
  ];
  res.render('index', {
    og: og,
    caption: _.sample(responses, 1)
  });
});
app.listen(process.env.PORT || 3000);
