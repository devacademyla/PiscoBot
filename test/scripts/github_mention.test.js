'use strict';
var assert = require('chai').assert;
var helper = require(__dirname + '/../../helpers/test/test.helper.js');

var githubMention = require(__dirname + '/../../scripts/github_mention.js');

describe('github_mention', function() {
  it('should have metaData', function() {
    helper.metaDataCheck(assert, githubMention);
  });
});
