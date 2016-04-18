'use strict';

function randomFromArray(array) {
  var random = array[Math.floor(Math.random() * array.length)];
  return random;
}
module.exports = {
  randomFromArray: randomFromArray,
};
