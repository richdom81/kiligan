var http=require("http");
var url=require("url");

function start(route, handlers) {
	function onRequest(req, res) {
		var postData = "";
		var pathname = url.parse(req.url).pathname;

		// req.setEncoding("utf8");
		// req.addListener("data", function(postDataChunk) {
		// 	postData += postDataChunk;
		// 	console.log("Receive postDataChunk " + postDataChunk + ".");
		// });

		// req.addListener("end", function() {
		// 	route(pathname, handlers, res, postData);
		// });
		route(pathname, handlers, res, req);
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.....");
}

exports.start=start;