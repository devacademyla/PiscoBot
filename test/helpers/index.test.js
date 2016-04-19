'use strict';
var expect = require('chai').expect;
var index = require(__dirname + '/../../helpers/index.js');

describe('index', function() {
  describe('#randomFromArray()', function() {
    it('should be a function', function() {
      expect(index.randomFromArray).to.be.a('function');
    });
    it('should return a string', function() {
      var array = [
        'one',
        'two',
        'three',
        'four',
      ];
      var item = index.randomFromArray(array);
      expect(item).to.be.a('string');
    });
  });
});
