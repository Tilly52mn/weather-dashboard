var cityInputEl = document.querySelector("#search-form")
var lon = null
var lat = null
var savedCities = null
var currentDate = moment().format('l')
console.log(currentDate)
// function date() {
//   var dateEl=  document.getElementById('date');
//   dateEl.textContent("currentDate")
// }
// date()
var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var cityname = document.getElementById("city-input").value;
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
                                var currentTemp = data.current.temp;
                                var currentWind = data.current.wind_speed
                                var currentWeather = data.current.weather[0].description
                                console.log(currentWeather);
                                console.log(currentTemp)
                                var day1Temp = data.daily[0].temp.max
                                var day2Temp = data.daily[1].temp.max
                                var day3Temp = data.daily[2].temp.max
                                var day4Temp = data.daily[3].temp.max
                                var day5Temp = data.daily[4].temp.max
                                var day1Wind = data.daily[0].wind_speed
                                var day2Wind = data.daily[1].wind_speed
                                var day3Wind = data.daily[2].wind_speed
                                var day4Wind = data.daily[3].wind_speed
                                var day5Wind = data.daily[4].wind_speed
                                var day1Humidity = data.daily[0].humidity
                                var day2Humidity = data.daily[1].humidity
                                var day3Humidity = data.daily[2].humidity
                                var day4Humidity = data.daily[3].humidity
                                var day5Humidity = data.daily[4].humidity
                                var day1Weather = data.daily[0].weather[0].description
                                var day2Weather = data.daily[1].weather[0].description
                                var day3Weather = data.daily[2].weather[0].description
                                var day4Weather = data.daily[3].weather[0].description
                                var day5Weather = data.daily[4].weather[0].description
                                console.log(day1Weather)
                                console.log(day2Weather)
                                console.log(day3Weather)
                                console.log(day4Weather)
                                console.log(day5Weather)
                                
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


cityInputEl.addEventListener("submit", formSubmitHandler);