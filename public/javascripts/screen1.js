
$(document).ready(function(){


var get_live_games = $.ajax({
url:"/get_live_games",
type:"POST",
data:{}
});


get_live_games.done(function(data){

var live_games_data;


$.each(data,function(key,value){
live_games_data += '<div class="middle_live_games_item"><span class="middle_live_games_name">'+value['name']+'</span>('+'<span class="middle_live_games_count">'+value['users'].length+'</span>)</div>';
});
live_games_data = live_games_data.replace("undefined","");

$('.middle_games_show_container').html(live_games_data);



$('.middle_live_games_item').bind('click',function(){

var game_name = $(this).children('.middle_live_games_name').text();
game_name = game_name.trim();
console.log(game_name);

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

});


});


var get_invited_games = $.ajax({
url:"/get_user_invited_games",
type:"POST",
data:{}
});

get_invited_games.done(function(data12){



});


});