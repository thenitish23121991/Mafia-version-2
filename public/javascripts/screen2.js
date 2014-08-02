

$(document).ready(function(){

$('.middle_start_new_game_button_screen2').bind('click',function(){

var game_name = $('.top_game_title').text();
game_name = game_name.trim();

var is_game_ready = $.ajax({
url:"/is_game_ready",
type:"POST",
data:{game_name:game_name}
});


is_game_ready.done(function(data){

if(data != 'game not ready'){
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

var game = $('.top_game_title').text();
game = game.trim();

var get_game_players = $.ajax({
url:"/get_game_players",
type:"POST",
data:{game:game}
});


get_game_players.done(function(data){

var game_players_data;
console.log(data);

$.each(data[0].users,function(key,value){
game_players_data += '<div class="middle_games_show_person_name">'+value['name']+'</div>';
});

game_players_data = game_players_data.replace("undefined","");
$('.middle_games_show_container').html(game_players_data);

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


});