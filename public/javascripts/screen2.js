

$(document).ready(function(){

$('.middle_start_new_game_button').bind('click',function(){

location.href = '/game';
});


var game = $('.top_game_title').val();

var get_game_players = $.ajax({
url:"/get_game_players",
type:"POST",
data:{game:game}
});


get_game_players.done(function(data){

var game_players_data;

$.each(data,function(key,value){
game_players_data += '<div class="middle_games_show_person_name">'+value['name']+'</div>';
});

game_players_data = game_players_data.replace("undefined","");
$('.middle_games_show_person').html(game_players_data);

});


});