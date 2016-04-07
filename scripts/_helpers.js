module.exports = {
  randomFromArray: function (array) {
    random = array[Math.floor(Math.random() * array.length)];
    return random;
  },
};