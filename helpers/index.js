function randomFromArray(array) {
    random = array[Math.floor(Math.random() * array.length)];
    return random;
}
module.exports = {
    randomFromArray: randomFromArray
};
