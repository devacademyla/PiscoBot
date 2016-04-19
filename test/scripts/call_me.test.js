'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../../helpers/test/test.helper.js');
var callMe = require(__dirname + '/../../scripts/call_me.js');

describe('call_me', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, callMe);
  });
});
