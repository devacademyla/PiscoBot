'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../../helpers/test/test.helper.js');
var spotify = require(__dirname + '/../../scripts/spotify.js');

describe('spotify', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, spotify);
  });
});
