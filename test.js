var udpStream = require('./');

process.stdin.pipe(udpStream({ broadcast : '255.255.255.255', port : '61616' })).pipe(process.stdout);

