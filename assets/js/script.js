var apiKey = '7b7485dc2f6118460368d46ce0344303'
var dashboardEl = document.querySelector("#dashboard");
var searchFormEl = document.querySelector("#city-search");
var cityNameInputEl = document.querySelector("#city-name");
var recentsEl = document.querySelector("#recents");
var cityArr = [];
var part = "minutely,hourly,alerts";
var cityNameResponse = "";
var cityID = "";
var currentDate = "";
var icon = "";
var description = "";

var city = function(id, name) {
    this.id = id;
    this.name = name;
}



// var loadCities = function() {
//     cityArr = JSON.parse(localStorage.getItem("city"));

//     if (!cityArr) {
//         cityArr = [];
//         return;
//     } else {
//         console.log(cityArr.name.length)
//         // for (var i = 0; i < ; i++) {
//         //         console.log(cityArr.name[i]);
//         // }
        
//     }
// }

var saveCities = function() {
    localStorage.setItem("city", JSON.stringify(city));
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

            // gather city name from first api call, name is not included in second call
                cityNameResponse = data.city.name;
            
           
            
              
               currentDate = data.list[0].dt_txt;
               var wetApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=${part}&appid=${apiKey}`;
               fetch(wetApiUrl).then(function(response) {
                   if (response.ok) {
                    response.json().then(function(data) {
                        createWeatherCard(data);
                        icon = data.current.weather.icon;
                        description = data.current.weather.description;
                    }) 
                   }
               })
            });
        } else {
            alert("The request failed! Please try again");
        }
    }).catch(function(error) {
        alert("Unable to find weather data, please verify your network connection.");
    });

};

var createWeatherCard = function(weather) {
    // create dashboard view for loaction
    var cityCard = document.createElement("div")
    cityCard.className = "card";
    var cardBody = document.createElement("div")
    cardBody.className = "card-body";
    // create title element
    var titleEl = document.createElement("div")
    titleEl.classList = "card-title fs-2";
    // create container for other weather details
    var weatherDetails = document.createElement("div");
    weatherDetails.className = "card-text";
    var temperature = document.createElement("p");
    var tempicon = document.createElement("img");
    var feelsLike = document.createElement("p");
    var humidity = document.createElement("p");
    var uvIndex = document.createElement("p");

    // set text of weather details equal to data from api
    temperature.innerHTML = `Temperature: ${Math.floor(weather.current.temp)}`;
    tempicon.src = `./assets/images/${icon}.png`;
    feelsLike.textContent = `Feels like: ${Math.floor(weather.current.feels_like)}`;
    humidity.textContent = `Humidity: ${weather.current.humidity}`;
    uvIndex.textContent = `UV Index: ${weather.current.uvi}`;
    
    titleEl.textContent = `${cityNameResponse} (${currentDate})`;
    
    temperature.appendChild(tempicon);
    weatherDetails.appendChild(temperature);
    weatherDetails.appendChild(feelsLike);
    weatherDetails.appendChild(humidity);
    weatherDetails.appendChild(uvIndex);
    cardBody.appendChild(titleEl);
    cardBody.appendChild(weatherDetails);
    cityCard.appendChild(cardBody);
    dashboardEl.appendChild(cityCard);

    
    // cityArr.append(new city(data.city.id, data.city.name));
    //         console.log(cityArr);

    saveCities();
};

var recentCitiesCard = function(cityName) {
    var titleEl = document.createElement("li");
    titleEl.className = "list-item";

    titleEl.textContent = cityName;

    console.log("Did it work?");
    recentsEl.appendChild(titleEl);
    
};

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityNameInputEl.value.trim();

    if (cityName) {
        getWeather(cityName);
        cityNameInputEl.value = "";
        
        saveCities();
    } else {
        alert("Please enter a city name");
    }
    dashboardEl.innerHTML = "";
}

// loadCities();
searchFormEl.addEventListener("submit", formSubmitHandler);