

$(document).ready(function(){

$('.game_middle_footer_link').bind('click',function(){

var container = $(this).attr('data-container');
$('.'+container).addClass('visible');

});

$('.game_desc_container').bind('click',function(){
	
$(this).removeClass('visible');	
});


});