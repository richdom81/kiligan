var http = require('http'); 
var server = http.createServer(function(req,res) { 　　
	res.writeHead(200, {}); 　　
	res.end('response'); 　　
	badLoggingCall('sent response'); 　　
	console.log('sent response'); 
}); 
process.on('uncaughtException', function(e) { 　　
	console.log(e); 
}); 
server.listen(8080);