$(document).ready(function(){
		$('.socialIcons').hover(function(){

			$(this).css({
				'border-radius': '50%',
				'transition': 'border-radius 0.3s ease-in-out'})
		}, function(){

			$(this).css({
<<<<<<< HEAD
				'border-radius': '20%',
				'transition': 'border-radius 0.3s ease-in-out'})
=======
				"border-radius": "20%",
				"transition": "border-radius 0.3s ease-in-out"})
>>>>>>> fab8b4896e70a766f338faa9480a28c1674700ca
		});

		$('.myProjects').hover(function(){

			$(this).css({
				'width': '250px',
				'margin': '0px',
				'box-shadow': '0px 0px 10px 1px black, 0px 0px 20px 15px white',
				'transition': 'width 0.3s, margin 0.3s box-shadow 0.3s'})
		}, function(){

			$(this).css({
				'width': '200px',
				'margin': '50px',
				'box-shadow': 'none',
				'transition': 'width 0.3s, margin 0.3s box-shadow 0.3s'})
		});
});