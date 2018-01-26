function route(pathname, handlers, response, request) {
	console.log("Ready to route a request for " + pathname);
	if (typeof handlers[pathname] == 'function') {
		handlers[pathname](response, request);
	} else {
		response.writeHead(404,{"Content-Type":"text/plain"});
		response.write("404 Not found");
		response.end();	
	}
}

exports.route = route;