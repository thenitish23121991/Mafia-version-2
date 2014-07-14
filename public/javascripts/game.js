

$(document).ready(function(){

$('.left_game_quit_game_button').bind('click',function(){

location.href = '/review';
});


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

});