
$(document).ready(function(){


var page_limit = 0;
var live_games_arr = new Array();
var new_live_games_arr = new Array();
var live_games_data;
var has_game_expired_interval;


setInterval(function(){
var get_current_user_interval = $.ajax({
url:"/get_current_user",
type:"POST",
data:{}
});

get_current_user_interval.done(function(data12){
console.log('The current user object: '+data12);
});

},1200);


has_game_expired_interval = setInterval(function(){

var has_game_expired = $.ajax({
url:"/has_game_expired",
type:"POST",
data:{game:game}
});


has_game_expired.done(function(data1911){
console.log(data1911);
});

},6000);


var get_live_games = $.ajax({
url:"/get_live_games",
type:"POST",
data:{limit:page_limit}
});


$('.middle_games_show_more_button').bind('click',function(){
load_more_games();
});

function load_more_games(){

if(page_limit == 0){
$('.middle_games_show_container').html('');
}

var slice_from = page_limit*5;
new_live_games_arr = new Array();
new_live_games_arr = live_games_arr.slice(slice_from,slice_from+5);

var live_games_data = "";

$.each(new_live_games_arr,function(key,value){
live_games_data += '<div class="middle_live_games_item"><span class="middle_live_games_name">'+value['name']+'</span>('+'<span class="middle_live_games_count">'+value['users'].length+'</span>)</div>';
});
live_games_data = live_games_data.replace("undefined","");

$('.middle_games_show_container').append(live_games_data);
page_limit = page_limit+1;

$('.middle_live_games_item').bind('click',function(){

var game_name = $(this).children('.middle_live_games_name').text();
game_name = game_name.trim();
console.log(game_name);

var is_user_host = $.ajax({
url:"/is_current_user_host",
type:"POST",
data:{game:game_name}

});

is_user_host.done(function(data121){

if(data121 == 'yes'){
var add_player_to_game = $.ajax({
url:"/add_player_to_game",
type:"POST",
data:{game_name:game_name}
});



add_player_to_game.done(function(data){
console.log(data);
if(data == 'player count exceeded'){

}else{
location.href = '/screen2?game='+game_name;
}
});
}else{
location.href = '/screen2?game='+game_name;
}

});

});



}


get_live_games.done(function(data){

live_games_arr = data;

if(live_games_arr.length == 0){
$('.middle_games_show_more_button').hide()
}

load_more_games();



$('.middle_live_games_item').bind('click',function(){

var game_name = $(this).children('.middle_live_games_name').text();
game_name = game_name.trim();
console.log(game_name);

var is_current_user = $.ajax({
url:"/is_current_user_host",
type:"POST",
data:{game:game_name}
});

is_current_user.done(function(data121){
console.log('is current user:'+data121);
if(data121 == 'yes'){

var add_player_to_game = $.ajax({
url:"/add_player_to_game",
type:"POST",
data:{game_name:game_name}
});



add_player_to_game.done(function(data){
console.log(data);
if(data == 'player count exceeded'){

}else{

//location.href = '/screen2?game='+game_name;
}
});
}

});

});


});


var get_invited_games = $.ajax({
url:"/get_user_invited_games",
type:"POST",
data:{}
});

get_invited_games.done(function(data12){



});



var get_last_login = $.ajax({
url:"/get_last_login",
type:"POST",
data:{}
});


get_last_login.done(function(data){
	
	
});


});