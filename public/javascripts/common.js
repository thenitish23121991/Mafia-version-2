

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

add_nick.done(function(data11){
setTimeout(function(){
console.log(data11);

if(data11 == 'nick already taken'){
$('.mafia_lightbox_modal').html('This nickname is taken. Please choose some other nickname.<div><button class="hide_mafia_lightbox_button">Ok</button></div>');
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
}else{
console.log(data11);
location.href = '/screen1';
}
},1600);
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

var game1 = data.name;
if(game1 != ''){
location.href = '/screen2?game='+game1;
}

});


});



});