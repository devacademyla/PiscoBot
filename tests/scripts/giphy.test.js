'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../test.helper.js');
var spotify = require(__dirname + '/../../scripts/giphy.js');

describe('giphy', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, giphy);
  });
});
