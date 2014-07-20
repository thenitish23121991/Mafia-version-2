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



function get_current_role(game,user,req){
console.log('get current role');
game1.get_current_role(game,user,function(docs1){
req.session.current_role = docs1;
console.log('role:'+req.session.current_role);
});
}

app.post('/get_current_role',function(req,res){
console.log('get current role post');
var game = req.body.game;
var current_user = req.session.current_user;
console.log(current_user);
get_current_role(game,user,req);
//res.send(req.session.current_role);
});


app.post('/get_current_user_role',function(req,res){
var game_name = req.body.game_name;
var player_name = req.session.current_user; 
game1.get_current_role(game_name,player_name,function(docs2){
console.log('docs2'+docs2);
res.send(docs2);
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
var game_name = req.query.game;
if(req.session.current_user != 'undefined'){
res.render('screen2',{game_name:game_name});
}
else{
res.render('/');
}
});


app.get('/game',function(req,res){
var game_name = req.query.game;
game1.get_game_info(game_name,function(data){
var game_users = data[0].users;
console.log(data);
res.render('game',{game_name:game_name,game_users:game_users});
});
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
res.send(docs);
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
console.log('live games: '+docs);
res.send(docs);
});
});


app.post('/add_player_to_game',function(req,res){
var game_name = req.body.game_name;
var player_name = req.session.current_user;
console.log('current player: '+player_name);
game1.add_player_to_game(game_name,player_name,function(docs){
console.log(docs[0].users);
});
setTimeout(function(){
get_current_role(game_name,player_name,req);
},2000);
});



app.post('/get_mafia_answers',function(req,res){
var game = req.body.game_name;
if(req.session.current_user){

}else{

}
});


app.post('/assign_players',function(req,res){
var game = req.body.game_name;
//game1.assign_mafias(game);
game1.assign_players(game,function(data){
console.log(data);
});
});

app.post('/is_game_ready',function(req,res){
var game = req.body.game_name;
console.log('is game ready called');
game1.is_game_ready(game,function(data){
if(data == 'game ready'){
req.session.current_game = game;
console.log('session: '+req.session.current_game);
res.send(game);
}else{
res.send('game not ready');
}

});
});

app.post('/add_mafia_answer',function(req,res){
var answer = req.body.answer;
var player = req.session.current_user;
var game = req.body.game;
console.log(game);
game1.add_mafia_answer(game,answer,player,function(data){
console.log(data);
if(data[0].mafia_answers.length == 3){
game1.mafia_answer_result(data[0].mafia_answers,function(docs12){
callback(docs12);
});
}
//res.send(data);
});
});

app.post('/kill_person',function(req,res){
var game = req.body.game;
var current_user = req.session.current_user;
var status = req.body.status;
game1.kill_person(game,current_user,'dead',function(data12){

});
});


//game1.assign_mafias('nitish123');


module.exports = app;
