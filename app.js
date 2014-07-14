var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');
var game1 = require('game');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(express.cookieParser());  
app.use(express.session({ secret: 'secret'}));
app.use(app.router);

app.get('/', routes.index);
app.get('/users', users.list);

app.listen(3101);


app.get('/sessions',function(req,res){
req.session.name = 'nitish';
console.log(req.session.name);
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});






app.get('/',function(req,res){
res.render('index');
});

app.get('/sessions',function(req,res){
});


app.get('/screen1',function(req,res){
res.render('screen1');
});


app.get('/screen2',function(req,res){
res.render('screen2');
});


app.get('/game',function(req,res){
res.render('game');
});


app.get('/review',function(req,res){
res.render('review');
});


app.post('/add_nick',function(req,res){
var nick = req.body.nick;
console.log('nick : '+nick);
game1.add_nick(nick,function(docs){
req.session.current_user = docs.name;
res.send('nick added');
});
});

app.post('/add_game',function(req,res){
var name = req.body.name;
console.log('game : '+name);
var current_user = req.session.current_user;
game1.add_game(name,current_user,function(docs){
res.send('game added');
});
});


app.post('/get_game_id_from_name',function(req,res){
var name = req.body.name;
game1.get_game_id_from_name(name,function(docs){
console.log(docs);
res.send(docs);
});
});

app.post('/get_game_players',function(req,res){
var game = req.body.game;
game1.get_game_players(game,function(docs){
console.log(docs);
res.send(docs);
});
});


app.post('/get_current_user',function(req,res){
res.send(req.session.current_user);
});


app.post('/get_live_games',function(req,res){
game1.get_live_games(function(docs){
console.log(docs);
res.send(docs);
});
});





module.exports = app;
