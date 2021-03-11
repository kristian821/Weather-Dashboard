var apiKey = '7b7485dc2f6118460368d46ce0344303'
var dashboardEl = document.querySelector("#dashboard");
var searchFormEl = document.querySelector("#city-search");
var cityNameInputEl = document.querySelector("#city-name");
var recentsEl = document.querySelector("#recents");
var cities = {};

var part = "minutely,hourly,alerts";
var cityNameResponse = "";
var currentDate = "";



var loadCities = function() {
    cities = JSON.parse(localStorage.getItem("cities"));

    if (!cities) {
        cities = {
            name : []
        };
    }

    console.log(cities);
    // cities.forEach(function(city) {
    //     recentCitiesCard(city.name);
    // });
}

var saveCities = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
}


var getWeather = function(cityName) {
    // use the url to grab lat and lon from location searched.
    var locApiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
    // use this api to grab current weather from location searched.
    
    fetch(locApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // find lat and lon and create variables to use in next api call
               var lat = data.city.coord.lat;
               var lon = data.city.coord.lon;

               cityNameResponse = data.city.name;
               currentDate = data.list[0].dt_txt;
               var wetApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=${part}&appid=${apiKey}`;
               fetch(wetApiUrl).then(function(response) {
                   if (response.ok) {
                    response.json().then(function(data) {
                        createWeatherCard(data);
                    }) 
                   }
               })
            });
        } else {
            alert("The request failed!");
        }
    }).catch(function(error) {
        alert("Unable to find weather");
    });

};

var createWeatherCard = function(weather) {
    var cityCard = document.createElement("div")
    cityCard.className = "card";
    var cardBody = document.createElement("div")
    cardBody.className = "card-body";
    var titleEl = document.createElement("div")
    titleEl.classList = "card-title fs-2";
    var weatherDetails = document.createElement("div");
    weatherDetails.className = "card-text";
    var temperature = document.createElement("p");
    var feelsLike = document.createElement("p");
    var humidity = document.createElement("p");
    var uvIndex = document.createElement("p");
    temperature.textContent = `Temperature: ${Math.floor(weather.current.temp)}`;
    feelsLike.textContent = `Feels like: ${Math.floor(weather.current.feels_like)}`;
    humidity.textContent = `Humidity: ${weather.current.humidity}`;
    uvIndex.textContent = `UV Index: ${weather.current.uvi}`;
    
    titleEl.textContent = `${cityNameResponse} (${currentDate})`;
    
    weatherDetails.appendChild(temperature);
    weatherDetails.appendChild(feelsLike);
    weatherDetails.appendChild(humidity);
    weatherDetails.appendChild(uvIndex);
    cardBody.appendChild(titleEl);
    cardBody.appendChild(weatherDetails);
    cityCard.appendChild(cardBody);
    dashboardEl.appendChild(cityCard);

    
    // cities[index].name = cityName;

    // saveCities();
};

var recentCitiesCard = function(cityName) {
    var titleEl = document.createElement("li");
    titleEl.className = "list-item";

    titleEl.textContent = cityName;

    
    recentsEl.appendChild(titleEl);

};

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityNameInputEl.value.trim();

    if (cityName) {
        getWeather(cityName);
        cityNameInputEl.value = "";
        cities.name = cityName;
        saveCities();
    } else {
        alert("Please enter a city name");
    }
}

// loadCities();
searchFormEl.addEventListener("submit", formSubmitHandler);