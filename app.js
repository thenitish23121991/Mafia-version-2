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


setInterval(function(){
var live_games = new Array();
game1.get_live_games(0,function(data181){
console.log(data181);
live_games = data181;
live_games.forEach(function(element,index){
var game_name = live_games[index].name;
game1.has_game_expired(game_name,function(data10001){
console.log(data10001);
});
});
});

},1000*60*60);


app.post('/kickout_player',function(req,res){
var game = req.body.game;
var player = req.body.player;
console.log('kickout player: '+game+'<br/>'+player);
game1.kickout_player(game,player,function(data19191){
console.log(data19191);
res.send(data19191);
});
});


app.post('/report_player',function(req,res){
	
 var player_id = req.body.player_id;
 var reportee = req.body.reportee;
 
 game1.report_player(player_id,reportee,function(data12){
	 
	console.log(data12); 
 });
});


app.post('/dismiss_game',function(req,res){
var game = req.body.game;
game1.dismiss_game(game,function(data191){
res.send(data191);
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


app.post('/get_user_comments',function(req,res){

game1.get_user_comments(game_name,function(docs){
	
console.log('docs: '+docs);	
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
var current_user = req.session.current_user;
game1.get_current_role(game_name,current_user,function(data191){
console.log('data191: '+data191);
console.log('data: '+data);
var user_role = data191;
console.log('current_user: '+current_user);
console.log('game name: '+game_name);
user_role = user_role.trim();
res.render('game',{game_name:game_name,game_users:game_users,user_role:user_role});
});
});
});


app.get('/review',function(req,res){
var game = req.query.game;
game1.get_game_info(game,function(data191){
var game_users = data191[0].users;
console.log(game_users);
res.render('review',{game:game,game_users:game_users});
});
});


app.post('/add_nick',function(req,res){
var nick = req.body.nick;
console.log('nick : '+nick);
game1.add_nick(nick,function(docs){
if(docs != 'nick already taken'){
console.log(docs);
req.session.current_user = docs.name;
res.send('nick added');
}else{
res.send('nick already taken');
}
});
});

app.post('/add_game',function(req,res){
var name = req.body.name;
console.log('game : '+name);
var current_user = req.session.current_user;
game1.add_game(name,current_user,function(docs){
console.log(docs);
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
console.log('current_user: '+req.session.current_user);
res.send(req.session.current_user);
});


app.post('/get_live_games',function(req,res){
var limit1 = req.body.limit;
console.log(limit1);
game1.get_live_games(limit1,function(docs){
console.log('live games: '+docs);
res.send(docs);
});
});


app.post('/has_game_expired',function(req,res){
var game = req.body.game;
game1.has_game_expired(game,function(data191){
console.log('has game expired'+data191);
res.send(data191);
});
});


app.post('/add_player_to_game',function(req,res){
var game_name = req.body.game_name;
var player_name = req.session.current_user;
console.log('current player: '+player_name);
game1.add_player_to_game(game_name,player_name,function(docs){
console.log('add player to game docs: '+docs);
res.send(docs);
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
res.send(data);
}else{
res.send('game not ready');
}

});
});

app.post('/add_mafia_answer',function(req,res){
var answer = req.body.answer;
var player = req.session.current_user;
var game = req.body.game;
var answer_result;
//console.log(game);
game1.add_mafia_answer(game,answer,player,function(data){
console.log(data[0].mafia_answers.length);
if(data[0].mafia_answers.length == 3){
game1.mafia_answer_result(data[0].mafia_answers,function(docs12){
answer_result = docs12;
res.send(answer_result);
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


app.post('/inform_city',function(req,res){
var game = req.body.game;
game1.inform_city(game,function(docs122){
res.send(docs122);
});
});


app.post('/start_first_vote',function(req,res){
var game = req.body.game;
game1.start_first_vote(game,function(docs111){
if(docs111[0].final_vote.length == 9){

}else{

}
});
});

app.post('/start_final_vote',function(req,res){
var game = req.body.game;
game1.start_final_vote(game,function(docs111){
if(docs111[0].final_vote.length == 9){

}else{

}
});
});


app.post('/add_game_message',function(req,res){
var game = req.body.game;
var message = req.body.message;
var player = req.session.current_user;
game1.get_current_role(game,player,function(docs121){
console.log(docs121);
game1.add_game_message(game,player,docs121,message,function(docs1121){
res.send(docs1121);
});
});
});

app.post('/get_game_messages',function(req,res){
var game = req.body.game;
var player = req.session.current_user;
game1.get_current_role(game,player,function(docs12){
if(docs12 != 'mafia'){
game1.get_game_messages(game,'others',function(docs1212){
res.send(docs1212);
});
}
});
});


app.post('/add_night_message',function(req,res){
var game = req.body.game;
var player = req.session.current_user;
var message = req.body.message;
game1.add_night_message(game,message,player,function(data1918){
console.log(data1918);
res.send(data1918);
});
});


app.post('/add_day_message',function(req,res){
var game = req.body.game;
var player = req.session.current_user;
var message = req.body.message;
game1.add_day_message(game,message,player,function(data1917){
console.log(data1917);
res.send(data1917);
});
});

app.post('/get_day_messages',function(req,res){
var game = req.body.game;
game1.get_day_messages(game,function(data1917){
console.log(data1917);
res.send(data1917);
});
});

app.post('/get_night_messages',function(req,res){
var game = req.body.game;
game1.get_night_messages(game,function(data1917){
console.log(data1917);
res.send(data1917);
});
});

app.post('/get_game_details',function(req,res){
var game = req.body.game;
game1.get_game_info(game,function(docs1991){
//console.log(docs1991);
res.send(docs1991);
});
});


app.post('/get_mafia_answer',function(req,res){
var game = req.body.game;
game1.get_game_info(game,function(data12112){
var answers = data12112[0].mafia_answers;
console.log('answers: '+answers);
game1.mafia_answer_result(answers,function(docs1212){
console.log(docs1212);
res.send(docs1212);
});
});
});


app.post('/has_healer_killed',function(req,res){
var game = req.body.game;
game1.has_healer_killed(game,function(docs1211){
res.send(docs1211);
});
});

app.post('/has_healer_healed',function(req,res){
var game = req.body.game;
game1.has_healer_healed(game,function(docs1211){
res.send(docs1211);
});
});

app.post('/add_healer_answer',function(req,res){
var game = req.body.game;
var player = req.body.player;
console.log('add healer answer: '+game+' + '+player);
game1.add_healer_answer(game,player,function(docs1211){
res.send('healer answer added');
});
});


app.post('/has_mafias_answered',function(req,res){
console.log('app answered called');
var game = req.body.game;
game1.has_mafia_answered(game,function(docs121){
console.log('in app: '+docs121);
res.send(docs121);
});
});

app.post('/add_healer_heal',function(req,res){
console.log('add healer heal');
var game = req.body.game;
var player = req.body.player;
game1.add_healer_healed(game,player,function(docs121){
res.send('healer has healed');
console.log('healer has healed');
});
});

app.post('/has_healer_answered',function(req,res){
var game = req.body.game;
game1.has_healer_answered(game,function(docs121){
console.log(docs121);
res.send(docs121);
});
});


app.post('/add_healer_answered',function(req,res){

});


app.post('/add_detective_answer',function(req,res){
var game = req.body.game;
var answer = req.body.answer;
game1.add_detective_answer(game,answer,function(docs12){
res.send(docs12);
});
});

app.post('/has_detective_answered',function(req,res){
var game = req.body.game;
game1.has_detective_answered(game,function(docs121){
res.send(docs121);
});
});


app.post('/is_suspect_correct',function(req,res){
var game = req.body.game;
var suspect = req.body.suspect;
game1.is_suspect_correct(game,suspect,function(data121){
res.send(data121);
});
});


app.post('/get_killed_players',function(req,res){
var game = req.body.game;
game1.get_killed_players(game,function(data311){
res.send(data311);
});
});


app.post('/dacoit_kill_person',function(req,res){
var game = req.body.game;
var answer = req.body.answer;
var user = req.session.current_user;
game1.dacoit_kill_person(game,user,answer,function(data11111){

});
});

app.post('/add_first_vote',function(req,res){
var game = req.body.game;
var vote_answer = req.body.vote_answer;
var player = req.session.current_user;
console.log('game: '+game+' vote_answer: '+vote_answer+' player: '+player);
game1.add_first_vote(game,player,vote_answer,function(data131){
res.send(data131);
});
});


app.post('/get_first_vote_result',function(req,res){
var game = req.body.game;
game1.get_first_vote_result(game,function(data151){
res.send(data151);
});
});


app.post('/is_first_vote_done',function(req,res){
var game = req.body.game;
game1.is_first_vote_done(game,function(data121){
console.log(data121);
res.send(data121);
});
});

app.post('/final_answer_add',function(req,res){
var game = req.body.game;
var answer = req.body.answer;
var player = req.session.current_user;
console.log('add final vote');
game1.add_final_answer(game,player,answer,function(data171){
console.log('add final answer: '+data171);
res.send(data171);
});
});

app.post('/is_final_vote_done',function(req,res){
var game = req.body.game;
game1.is_final_vote_done(game,function(data1211){
console.log(data1211);
res.send(data1211);
});
});

app.post('/has_game_ended',function(req,res){
var game = req.body.game;
game1.has_game_ended(game,function(data181){
res.send(data181);
});
});


app.post('/start_game_cycle',function(req,res){
var game = req.body.game;
game1.start_game_cycle(game,function(data101){
res.send(data101);
});
});


app.post('/init_mafia',function(req,res){
var game = req.body.game;
game1.init_mafia(game,function(data171){
console.log(data171);
res.send(data171);
});
});


app.post('/init_votes',function(req,res){
var game = req.body.game;
game1.init_votes(game,function(data171){
console.log(data171);
res.send(data171);
});
});


app.post('/has_mafia_voted',function(req,res){
var game = req.body.game;
var player = req.session.current_user;
game1.has_mafia_voted(game,player,function(data191){
console.log('has mafia voted: '+data191);
res.send(data191);
});
});


app.post('/start_the_game',function(req,res){
var game = req.body.game;
game1.start_the_game(game,function(data171){
console.log(data171);
res.send(data171);
});
});


app.post('/is_current_user_host',function(req,res){
var game = req.body.game;
var player = req.session.current_user;
game1.is_current_user_host(game,player,function(data1991){
console.log('is_current_user_host: '+data1991);
res.send(data1991);
});
});



app.post('/has_host_started_game',function(req,res){
var game = req.body.game;
game1.has_host_started_game(game,function(data14111){
//console.log(data14111);
res.send(data14111);
});
});


app.post('/has_dacoit_voted',function(req,res){
var game = req.body.game;
game1.has_dacoit_voted(game,function(data191){
res.send(data191);
});
});


app.post('/is_game_present',function(req,res){
var game = req.body.game;
console.log(game);
game1.is_game_present(game,function(data181){
console.log(data181);
res.send(data181);
});
});


app.post('/init_detective',function(req,res){
var game = req.body.game;
game1.init_detective(game,function(data181){
res.send(data181);
});
});


app.post('/has_user_final_voted',function(req,res){
var game = req.body.game; 
var user = req.session.current_user;
game1.has_user_final_voted(game,user,function(data191){
console.log(data191);
res.send(data191);
});
});


app.post('/has_user_first_voted',function(req,res){
var game = req.body.game;
var player = req.session.current_user;
game1.has_user_voted_first(game,player,function(data191){
console.log('has user first voted app: '+data191);
res.send(data191);
});
});


app.post('/has_user_voted_final',function(req,res){
var game = req.body.game;
var player = req.session.current_user;
game1.has_user_voted_final(game,player,function(data191){
res.send(data191);
});
});


app.post('/get_first_votes_result',function(req,res){
var game = req.body.game;
game1.get_first_user_vote_results(game,function(data1212){
console.log(data1212);
res.send(data1212);
});
});


app.post('/get_final_votes_results',function(req,res){
var game = req.body.game;
game1.get_final_user_vote_results(game,function(data1212){
game1.update_final_vote_results(data1212,function(data1312){
console.log('final vote results in app: '+data1212);
res.send(data1212);
});
});
});


app.post('/dacoit_killed',function(req,res){
var game = req.body.game; 
var killed = req.body.killed;
var player = req.session.current_user;
game1.dacoit_killed(game,player,killed,function(data181){
res.send(data181);
});
});


app.post('/get_game_results',function(req,res){
var game = req.body.game;
game1.get_game_result(game,function(data191){
console.log(data191);
res.send(data191);
});
});


app.post('/add_explain_yourself_message',function(req,res){
var game = req.body.game;
var message = req.body.message;
var player = req.session.current_user;
game1.add_explain_yourself_message(game,player,message,function(data191){
console.log(data191);
res.send(data191);
});
});

app.post('/get_explain_yourself_messages',function(req,res){
var game = req.body.game;
game1.get_explain_yourself_messages(game,function(data191){
console.log(data191);
res.send(data191);
});
});


app.post('/has_dacoit_killed_anyone',function(req,res){
var game = req.body.game;
console.log(game);
game1.has_dacoit_killed_anyone(game,function(data191){
console.log(data191);
res.send(data191);
});
});


app.post('/is_player_dead',function(req,res){
var game = req.body.game;
var player = req.session.current_user;
game1.is_player_dead(game,player,function(data181){
console.log(data181);
res.send(data181);
});
});

//game1.assign_mafias('nitish123');


module.exports = app;
