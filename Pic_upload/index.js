var server=require("./server");
var router=require("./router");
var handler=require("./handler");

var handlers = {};
handlers["/"] = handler.start;
handlers["/start"] = handler.start;
handlers["/upload"] = handler.upload;
handlers["/showpic"] = handler.showPic;

server.start(router.route,handlers);