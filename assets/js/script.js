var cityInputEl = document.querySelector("#search-form")
var lon = null
var lat = null
var savedCities = null
var currentDate = moment().format('l')
var day1Temp = null
var day2Temp = null
var day3Temp = null
var day4Temp = null
var day5Temp = null
var day1Wind = null
var day2Wind = null
var day3Wind = null
var day4Wind = null
var day5Wind = null
var day1Humidity = null
var day2Humidity = null
var day3Humidity = null
var day4Humidity = null
var day5Humidity = null
var day1Weather = null
var day2Weather = null
var day3Weather = null
var day4Weather = null
var day5Weather = null
var currentTemp = null
var currentHumidity = null
var currentWind = null
var currentWeather = null
var currentUVI = null
var dateEl=  document.getElementById('date');
var fiveDayEl =document.getElementById('five-day-row')
dateEl.textContent=currentDate
// var day1date =currentDate.clone().add(1, 'day')
console.log(day1date)
var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var cityname = document.getElementById("city-input").value;
    document.getElementById('city').textContent=cityname;
    console.log(cityname)
    if (cityname) {
        getCityWeather(cityname);
        cityInputEl.value = "";
    } else {
        alert("Please enter a City");
    }
};

var getCityWeather = function (city) {
    // format the open weather api url

    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=08808983bbda15ccf4a3ae7500bb715b'
    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    lat = data.coord.lat
                    lon = data.coord.lon
                    var currentHumidity = data.main.humidity
                    console.log(currentHumidity);
                    // displayRepos(data, city);
                    console.log(city, lon, lat)
                    // saveCity = [city, lon.lat]
                    // localStorage.setItem(JSON.stringify(savedCity))
                    var apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,alerts,minuetly&units=imperial&appid=08808983bbda15ccf4a3ae7500bb715b';
                    fetch(apiWeatherUrl)
                        .then(function (response) {
                            console.log(response);
                            response.json().then(function (data) {
                                console.log(data);
                                 currentTemp = data.current.temp;
                                 currentWind = data.current.wind_speed
                                 currentWeather = data.current.weather[0].icon
                                 currentUVI = data.current.uvi
                                 currentHumidity = data.current.humidity
                                console.log(currentWeather);
                                console.log(currentUVI)
                                 day1Temp = data.daily[0].temp.max
                                 day2Temp = data.daily[1].temp.max
                                 day3Temp = data.daily[2].temp.max
                                 day4Temp = data.daily[3].temp.max
                                 day5Temp = data.daily[4].temp.max
                                 day1Wind = data.daily[0].wind_speed
                                 day2Wind = data.daily[1].wind_speed
                                 day3Wind = data.daily[2].wind_speed
                                 day4Wind = data.daily[3].wind_speed
                                 day5Wind = data.daily[4].wind_speed
                                 day1Humidity = data.daily[0].humidity
                                 day2Humidity = data.daily[1].humidity
                                 day3Humidity = data.daily[2].humidity
                                 day4Humidity = data.daily[3].humidity
                                 day5Humidity = data.daily[4].humidity
                                 day1Weather = data.daily[0].weather[0].icon
                                 day2Weather = data.daily[1].weather[0].icon
                                 day3Weather = data.daily[2].weather[0].icon
                                 day4Weather = data.daily[3].weather[0].icon
                                 day5Weather = data.daily[4].weather[0].icon
                                setWeather(currentHumidity);
                            })
                        });
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Open weather');
        });

};
var setWeather = function (humidity) {
    fiveDayEl.setAttribute('display', 'flex');

    document.getElementById('current-temp').textContent=currentTemp;
    document.getElementById('current-wind').textContent=currentWind;
    document.getElementById('current-humidity').textContent=humidity;
    document.getElementById('current-uv').textContent=currentUVI;
    document.getElementById('current-weather').textContent=currentWeather

    document.getElementById('day-1-weather').textContent=day1Weather
    document.getElementById('day-1-temp').textContent=day1Temp
    document.getElementById('day-1-wind').textContent=day1Wind
    document.getElementById('day-1-humidity').textContent=day1Humidity

    document.getElementById('day-2-weather').textContent=day2Weather
    document.getElementById('day-2-temp').textContent=day2Temp
    document.getElementById('day-2-wind').textContent=day2Wind
    document.getElementById('day-2-humidity').textContent=day2Humidity

    document.getElementById('day-3-weather').textContent=day3Weather
    document.getElementById('day-3-temp').textContent=day3Temp
    document.getElementById('day-3-wind').textContent=day3Wind
    document.getElementById('day-3-humidity').textContent=day3Humidity

    document.getElementById('day-4-weather').textContent=day4Weather
    document.getElementById('day-4-temp').textContent=day4Temp
    document.getElementById('day-4-wind').textContent=day4Wind
    document.getElementById('day-4-humidity').textContent=day4Humidity

    document.getElementById('day-5-weather').textContent=day5Weather
    document.getElementById('day-5-temp').textContent=day5Temp
    document.getElementById('day-5-wind').textContent=day5Wind
    document.getElementById('day-5-humidity').textContent=day5Humidity

}

cityInputEl.addEventListener("submit", formSubmitHandler);