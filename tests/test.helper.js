'use strict';

module.exports = {
  metaDataCheck: function(assert, metaData) {
    assert.typeOf(metaData.name, 'string');
    assert.typeOf(metaData.author, 'string');
    assert.typeOf(metaData.patterns, 'array');
    assert.typeOf(metaData.types, 'array');
    assert.typeOf(metaData.description, 'string');
    assert.typeOf(metaData.command, 'function');
  },
};
