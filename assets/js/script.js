var cityInputEl = document.querySelector("#search-form")
var lon = null
var lat = null
var savedCities = null
var currentDate = moment().format('l')
console.log(currentDate)
// function date() {
// document.getElementById('date').innerText()    
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
                    // displayRepos(data, city);
                    console.log(city,lon,lat)
                    saveCity=[city,lon.lat]
                    localStorage.setItem(JSON.stringify(savedCity))
                    var apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=08808983bbda15ccf4a3ae7500bb715b';
                    fetch(apiWeatherUrl)
                        .then(function (response) {
                            console.log(response);
                            response.json().then(function (data) {
                                console.log(data);
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