var core = require(__dirname + '/core.js');
var scripts = require(__dirname + '/scripts.js');
var keepAlive = require(__dirname + '/keepalive.js')
module.exports = {
	core: core,
	scripts: scripts,
	keepalive: keepAlive
}