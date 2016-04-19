'use strict';
var assert = require('chai').assert;
var lilMoises = require(__dirname + '/../../scripts/lilmoises.js');
var helper = require(__dirname + '/../../helpers/test/test.helper.js');

describe('lilmoises', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, lilMoises);
  });
});
