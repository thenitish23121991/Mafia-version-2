
$(document).ready(function(){

var get_live_games = $.ajax({
url:"/get_live_games",
type:"POST",
data:{}
});


get_live_games.done(function(data){

var live_games_data;


$.each(data,function(key,value){
live_games_data += '<a href="/screen2?game='+value['name']+'"><div class="middle_live_games_item">'+value['name']+'('+'<span class="middle_live_games_count">'+value['users'].length+'</span>)</div></a>';
});
live_games_data = live_games_data.replace("undefined","");

$('.middle_games_show_container').html(live_games_data);

});

});