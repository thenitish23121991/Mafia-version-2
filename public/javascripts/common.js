

$(document).ready(function(){



$('.middle_games_show_person_name').bind('click',function(){

$(this).parent('.middle_games_show_person').css({
'display' : 'none'
});
});

$('.middle_home_start_button').bind('click',function(e){
e.preventDefault();
var nick = $('.middle_nick_input').val();

console.log(nick);
var add_nick = $.ajax({
url:"/add_nick",
type:"POST",
data:{nick:nick}
}); 

add_nick.done(function(data11){

console.log(data11);

if(data11 == 'nick already taken'){
console.logs('nick already taken');
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
});

});

$('.middle_start_new_game_button').bind('click',function(){

var name = $('.middle_start_new_game_input').val();
name = name.trim();

var is_game_present = $.ajax({
url:"/is_game_present",
type:"POST",
data:{game:name}
});

is_game_present.done(function(data191){

if(data191 == 'game not present'){

var add_game = $.ajax({
url:"/add_game",
type:"POST",
data:{name:name}
}); 

add_game.done(function(data){

var game1 = data.name;
if(game1 != ''){
setTimeout(function(){
location.href = '/screen2?game='+game1;
},1400);
}

});

}else{
$('.mafia_lightbox_modal').html('There is already a game with this name, please choose another name.<div><button class="hide_mafia_lightbox_button">Ok</button></div>');
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



});