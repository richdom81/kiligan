var net=require('net');

var chatServer=net.createServer();
var clientList=[];

chatServer.on('connection', function(client) {
	client.name = '[' + client.remoteAddress + ':' + client.remotePort + ']';
	console.log('Welcome ' + client.name + '!');
	broadcast('Let\'s welcome ' + client.name + '!\r\n', client);
	clientList.push(client);
	console.log('new client connected, totalSize=' + clientList.length);

	client.on('data', function(data) {
		broadcast(client.name + ':' + data + '\r\n', client);
	});

	client.on('end', function() {
		broadcast('Let\'s say goodbye to ' + client.name + '!\r\n', client);
		clientList.splice(clientList.indexOf(client), 1);
	});
})

function broadcast(msg, client) {
	var cleanup = [];
	for (var i=0, len=clientList.length;i<len;i++) {
		if (client != clientList[i]) {
			if (clientList[i].writable) {
				clientList[i].write(msg);
			} else {
				cleanup.push(clientList[i]);
				clientList[i].destroy();
			}
		}
	}

	for (var i=0, len=cleanup.length;i<len;i++) {
		clientList.splice(clientList.indexOf(cleanup[i]), 1);
	}
}

chatServer.listen(8888);