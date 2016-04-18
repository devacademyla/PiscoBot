'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../test.helper.js');

var eightBall = require(__dirname + '/../../scripts/eight_ball.js');

describe('eight_ball', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, eightBall);
  });
});
