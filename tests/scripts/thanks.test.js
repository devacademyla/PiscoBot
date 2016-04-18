'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../test.helper.js');
var thanks = require(__dirname + '/../../scripts/thanks.js');

describe('thanks', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, thanks);
  });
});
