'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../test.helper.js');
var whoAmI = require(__dirname + '/../../scripts/whoami.js');

describe('whoami', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, whoAmI);
  });
});
