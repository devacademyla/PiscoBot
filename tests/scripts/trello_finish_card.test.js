'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../test.helper.js');
// jscs:disable
var trelloFinishCard = require(__dirname + '/../../scripts/trello_finish_card.js'); // jshint ignore:line
// jscs:enable

describe('trello_finish_card', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, trelloFinishCard);
  });
});
