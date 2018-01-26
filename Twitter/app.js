
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.locals({
    title:'twitter'
});

var tweets=[];

app.get('/', routes.index);
app.post('/send',express.bodyParser(),function(req,res){
    if(req.body && req.body.tweet){
        tweets.push(req.body.tweet);
        res.send({status:'ok',message:'Tweet received'});
    }else{
        res.send({status:'nok',message:'no Tweet received'});
    }
});
app.get('/tweets',function(req,res){
    res.send(tweets);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
