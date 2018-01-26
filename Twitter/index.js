var express = require('express');
var app = express();

app.get("/", function(req, res) {
	res.send("express says hello!");
});

app.listen(8888);