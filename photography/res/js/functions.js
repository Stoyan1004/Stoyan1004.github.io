$(document).ready(function(){
	$('.myGallery').hover(function(){

			$(this).css({
				'width': '300px',
				'height': '300px',
				'margin': '0px',
				'box-shadow': '0px 0px 10px 1px black, 0px 0px 20px 15px white',
				'transition': 'width 0.2s, height 0.2s, margin 0.2s, box-shadow 0.2s'})
		}, function(){

			$(this).css({
				'width': '250px',
				'height': '250px',
				'margin': '30px',
				'box-shadow': '0px 0px 6px black',
				'transition': 'width 0.2s, height 0.2s, margin 0.2s, box-shadow 0.2s'})
		});
});
