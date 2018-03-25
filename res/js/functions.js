$(document).ready(function()
{
	$('.socialIcons').hover(function()
	{

		$(this).css(
		{
			'border-radius': '50%',
			'transition': 'border-radius 0.3s ease-in-out'
		})
	},
	function()
	{

		$(this).css(
		{
			'border-radius': '20%',
			'transition': 'border-radius 0.3s ease-in-out'
		})
	});

	$('.myProjects').hover(function()
	{

		$(this).css(
		{
			'width': '250px',
			'margin': '0px',
			'box-shadow': '0px 0px 10px 1px black, 0px 0px 20px 15px white',
			'transition': 'width 0.3s, margin 0.3s box-shadow 0.3s'
		})
	},
	function()
	{

		$(this).css(
		{
			'width': '200px',
			'margin': '50px auto',
			'box-shadow': 'none',
			'transition': 'width 0.3s, margin 0.3s box-shadow 0.3s'
		})
	});

	getLocation();
	//showWeather();

});

function getLocation() {
	if (navigator.geolocation) 
	{
		navigator.geolocation.getCurrentPosition(showPosition);
	} 
	else 
	{ 
		console.log('Geolocation is not supported by this browser.');
	}
}

function showPosition(position)
{
	var lat = position.coords.latitude.toFixed(3); 
	var lon = position.coords.longitude.toFixed(3);
	//console.log(lat + '\n' + lon);
	getCurrentTemp(lat, lon);
}

function getCurrentTemp (lat, lon)
{
	var context = this;
	var request = $.ajax({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=f60853ec104931e7f0b2c764befb03f7",
		dataType: "json"
	}).done(function(response)
	{
		weatherFunction(response);
	}).fail(function()
	{
		console.log('Error occured!');
	}).always(function()
	{
		console.log('Completed!');
	});
}

function weatherFunction(tempData)
{
	var weatherTemp = tempData.main.temp;
	var weatherIcon = 'http://openweathermap.org/img/w/' + tempData.weather[0].icon + '.png';
	var weatherDescription = tempData.weather[0].main;
	var weatherMinTemp = tempData.main.temp_min;
	var weatherMaxTemp = tempData.main.temp_max;
	var weatherHumidity = tempData.main.humidity;
	var weatherContainer = $('.pageAbout div:nth-of-type(3)');
	weatherContainer.css({
		'margin-left': '50px'
	});
	var weatherContainerData = '<table><tr><td>';
	weatherContainerData += '<img src="' + weatherIcon + '" alt="Weather icon" class="weatherIconClass" />';
	weatherContainerData += '</td>';
	weatherContainerData += '<td>';
	weatherContainerData += '<p class="weatherText">' + weatherTemp + '&deg;</p>';
	weatherContainerData += '<p>' + weatherMinTemp + '&deg;/&nbsp; ' + weatherMaxTemp +'&deg;</p>';
	weatherContainerData += '</td></tr>';
	weatherContainerData += '<tr><td colspan="2">';
	weatherContainerData += '<p class="weatherText">' + weatherDescription + '</p>';
	weatherContainerData += '</td></tr></table>';
	weatherContainer.html(weatherContainerData);
}

/*
function showWeather(){
	var weatherContainer = $('.pageAbout div:nth-of-type(3)');
	weatherContainer.css({
		'width': '300px',
		'height': '100px',
		'margin-left': '50px'
	});
	var weatherContainerData = '<table><tr><td>';
	weatherContainerData += '<img src="' + weatherIcon + '" alt="Weather icon" class="weatherIconClass" />';
	weatherContainerData += '</td>';
	weatherContainerData += '<td>';
	weatherContainerData += '<p><span class="weatherText">' + weatherTemp + '&deg;</span></p>';
	weatherContainerData += '<p>' + weatherMinTemp + '&deg;/' + weatherMaxTemp +'&deg;</p>';
	weatherContainerData += '</td></tr>';
	weatherContainerData += '<tr><td colspan="2">';
	weatherContainerData += '<p><span class="weatherText">' + weatherDescription + '</span></p>';
	weatherContainerData += '</td></tr></table>';
	weatherContainer.html(weatherContainerData);
}
*/
