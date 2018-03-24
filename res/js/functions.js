$(document).ready(function(){
		$(".socialIcons").hover(function(){

			$(this).css({
				"border-radius": "50%",
				"transition": "border-radius 0.3s ease-in-out"})
		}, function(){

			$(this).css({
				"border-radius": "0%",
				"transition": "border-radius 0.3s ease-in-out"})
		});
});
