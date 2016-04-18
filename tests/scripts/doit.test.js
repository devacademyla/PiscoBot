'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../test.helper.js');

var doIt = require(__dirname + '/../../scripts/doit.js');

describe('doit', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, doIt);
  });
});
