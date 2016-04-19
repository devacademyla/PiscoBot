'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../../helpers/test/test.helper.js');
var buildFail = require(__dirname + '/../../scripts/build_fail.js');

describe('build_fail', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, buildFail);
  });
});
