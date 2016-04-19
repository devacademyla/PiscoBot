'use strict';
var assert = require('chai').assert;
var math = require(__dirname + '/../../scripts/math.js');
var helper = require(__dirname + '/../../helpers/test/test.helper.js');

describe('math', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, math);
  });
});
