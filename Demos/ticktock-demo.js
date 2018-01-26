// var http = require('http'); 
// var s = http.createServer(function(req, res) { 　　
// 	res.writeHead(200, {}); 　　
// 	res.end('foo'); 　　
// 	console.log('http response'); 　　
// 	process.nextTick(function() {
// 		console.log('tick')
// 	}); 
// }); 
// s.listen(8000);

var http = require('http');
var wait = function (mils) {
    var now = new Date;
    while (new Date - now <= mils);
};
function compute() {
    // performs complicated calculations continuously
    console.log('start computing');
    wait(1000);
    console.log('working for 1s, nexttick');
    // process.nextTick(compute);
    setImmediate(compute);
}
http.createServer(function (req, res) {
    console.log('new request');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
}).listen(8888);
compute();