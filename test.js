var udpStream = require('./')
    , test = require('tape');

test('broadcast destination', function (t) {
    t.plan(1);

    var s = udpStream({ broadcast : '255.255.255.255', port : '61616' })
    
    s.on('data', function (chunk) {
        t.equal('hello', chunk.toString());
        t.end();

	s.end();
    });

    s.write('hello');
});

test('multicast destination', function (t) {
    t.plan(1);

    var s = udpStream({ multicast : '239.5.5.5', port : '61616', loopback : true })
    
    s.on('data', function (chunk) {
        t.equal('hello', chunk.toString());
        t.end();

	s.end();
    });

    s.write('hello');
});

test('unicast destination', function (t) {
    t.plan(1);

    var s = udpStream({ unicast : '127.0.0.1', port : '61616' })
    
    s.on('data', function (chunk) {
        t.equal('hello', chunk.toString());
        t.end();

	s.end();
    });

    s.write('hello');
});

