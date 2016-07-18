// Return the bot's uptime as a string value
function uptime() {
  var unit = 'second';
  var processTime = process.uptime();
  if(processTime > 60) {
    processTime = processTime / 60;
    unit = 'minute';
  }
  if(processTime > 60) {
    processTime = processTime / 60;
    unit = 'hour';
  }
  if(processTime != 1) {
    unit = unit + 's';
  }
  processTime = processTime.toFixed(2) + ' ' + unit;
  return processTime;
}

module.exports = {
  uptime: uptime
};
