


$(function(){

var game = $('.game_hidden_container').text();
game = game.trim();

var get_game_result = $.ajax({
url:"/get_game_results",
type:"POST",
data:{game:game}
});

get_game_result.done(function(data121){
console.log(data121);
$('.game_top_container').append('<div class="game_top_results_container">'+data121+'</div>');
});


$('.game_bottom_start_again_button').bind('click',function(){
location.href = '/';
});




});