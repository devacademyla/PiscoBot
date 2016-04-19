'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../../helpers/test/test.helper.js');
var shipIt = require(__dirname + '/../../scripts/ship_it.js');

describe('ship_it', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, shipIt);
  });
});
