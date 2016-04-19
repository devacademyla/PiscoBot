'use strict';
var assert = require('chai').assert;
var ping = require(__dirname + '/../../scripts/ping.js');
var helper = require(__dirname + '/../../helpers/test/test.helper.js');

describe('ping', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, ping);
  });
});
