$(document).ready(function()
{	
	//създавам ефекти върху иконите за социалните мрежи
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

	//създавам ефект върху 
	$('.myProjects').hover(function()
	{
		$(this).css(
		{
			'width': '250px',
			'margin': '0px',
			'box-shadow': '0px 0px 10px 1px black, 0px 0px 20px 15px white',
			'transition': 'width 0.3s, margin 0.3s, box-shadow 0.3s'
		})
	},
	function()
	{
		$(this).css(
		{
			'width': '200px',
			'margin': '50px auto',
			'box-shadow': 'none',
			'transition': 'width 0.3s, margin 0.3s, box-shadow 0.3s'
		})
	});

	//извиквам функцията за времето(по подразбиране за гр. София)
	weatherTempLocation();

	//при кликване на бутона съответно показва времето в текущото местоположение
	//или превключва в режим по подразбиране за гр. София
	$('#showWeatherHere').click(function()
	{

		if ($(this).data('weather') == '1')
		{
			getLocation();
			$(this).data('weather', 0);
			$(this).text('Show weather in Sofia');
		}
		else
		{
			weatherTempLocation();
			$(this).data('weather', 1);
			$(this).text('Show weather here');
		}
	});

});

//функция за взземане на текущата локация
function getLocation()
{
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
	weatherTempLocation(lat, lon);
}


function weatherTempLocation (latitude, longitude)
{
	//проверявам дали е са подадени ширина и дължина за намиране на локация, ако не са по подразбиране задаваме стойности за гр. София
	var lat;
	var lon;

	if (latitude != '' && longitude != '' 
		&& latitude != null && longitude != null 
		&& latitude != undefined && longitude != undefined)
	{
		lat = latitude;
		lon = longitude;
	}
	else
	{
		lat = '42.697';
		lon = '23.324';
	}
	//JSON response за времето в момента
	$.ajax({
		method: 'get',
		url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=f60853ec104931e7f0b2c764befb03f7',
		dataType: 'json'
	}).done(function(response)
	{
		
		currentWeatherFunction(response);

	}).fail(function()
	{
		console.log('Error occured!');

	}).always(function()
	{
		console.log('Completed!');
	});

	//JSON response за времето в следващите 3 дни
	$.ajax({
		method: 'get',
		url: 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=4&units=metric&appid=f60853ec104931e7f0b2c764befb03f7',
		dataType: 'json'
	}).done(function(response)
	{
		dailyForecastFunction(response);

	}).fail(function()
	{
		console.log('Error occured!');

	}).always(function()
	{
		console.log('Completed!');
	});
}


//извличам данните за настоящото време
function currentWeatherFunction(tempData)
{	
	//запазвам данните от responce в променливи
	var weatherTemp = tempData.main.temp;
	var weatherIcon = 'https://openweathermap.org/img/w/' + tempData.weather[0].icon + '.png';
	var weatherLocation = tempData.name;
	
	//създавам променлива в коята съхранявам таблицата с данните за времето в момента
	var weatherContainerData = '<table><tr><td>';

	weatherContainerData += '<img src="' + weatherIcon + '" alt="Weather icon" class="weatherIconClass" />';
	weatherContainerData += '</td>';
	weatherContainerData += '<td>';
	weatherContainerData += '<p>' + weatherTemp + '&deg;</p>';
	weatherContainerData += '<p class="min_max_temp"></p>';
	weatherContainerData += '</td></tr>';
	weatherContainerData += '<tr><td colspan="2">';
	weatherContainerData += '<p>' + weatherLocation + '</p>';
	weatherContainerData += '</td></tr>';
	weatherContainerData+= '</td></tr></table>';

	//изчертавам таблицата в определения за това div
	$('#weather').html(weatherContainerData);

	//console.log(weatherContainerData);


}

//извличам данните за следващите дни и минималнта и максимална темература на настоящия ден
function dailyForecastFunction(tempData)
{
	var weatherMinTempToday = tempData.list[0].temp.min.toFixed(0);
	var weatherMaxTempToday = tempData.list[0].temp.max.toFixed(0);
	
	//създавам масив в който ще съхранявам данните за следващите 3 дни
	var weatherThreeDays = [];

	for (var i = 1; i <= 3; i++)
	{
		//създавам масив за да съхранявам необходимата информация за деня и след това да я добавя към общия масив
		var tempArray = [];

		tempArray.push('https://openweathermap.org/img/w/' + tempData.list[i].weather[0].icon + '.png');
		tempArray.push(tempData.list[i].temp.min.toFixed(0));
		tempArray.push(tempData.list[i].temp.max.toFixed(0));

		weatherThreeDays.push(tempArray);
	}

	$('.min_max_temp').html(weatherMinTempToday + '&deg;/' + weatherMaxTempToday + '&deg;');

	//създавам празен масив в който запазвам таблиците с данни за следващите 3 дни
	var weatherThreeDaysContainerData = '';

	$.each(weatherThreeDays, function(index)
	{
		weatherThreeDaysContainerData += '<table>';
		weatherThreeDaysContainerData += '<tr><td><img src="' + weatherThreeDays[index][0] + '" alt="Weather icon" class="weatherIconClass"/></td></tr>';
		weatherThreeDaysContainerData +='<tr><td class="weatherText">' + weatherThreeDays[index][1] + '&deg;/' + weatherThreeDays[index][2] + '&deg;</td></tr>';
		weatherThreeDaysContainerData += '</table>';
	});	

	$('#weatherThreeDays').html(weatherThreeDaysContainerData);
}