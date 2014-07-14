

$(document).ready(function(){

$('.middle_games_show_person_name').bind('click',function(){

$(this).parent('.middle_games_show_person').css({
'display' : 'none'
});
});

$('.middle_home_start_button').bind('click',function(){
var nick = $('.middle_nick_input').val();
var add_nick = $.ajax({
url:"/add_nick",
type:"POST",
data:{nick:nick}
}); 

add_nick.done(function(data){

location.href = '/screen1';

});

});

$('.middle_start_new_game_button').bind('click',function(){

var name = $('.middle_start_new_game_input').val();
var add_game = $.ajax({
url:"/add_game",
type:"POST",
data:{name:name}
}); 

add_game.done(function(data){

console.log(data);
if(data == 'game added'){
location.href = '/screen2';
}

});


});



});