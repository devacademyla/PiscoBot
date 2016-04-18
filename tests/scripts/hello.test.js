'use strict';
var assert = require('chai').assert;
var hello = require(__dirname + '/../../scripts/hello.js');
var helper = require(__dirname + '/../test.helper.js');

describe('hello', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, hello);
  });
});
