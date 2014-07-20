

$(document).ready(function(){

$('.left_game_quit_game_button').bind('click',function(){

location.href = '/review';
});

//get_game();


start_game();

function start_game(){
ask_mafia();
}


function kill_person(game,player){

var kill_person = $.ajax({
url:"/kill_person",
type:"POST",
data:{game:game}
});

kill_person.done(function(data){



});

}


function ask_healer(){

var game = $('.left_game_title_container').text();
game = game.trim();
var get_user_role = $.ajax({
url:"/get_current_user_role",
type:"POST",
data:{game_name:game}
});


get_user_role.done(function(docs123){

if(data12 == 'healer'){
var game_announcement = $('.left_game_announcement');
setTimeout(function(){
game_announcement.append('<div class="message">Mafia close your eyes</div>');
game_announcement.append('<div class="message">Healer open your eyes</div>');
},600);
$('.right_game_chat_player_name').addClass('ask_mafia_active');

$('.right_game_chat_player_name.ask_mafia_active').bind('click',function(){
var answer = $(this).text();
//var game = $('.left_game_title_container').text();
answer = answer.trim();
//game = game.trim();
console.log(answer);
add_mafia_answer(answer,game);
});
}

});

}


function ask_mafia(){ 

var game = $('.left_game_title_container').text();
game = game.trim();
var get_user_role = $.ajax({
url:"/get_current_user_role",
type:"POST",
data:{game_name:game}
});

get_user_role.done(function(data12){
console.log(data12);
if(data12 == 'mafia'){
var game_announcement = $('.left_game_announcement');
setTimeout(function(){
game_announcement.append('<div class="message">Whom do you want to kill?</div>');
},600);
$('.right_game_chat_player_name').addClass('ask_mafia_active');

$('.right_game_chat_player_name.ask_mafia_active').bind('click',function(){
var answer = $(this).text();
//var game = $('.left_game_title_container').text();
answer = answer.trim();
//game = game.trim();
console.log(answer);
add_mafia_answer(answer,game);
});
}
});
}


function add_mafia_answer(answer,game){

var add_mafia_answer = $.ajax({
url:"/add_mafia_answer",
type:"POST",
data:{answer:answer,game:game}
});

add_mafia_answer.done(function(data){

if(data == 'answer added'){

}

});

}


$('.left_game_chat_textarea_input').bind('keypress',function(e){
if(e.keyCode == 13){
var message = $('.left_game_chat_textarea_input').val();
//console.log(message);
$('.left_game_chat_messages_container').append('<div class="left_game_chat_message_item"><span class="left_game_chat_player_name">Ashish said:</span><span class="left_game_chat_message"> '+message+'</span></div>');
$('.left_game_chat_textarea_input').val('');
}
});



$('.left_game_chat_textarea_input_button').bind('click',function(){
var message = $('.left_game_chat_textarea_input').val();
console.log(message);
$('.left_game_chat_messages_container').append('<div class="left_game_chat_message_item"><span class="left_game_chat_player_name">Ashish said:</span><span class="left_game_chat_message"> '+message+'</span></div>');
$('.left_game_chat_textarea_input').val('');
});


var mafia_answers = $.ajax({
url:"/get_mafia_answers",
type:"POST",
data:{}
});


mafia_answers.done(function(data){

if(data == 'mafia'){
ask_mafia();
}else{

}

});

});