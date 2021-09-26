var cityInputEl = document.querySelector("#search-form")

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
    // var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=e479c4c59730296618273b6939c40da3';
   var apiUrl ='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=e479c4c59730296618273b6939c40da3'
    // make a get request to url
    fetch(apiUrl)
      .then(function (response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            console.log(response.data.coords[0].lat)
            // displayRepos(data, city);
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