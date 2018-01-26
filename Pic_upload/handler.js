var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(res) {
	console.log("Request handler start is called.....");
	var body = '<html>'+ 
	'<head>'+ 
	'<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+ 
	'</head>'+ 
	'<body>'+ 
	'<form action="/upload" enctype="multipart/form-data" method="post">'+ 
	'<input type="file" name="pic" />'+ 
	'<input type="submit" value="Upload Pic" />'+
	'</form>'+ 
	'</body>'+ 
	'</html>';
	res.writeHead(200,{"Content-Type":"text/html"});
	res.write(body);
	res.end();	
}

function upload(res, req) {
	console.log("Request handler upload is called.....");

	var form = new formidable.IncomingForm();
	form.uploadDir = 'tmp';
	form.parse(req, function(error, fields, files) {
		console.log("parsing finished");
		fs.renameSync(files.pic.path, "./pics/test.png");
		res.writeHead(200,{"Content-Type":"text/html"});
		res.write("Received image: <br />");
		res.write("<img src='/showpic' />");
		res.end();
	});
	
}

function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
}

function showPic(res, req) {
	console.log("Request handler showPic is called.....");
	fs.readFile("./pics/test.png", "binary", function(error, file) {
		if (error) {
			res.writeHead(500, {"Content-Type":"text/plain"});
			res.write(error + "\n");
			res.end();
		} else {
			res.writeHead(200, {"Content-Type":"image/png"});
			res.write(file, "binary");
			res.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.showPic = showPic;