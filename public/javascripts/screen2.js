

$(document).ready(function(){


get_user_comments();
var game = $('.top_game_title').text();
game = game.trim();

var has_game_started_interval;

var get_user_role12 = $.ajax({
url:"/is_current_user_host",
type:"POST",
data:{game:game}
});

get_user_role12.done(function(data1291){
if(data1291 == 'yes'){
$('.middle_start_new_game_button_screen2').show();
$('.middle_dismiss_game_button').show();


$('.middle_dismiss_game_button').bind('click',function(){

var dismiss_game1 = $.ajax({
url:"/dismiss_game",
type:"POST",
data:{game:game}
});

dismiss_game1.done(function(data181){
if(data181 == 'game dismissed'){
location.href = '/screen1';
}
});

});

}else{
$('.middle_start_new_game_button_screen2').hide();
}
});



has_game_started_interval = setInterval(function(){

var get_game_details = $.ajax({
url:"/get_game_details",
type:"POST",
data:{game:game}
});


get_game_details.done(function(data1001){
console.log(data1001);
if(data1001.length != 0){

var has_game_started = $.ajax({
url:"/has_host_started_game",
type:"POST",
data:{game:game}
});

has_game_started.done(function(data101){
console.log(data101);
if(data101 == 'yes'){
location.href = '/game?game='+game;
}
});

}else{
clearInterval(has_game_started_interval);
location.href = '/screen1';
}

});

},2300);



$('.middle_start_new_game_button_screen2').bind('click',function(){


var get_user_role = $.ajax({
url:"/is_current_user_host",
type:"POST",
data:{game:game}
});


get_user_role.done(function(data1881){
console.log(data1881);
if(data1881 == 'yes'){

var is_game_ready = $.ajax({
url:"/is_game_ready",
type:"POST",
data:{game_name:game}
});


is_game_ready.done(function(data){
console.log(data);

var start_the_game = $.ajax({
url:"/start_the_game",
type:"POST",
data:{game:game}
});

start_the_game.done(function(data191){
console.log(data191);
if(data191 != 'game not ready'){
location.href = '/game?game='+data;

}else{
$('.mafia_lightbox_modal').html('The game needs atleast 9 players.<div><button class="hide_mafia_lightbox_button">Ok</button></div>');
$('.mafia_lightbox_modal').css({
'z-index' : '10001',
'opacity' : '1',
'pointer-events' : 'auto'
});

$('.hide_mafia_lightbox_button').bind('click',function(){
console.log('hide lightbox called');
$('.mafia_lightbox_modal').css({
'z-index' : '-6',
'opacity' : '0',
'pointer-events' : 'none'
});
});
}

});

});

}

});

});

var game = $('.top_game_title').text();
game = game.trim();

var get_game_players = $.ajax({
url:"/get_game_players",
type:"POST",
data:{game:game}
});


get_game_players.done(function(data){

var get_user_role13 = $.ajax({
url:"/is_current_user_host",
type:"POST",
data:{game:game}
});


get_user_role13.done(function(data9912){



var game_players_data;
console.log(data);

$.each(data[0].users,function(key,value){
if(value['name'] != 'god'){
game_players_data += '<div class="middle_games_show_person"><div class="middle_games_show_person_name">'+value['name']+'</div></div>';
}
});

game_players_data = game_players_data.replace("undefined","");
$('.middle_games_show_container').html('<div class="middle_games_show_person_name">GOD</div>');
$('.middle_games_show_container').append(game_players_data);


if(data9912 == 'yes'){
console.log('current user host');
$('.middle_games_show_person_name').append('<span class="kickout_player_element">X</span>');

$('.middle_games_show_person_name').bind('click',function(){

var player1 = $(this).children('.middle_games_show_person').text();
player1 = player1.trim();

console.log('middle games : '+player1);

var kickout_player1 = $.ajax({
url:"/kickout_player",
type:"POST",
data:{game:game,player:player1}
});

kickout_player1.done(function(data1811){
console.log(data1811);
if(data1811 == 'player removed'){
location.href = '/screen2?game='+game;
}

});

});

}

});


});


$('.join_this_game_button').bind('click',function(){

var game_result = $.ajax({
url:"/add_player_to_game",
type:"POST",
data:{game_name:game},
});

game_result.done(function(data12){

console.log(data12);
});

});


$('.invite_fb_friends_button').bind('click',function(){



/*
var game_name = $('.top_game_title').text();
game_name = game_name.trim();

var add_player_to_game = $.ajax({
url:"/add_player_to_game",
type:"POST",
data:{game_name:game_name}
});


add_player_to_game.done(function(data){


});

*/

});


function get_user_comments(){
	var get_user_comments = $.ajax({
		url:"/get_user_comments",
		type:"POST",
		data:{game:game}
		
	});
	
	get_user_comments.done(function(user_comments){
		
		console.log(user_comments);
	});
	
}



function add_user_comment(game,user,comment){
	
	var add_user_comment = $.ajax({
		url:"/add_user_comment",
		type:"POST",
		data:{game:game,user:user,comment:comment}
	});
	
	add_user_comment.done(function(comment){
		console.log(comment);
	});
	
}


});