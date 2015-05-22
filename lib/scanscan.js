'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _headway = require('headway');

var _headway2 = _interopRequireDefault(_headway);

module.exports = function scanscan(opts) {
	var host = '127.0.0.1';
	var start = 1;
	var openSockets = 0;

	var end = 1 << 16;
	var timeout = 2000;
	// only allow this many sockets to be open
	// at any one time
	var threshold = 1000;

	while (start < end) {
		// console.log(start, openSockets)
		// if (openSockets >= threshold) continue

		(function (port) {
			var s = _net2['default'].createConnection(port, host);
			s.setTimeout(timeout);
			openSockets++;

			s.on('timeout', function () {
				s.destroy();
				openSockets--;
			});

			s.on('connect', function () {
				log(port, 'open');
				s.destroy();
				openSockets--;
			});

			s.on('error', function () {
				s.destroy();
				openSockets--;
			});
		})(start);

		start++;
	}
};

function log(port, status) {
	console.log('[SCAN] ' + port + ' is ' + status);
}

process.on('uncaughtException', function (err) {
	_headway2['default'].log('{red}' + err);
	process.exit(1);
});

module.exports({});
