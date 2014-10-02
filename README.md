datagram-stream
---------------

[![Build Status](https://travis-ci.org/wankdanker/node-datagram-stream.svg)](https://travis-ci.org/wankdanker/node-datagram-stream)

A streaming UDP module with broadcast, multicast and unicast options.

install
-------

```bash
npm install datagram-stream
```

usage
-----

## multicast

```js
var udp = require('datagram-stream');

var stream = udp({
    multicast  : '239.5.5.5' //multicast ip address to send to and listen on
    , port     : 5555        //udp port to send to and listen on
    , loopback : true        //boolean: whether or not to receive sent datagrams
                             //         on the loopback device. Only applies to
                             //         multicast. Default: false
});

//pipe whatever is received to stdout
stream.pipe(process.stdout);

//pipe whatever is received on stdin over udp
proces.stdin.pipe(stream);
```

## broadcast

```js
var udp = require('datagram-stream');

var stream = udp({
    broadcast  : '255.255.255.255' //broadcast ip address to send to and listen on
    , port     : 5555              //udp port to send to and listen on
});

//pipe whatever is received to stdout
stream.pipe(process.stdout);

//pipe whatever is received on stdin over udp
proces.stdin.pipe(stream);
```

## broadcast

```js
var udp = require('datagram-stream');

var stream = udp({
    unicast    : '127.0.0.1'       //unicast ip address to send to
    , port     : 5555              //udp port to send to and listen on
});

//pipe whatever is received to stdout
stream.pipe(process.stdout);

//pipe whatever is received on stdin over udp
proces.stdin.pipe(stream);
```

acknowledgments
---------------

I used @dominictarr's [broadcast-stream](https://github.com/dominictarr/broadcast-stream) as a
guide for how to implement the stream.


license
-------

MIT
