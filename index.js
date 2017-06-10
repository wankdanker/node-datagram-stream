var udp = require('dgram')
    , pipe = require('stream').prototype.pipe
    , nodeVersion = process.version.replace('v','').split(/\./gi).map(function (t) { return parseInt(t, 10) });

module.exports = UdpStream;

function UdpStream (options, cb) {
    var options = options || {};

    var address         = options.address       || '0.0.0.0';
    var port            = options.port          || 12345;
    var bindingPort     = options.bindingPort   || port;
    var unicast         = options.unicast       || null;
    var broadcast       = options.broadcast     || null;
    var multicast       = options.multicast     || null;
    var multicastTTL    = options.multicastTTL  || 1;
    var destination     = unicast               || multicast || broadcast;
    var loopback        = options.loopback      || false;
    var reuseAddr       = (options.reuseAddr === false) ? false : true;
    var socket;

    if (nodeVersion[0] === 0 && nodeVersion[1] < 12) {
        //node v0.10 does not support passing an object to dgram.createSocket
        //not sure if v0.11 does, but assuming it does not.
        socket = udp.createSocket('udp4');
    }
    else {
        socket = udp.createSocket({type: 'udp4', reuseAddr: reuseAddr });
    }

    socket.write = function (message) {
        if (typeof message === "string") {
            message = new Buffer(message, "utf8");
        }

        socket.send(message, 0, message.length, port, destination);

        return true;
    };

    socket.end = function () {
        setImmediate(function () {
            socket.emit('end')
            socket.close();
        });
    };

    socket.pause = function () {
        socket.paused = true;
        return this;
    };

    socket.resume = function () {
        socket.paused = false;
        return this;
    };

    socket.on('message', function (msg, rinfo) {
        msg.rinfo = rinfo;

        socket.emit('data', msg);
    });

    socket.on('error', startupErrorListener);

    socket.bind(bindingPort, address);

    socket.on('listening', function () {
        socket.removeListener('error', startupErrorListener);

        if (multicast) {
            //set up for multicast
            try {
                socket.addMembership(multicast);
                socket.setMulticastTTL(multicastTTL);
                socket.setMulticastLoopback(loopback ? true : false);
            }
            catch (err) {
                socket.emit('error', err);

                return cb && cb(err);
            }
        }
        else if (broadcast) {
            socket.setBroadcast(true);
        }

        return cb && cb();
    });

    socket.pipe = pipe;

    return socket;

    function startupErrorListener(err) {
        return cb && cb(err);
    }
}
