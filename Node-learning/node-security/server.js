var http = require('http');
var buffer = new Buffer(1024 * 1024);
buffer.fill('y');

http.createServer(function(resquest, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(buffer);
}).listen(8000);

console.log(process.memoryUsage());

setInterval(function(){
    console.log(process.memoryUsage());
}, 60 * 1000);



