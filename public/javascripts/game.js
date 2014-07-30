

$(document).ready(function(){


var mafia_res_answer;
var mafia_answered = "false";
var has_healer_interval;
var has_detective_interval;
var is_first_vote_done;
var is_first_vote,is_final_vote_done,final_vote_done_interval;
var get_final_vote_results;

var game_announcement = $('.left_game_announcement');
var game = $('.left_game_title_container').text();
game = game.trim();

//get_game_messages();


var mafias_interval = setInterval(function(){
var mafias_answered = $.ajax({
url:"/has_mafias_answered",
type:"POST",
data:{game:game}
});

mafias_answered.done(function(data121){
console.log('mafias answered: '+data121);
if(data121 == 'mafias answered'){
console.log('mafias answered');
var get_mafia_answer = $.ajax({
url:"/get_mafia_answer",
type:"POST",
data:{game:game}
});

get_mafia_answer.done(function(data1211){
console.log('get mafia answer: '+data1211.answer);
//console.log('interval: '+mafia_res_answer);
ask_healer(data1211.answer);
clearInterval(mafias_interval);

var has_healer_interval = setInterval(function(){

var has_healer_answered = $.ajax({
url:"/has_healer_answered",
type:"POST",
data:{game:game}
});


has_healer_answered.done(function(data121){
console.log('healer answer: '+data121);
if(data121 == 'healer answered'){

clearInterval(has_healer_interval);
ask_detective();

has_detective_interval = setInterval(function(){
var has_detective = $.ajax({
url:"/has_detective_answered",
type:"POST",
data:{game:game}
});

has_detective.done(function(data1212){
if(data1212 == 'detective has answered'){
start_first_vote();
clearInterval(has_detective_interval);
is_first_vote_done = setInterval(function(){
console.log('is_first_vote_done');
is_first_vote = $.ajax({
url:"/is_first_vote_done",
type:"POST",
data:{game:game}
});

is_first_vote.done(function(data1212){

console.log(data1212);

if(data1212 == 'first vote done'){


clearInterval(is_first_vote_done);

var get_first_vote_results = $.ajax({
url:"/get_first_votes_result",
type:"POST",
data:{game:game}
});

get_first_vote_results.done(function(data141){
console.log(data141);
data141.forEach(function(element,index){
game_announcement.append(data141[index]+' is dead.');
});

});

start_explain_yourself_method();

var start_explain_yourself = setTimeout(function(){
start_final_vote();
var final_vote_done_interval = setInterval(function(){
is_final_vote_done = $.ajax({
url:"/is_final_vote_done",
type:"POST",
data:{game:game}
});

is_final_vote_done.done(function(data12111){
console.log(data12111);
if(data12111 == 'final vote done'){
console.log('final vote done');
clearInterval(final_vote_done_interval);

var get_final_vote_results = $.ajax({
url:"/get_final_votes_results",
type:"POST",
data:{game:game}
});

get_final_vote_results.done(function(data1912){
console.log(data1912);
data1912.forEach(function(element,index){
game_announcement.append(data1912[index]+' is dead.');
});

var has_game_ended = $.ajax({
url:"/has_game_ended",
type:"POST",
data:{game:game}
});


has_game_ended.done(function(data191){
console.log(data191);
if(data191 == 'game has ended'){
location.href = '/review?game='+game;
}else{
console.log(data191);
init_mafia();
setTimeout(function(){
location.href = '/game?game='+game;
},1200);

}

});

});
}
});

},2300);

},12000);
}

});

},2300);
}
});
},2300);

}
});
},2300);

});
}

});
},2300);


setInterval(function(){
//get_game_messages();
},1600);






function show_lightbox(){
console.log('done');
$('.game_lightbox').addClass('visible');
}

function hide_lightbox(){
$('.game_lightbox').removeClass('visible');
}

function get_game_messages(){

var get_game_messages = $.ajax({
url:"/get_game_messages",
type:"POST",
data:{game:game}
});

get_game_messages.done(function(data1211){

var messages_data;

$.each(data1211,function(key,value){
messages_data += '<div class="left_game_chat_message_item"><span class="left_game_chat_player_name">'+value['player']+' says:</span><span class="left_game_chat_message"> '+value['message']+'</span></div>';

});

messages_data = messages_data.replace("undefined","");

$('.left_game_chat_messages_container').html(messages_data);
var scroll_height = $('.left_game_chat_messages_container').scrollHeight();
console.log(scroll_height);
$('.left_game_chat_messages_container').scrollTop(scroll_height);
});

}

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


function ask_healer(result1){

var healer_res = result1;
var has_killed = "false";

setTimeout(function(){
game_announcement.append('<div class="message">Mafia close your eyes</div>');
game_announcement.append('<div class="message">Healer open your eyes</div>');
},600);

var game = $('.left_game_title_container').text();
game = game.trim();
var get_user_role = $.ajax({
url:"/get_current_user_role",
type:"POST",
data:{game_name:game}
});





get_user_role.done(function(docs123){
console.log(docs123);
if(docs123 == 'healer'){
console.log(healer_res);
var result1;

if(result1 != 'no result'){


var has_healer_killed = $.ajax({
url:"/has_healer_killed",
type:"POST",
data:{game:game}
});


has_healer_killed.done(function(data1212){

if(data1212 == 'healer has killed'){
has_killed = "true";
}

});

var has_healer_healed = $.ajax({
url:"/has_healer_healed",
type:"POST",
data:{game:game}
});

has_healer_healed.done(function(data11){
console.log(data11);
if(data11 == 'nobody healed'){
$('.game_lightbox').html('<div class="game_lightbox_body">'+healer_res+' is killed. Do you want to heal him?</div><div class="game_lightbox_buttons"><button name="ask_healer_yes" class="ask_healer_yes">Yes</button><button class="ask_healer_no" name="ask_healer_no">No</button></div>');


show_lightbox();

$('.ask_healer_yes').bind('click',function(){
var add_healer_heal = $.ajax({
url:"/add_healer_heal",
type:"POST",
data:{game:game,player:healer_res}
});

add_healer_heal.done(function(data121){
console.log('add healer heal done: '+data121);
if(data121 == 'healer has healed'){
hide_lightbox();
if(has_killed == 'false'){
$('.game_lightbox').html('<div class="game_lightbox_body">Do you want to kill anyone?</div><div class="game_lightbox_buttons"><button name="ask_healer_yes" class="kill_healer_yes">Yes</button><button class="kill_healer_no" name="ask_healer_no">No</button></div>');

show_lightbox();

$('.kill_healer_yes').bind('click',function(){
hide_lightbox();
$('.right_game_chat_player_name').addClass('ask_healer_active');


$('.right_game_chat_player_name.ask_healer_active').bind('click',function(){
var healer_answer_yes = $(this).text();
//var game = $('.left_game_title_container').text();
healer_answer_yes = healer_answer_yes.trim();
//game = game.trim();
//console.log(answer);

$('.game_lightbox').html('<div class="game_lightbox_body">Are you sure you want to kill '+healer_answer_yes+'</div><div class="game_lightbox_buttons"><button name="healer_answer_yes" class="healer_answer_yes">Yes</button><button name="healer_answer_no" class="healer_answer_no">No</button></div>');
show_lightbox();

$('.healer_answer_yes').bind('click',function(){
console.log(healer_answer_yes);
var add_healer_answer = $.ajax({
url:"/add_healer_answer",
type:"POST",
data:{game:game,player:healer_answer_yes}
});

add_healer_answer.done(function(data1211){

if(data1211 == 'healer answer added'){
hide_lightbox();
//ask_detective();
console.log('healer answer added');
}

});

});

$('.healer_answer_no').bind('click',function(){

});


});

});
$('.kill_healer_no').bind('click',function(){

});

show_lightbox();

}




}
//ask_detective();
});

add_healer_heal.fail(function(data1212){
console.log(data1212);
});

});

}
});


$('.ask_healer_no').bind('click',function(){
hide_lightbox();
});

$('.right_game_chat_player_name').addClass('ask_healer_active');


$('.right_game_chat_player_name.ask_healer_active').bind('click',function(){
var answer = $(this).text();
//var game = $('.left_game_title_container').text();
answer = answer.trim();
//game = game.trim();
console.log(answer);

});


}

}
else{

}
/*
var has_healer_killed = $.ajax({
url:"/has_healer_killed",
type:"POST",
data:{game:game}
});

has_healer_killed.done(function(data1211){

if(data1211 == 'nobody killed'){
$('.game_lightbox').html('<div class="game_lightbox_body">Do you want to kill anyone?</div><div class="game_lightbox_buttons"><button name="ask_healer_kill_yes" class="ask_healer_kill_yes">Yes</button><button name="ask_healer_kill_no" class="ask_healer_kill_no">No</button></div>');

$('.ask_healer_kill_yes').bind('click',function(){

var add_healer_kill = $.ajax({
url:"/add_healer_answer",
type:"POST",
data:{game:game}
});

add_healer_kill.done(function(data111){
console.log(data111);
});

});

$('.ask_healer_kill_no').bind('click',function(){

});

}

});
*/

});


}


function inform_city(){

var inform_city = $.ajax({
url:"/inform_city",
type:"POST",
data:{game:game}
});

inform_city.done(function(data){



});

}


function start_first_vote(){
init_votes();
game_announcement.append('Detective close your eyes.');
game_announcement.append('City open your eyes.');

var get_killed_players = $.ajax({
url:"/get_killed_players",
type:"POST",
data:{game:game}
});

get_killed_players.done(function(data121){
var killed_text;
if(data121.length == 0){
killed_text = 'No one is dead';
}else{
data121.forEach(function(element,index){
killed_text += data121[index]+' is dead.';
});
killed_text = killed_text.replace("replace","");
}
game_announcement.append(killed_text);
game_announcement.append('First Vote Called');

$('.right_game_chat_player_name').addClass('first_vote_active');

$('.right_game_chat_player_name.first_vote_active').bind('click',function(){
var vote_answer = $(this).text();
vote_answer = vote_answer.trim();
vote_answer = vote_answer.replace("\n","");

var has_user_first_voted = $.ajax({
url:"/has_user_first_voted",
type:"POST",
data:{game:game}
});

has_user_voted_first.done(function(data181){

if(data181 != 'yes'){

$('.game_lightbox').html('<div class="game_lightbox_body">Are you sure you want to vote '+vote_answer+'</div><div class="game_lightbox_buttons"><button name="first_vote_yes" class="first_vote_yes">Yes</button><button name="first_vote_no" class="first_vote_no">No</button></div>');
show_lightbox();

$('.first_vote_yes').bind('click',function(){


var vote_answer1 = $.ajax({
url:"/add_first_vote",
type:"POST",
data:{game:game,vote_answer:vote_answer}
});

vote_answer1.done(function(data344){
console.log('first vote added');
hide_lightbox();
});

});

$('.first_vote_no').bind('click',function(){
hide_lightbox();
});

}

});

dacoit_is_active();

});

});

suicide_bomber();
}

function suicide_bomber(){

}


function dacoit_is_active(){

var get_current_user_role = $.ajax({
url:"/get_current_user_role",
type:"POST",
data:{game_name:game}
});

get_current_user_role.done(function(data12111){

if(data12111 == 'dacoit'){


$('.game_lightbox').html('<div class="game_lightbox_body">Do you want to kill anyone?</div><div class="game_lightbox_buttons"><button class="dacoit_active_yes">Yes</button><button class="dacoit_active_no">No</button></div>');
$('.right_game_chat_player_name').addClass('ask_dacoit_active');
show_lightbox();

$('.right_game_chat_player_name.ask_dacoit_active').bind('click',function(){

var dacoit_answer = $(this).text();
dacoit_answer = dacoit_answer.trim();

$('.dacoit_active_yes').bind('click',function(){
hide_lightbox();
});


$('.dacoit_active_no').bind('click',function(){
hide_lightbox();
});

$('.dacoit_ask_kill_yes').bind('click',function(){

var dacoit_kill_person = $.ajax({
url:"/dacoit_kill_person",
type:"POST",
data:{game:game,answer:dacoit_answer}
});

dacoit_kill_person.done(function(data1211){
if(data1211 == 'person killed'){
hide_lightbox();
}
});

});

$('.dacoit_ask_kill_no').bind('click',function(){
hide_lightbox();
});

});

}

});

}


function ask_detective(){

setTimeout(function(){
game_announcement.append('<div class="message">Healer close your eyes</div>');
game_announcement.append('<div class="message">Detective open your eyes</div>');
},600);

var game = $('.left_game_title_container').text();
game = game.trim();
var get_user_role = $.ajax({
url:"/get_current_user_role",
type:"POST",
data:{game_name:game}
});


get_user_role.done(function(docs123){

if(docs123 == 'detective'){

$('.right_game_chat_player_name').addClass('ask_detective_active');
$('.game_lightbox').html('<div class="game_lightbox_body">Do you suspect anyone?</div><div class="game_lightbox_buttons"><button name="ask_detective_yes" class="ask_detective_one_yes">Yes</button><button name="ask_detective_no" class="ask_detective_one_no">No</button></div>');
show_lightbox(); 

$('.ask_detective_one_yes').bind('click',function(){
hide_lightbox();
});

$('.right_game_chat_player_name.ask_detective_active').bind('click',function(){
var detective_answer = $(this).text();
//var game = $('.left_game_title_container').text();
detective_answer = detective_answer.trim();
//game = game.trim();

$('.game_lightbox').html('<div class="game_lightbox_body">Are you sure you suspect '+detective_answer+'</div><div class="game_lightbox_buttons"><button name="ask_detective_yes" class="ask_detective_yes">Yes</button><button name="ask_detective_no" class="ask_detective_no">No</button></div>');
show_lightbox();

$('.ask_detective_yes').bind('click',function(){

var add_detective_answer = $.ajax({
url:"/add_detective_answer",
type:"POST",
data:{game:game,answer:detective_answer}
});

add_detective_answer.done(function(data121){
if(data121 == 'answer added'){
console.log('answer added');

var is_suspect_correct = $.ajax({
url:"/is_suspect_correct",
type:"POST",
data:{game:game,suspect:detective_answer}
});

is_suspect_correct.done(function(data1211){
if(data1211 == 'correct'){
$('.game_lightbox').html('<div class="game_lightbox_body">Your guess was correct. '+detective_answer+' is a mafia.</div><div class="game_lightbox_buttons"><button name="suspect_ok" class="suspect_ok">Ok</button></div>');
show_lightbox();
}else{
$('.game_lightbox').html('<div class="game_lightbox_body">Your guess was correct. '+detective_answer+' is a mafia.</div><div class="game_lightbox_buttons"><button name="suspect_ok" class="suspect_ok">Ok</button></div>');
show_lightbox();
}
$('.suspect_ok').bind('click',function(){
hide_lightbox();
});
});

hide_lightbox();
}
});

});


$('.ask_detective_no').bind('click',function(){
hide_lightbox();
});

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

var has_mafia_voted = $.ajax({
url:"/has_mafia_voted",
type:"POST",
data:{game:game}
});

has_mafia_voted.done(function(data121){


$('.right_game_chat_player_name').addClass('ask_mafia_active');

$('.right_game_chat_player_name.ask_mafia_active').bind('click',function(){
var answer = $(this).text();
answer = answer.trim();
if(data121 != 'yes'){
$('.game_lightbox').html('<div class="game_lightbox_body">Are you sure you want to kill '+answer+'? </div><div class="game_lightbox_buttons"><button name="ask_mafia_yes" class="ask_mafia_yes">Yes</button><button name="ask_mafia_no" class="ask_mafia_no">No</button></div>');
show_lightbox();

console.log(data121);


$('button.ask_mafia_yes').bind('click',function(){
console.log('ask mafia yes');
var game = $('.left_game_title_container').text();
game = game.trim();
console.log(answer);


var add_mafia_answer = $.ajax({
url:"/add_mafia_answer",
type:"POST",
data:{answer:answer,game:game}
});

add_mafia_answer.done(function(data11111){
console.log(data11111);
if(typeof data11111 != "undefined"){
console.log('not undefined');
mafia_res_answer = data11111.answer;
console.log(mafia_res_answer);
mafia_answered = "true";
}

});

hide_lightbox();
});

$('button.ask_mafia_no').bind('click',function(){
console.log('ask mafia no');
hide_lightbox();
});

}

});


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


function init_mafia(){

var init_mafia1 = $.ajax({
url:"/init_mafia",
type:"POST",
data:{game:game}
});

init_mafia1.done(function(data101){
console.log(data101);
if(data101 == 'mafias init'){

}
});

}

function init_votes(){

var init_votes1 = $.ajax({
url:"/init_votes",
type:"POST",
data:{game:game}
});

init_votes1.done(function(data101){
console.log(data101);
if(data101 == 'mafias init'){

}
});

}


function ask_dacoit(){

var get_user_role = $.ajax({
url:"/get_current_user_role",
type:"POST",
data:{game_name:game}
});


get_user_role.done(function(data141){

if(data141 == 'dacoit'){

$('.game_lightbox').html('<div class="game_lightbox_body">Do you want to kill someone?</div><div class="game_lightbox_buttons"><button class="dacoit_kill_yes">Yes</button><button class="dacoit_kill_no">No</button></div>');
show_lightbox();

$('.dacoit_kill_yes').bind('click',function(){

$('.right_game_chat_player_name').addClass('ask_dacoit_active');

$('.right_game_chat_player_name.ask_dacoit_active').bind('click',function(){

var killed = $(this).text();
killed = killed.replace("undefined","");

var dacoit_kill_yes = $.ajax({
url:"/dacoit_killed",
type:"POST",
data:{game:game,killed:killed}
});

dacoit_kill_yes.done(function(data191){
game_announcement.append(data191);
});

});
});

$('.dacoit_kill_no').bind('click',function(){
hide_lightbox();
});

}

});

}



function start_game_cycle(){

var get_user_role = $.ajax({
url:"/get_current_user_role",
type:"POST",
data:{game_name:game}
});

get_user_role.done(function(data1991){
console.log(data1991);
if(data1991 == 'mafia' || data1991 == 'healer' || data1991 == 'citizen' || data1991 == 'dacoit' || data1991 == 'detective'){

var start_game_cycle_1 = $.ajax({
url:"/start_game_cycle",
type:"POST",
data:{game:game}
});

start_game_cycle_1.done(function(data101){
console.log(data101);
if(data101 == 'game has been reset'){
console.log('game has been reset');
}else{
console.log('refresh the window to restart the game');
}

});
}
});

}



function start_final_vote(){
game_announcement.append('Final Vote called');

$('.right_game_chat_player_name').removeClass('first_vote_active');
$('.right_game_chat_player_name').removeClass('ask_detective_active');
$('.right_game_chat_player_name').addClass('final_vote_active');

var get_user_role = $.ajax({
url:"/get_current_user_role",
type:"POST",
data:{game_name:game}
});

get_user_role.done(function(data191){
console.log(data191);
if(data191 == 'mafia' || data191 == 'healer' || data191 == 'detective' || data191 == 'dacoit' || data191 == 'citizen'){
$('.right_game_chat_player_name.final_vote_active').bind('click',function(){
console.log('final answer add called');

var has_user_final_voted = $.ajax({
url:"/has_user_final_voted",
type:"POST",
data:{game:game}
});

has_user_final_voted.done(function(data191){

if(data191 != 'yes'){

var final_answer = $(this).text();
final_answer = final_answer.trim();
final_answer = final_answer.replace("\n","");
final_answer = final_answer.replace("undefined","");

var final_answer_add = $.ajax({
url:"/final_answer_add",
type:"POST",
data:{game:game,answer:final_answer}
});

final_answer_add.done(function(data161){
hide_lightbox();
if(data161 == 'final vote done'){

}
});

}

});
});
}
});
}


$('.left_game_chat_textarea_input').bind('keypress',function(e){
if(e.keyCode == 13){
var message = $('.left_game_chat_textarea_input').val();
message = message.trim();

if(message != ''){

var add_game_message = $.ajax({
url:"/add_game_message",
type:"POST",
data:{game:game,message:message}
});

add_game_message.done(function(data12){

console.log(data12);

$('.left_game_chat_messages_container').append('<div class="left_game_chat_message_item"><span class="left_game_chat_player_name">'+data12.player+' says:</span><span class="left_game_chat_message"> '+data12.message+'</span></div>');
var scroll_height = $('.left_game_chat_messages_container').scrollHeight();
$('.left_game_chat_messages_container').scrollTop(scroll_height);
$('.left_game_chat_textarea_input').val('');

});
}
}
});



$('.left_game_chat_textarea_input_button').bind('click',function(){
var message = $('.left_game_chat_textarea_input').val();
message = message.trim();

if(message != ''){

var add_game_message = $.ajax({
url:"/add_game_message",
type:"POST",
data:{game:game,message:message}
});

add_game_message.done(function(data12){

console.log(data12);

$('.left_game_chat_messages_container').append('<div class="left_game_chat_message_item"><span class="left_game_chat_player_name">'+data12.player+' says:</span><span class="left_game_chat_message"> '+data12.message+'</span></div>');
$('.left_game_chat_textarea_input').val('');

});
}

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



function start_explain_yourself_method(){
game_announcement.append('Explain yourself');

}




});