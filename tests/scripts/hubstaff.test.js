'use strict';
var assert = require('chai').assert;
var hubstaff = require(__dirname + '/../../scripts/hubstaff.js');
var helper = require(__dirname + '/../test.helper.js');

describe('hubstaff', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, hubstaff);
  });
});
