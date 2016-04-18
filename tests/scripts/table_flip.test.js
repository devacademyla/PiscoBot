'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../test.helper.js');
var tableFlip = require(__dirname + '/../../scripts/table_flip.js');

describe('table_flip', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, tableFlip);
  });
});
