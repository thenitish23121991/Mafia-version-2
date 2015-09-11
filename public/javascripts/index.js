

$(document).ready(function(){

$('.game_middle_footer_link:nth-child(2)').bind('click',function(){

$('.game_about_container').addClass('visible');

});

$('.game_desc_container').bind('click',function(){
	
$(this).removeClass('visible');	
});


});