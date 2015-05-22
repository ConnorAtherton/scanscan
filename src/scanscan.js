import net from 'net'
import hw from 'headway'

module.exports = function scanscan(opts) {
	let host = '127.0.0.1'
	let start = 1;
	let openSockets = 0

	const end = 1 << 16;
	const timeout = 2000;
	// only allow this many sockets to be open
	// at any one time
	const threshold  = 1000

	while (start < end) {
		// console.log(start, openSockets)
		// if (openSockets >= threshold) continue

		(function(port) {
			var s = net.createConnection(port, host);
			s.setTimeout(timeout)
			openSockets++

			s.on('timeout', () => {
				s.destroy()
				openSockets--
			})

			s.on('connect', () => {
				log(port, 'open')
				s.destroy()
				openSockets--
			})

			s.on('error', () => {
				s.destroy()
				openSockets--
			})
		})(start)

		start++
	}
}

function log(port, status) {
	console.log(`[SCAN] ${port} is ${status}`)
}

process.on('uncaughtException', (err) => {
   hw.log("{red}" + err);
   process.exit(1);
});

module.exports({})
