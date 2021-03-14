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

        var clearSkyDay = "./assets/images/01d.png";

        var clearSkyNight = "./assets/images/01n.png";

        var fewCloudsDay = "./assets/images/02d.png";

        var fewCloudsNight = "./assets/images/02n.png";
       
        var scatteredCloudsDay = "./assets/images/03d.png";
   
        var scatteedCloudsNight= "./assets/images/03n.png";
       
        var brokenCloudsDay = "./assets/images/04d.png";
      
        var brokenCloudsNight= "./assets/images/04n.png";
       
        var showerRainDay = "./assets/images/09d.png";
   
        var showerRainNight= "./assets/images/09n.png";
      
        var rainDay = "./assets/images/10d.png";
     
        var rainNight = "./assets/images/10n.png";

        var thunderstormDay = "./assets/images/11d.png";

        var thunderstormNight = "./assets/images/11n.png";

        var snowDay = "./assets/images/13d.png";

        var snowNight = "./assets/images/13n.png";

        var mistDay = "./assets/images/50d.png";

        var mistNight = "./assets/images/50n.png";

  

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
    var locApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
    // use this api to grab current weather from location searched.
    
    fetch(locApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // find lat and lon and create variables to use in next api call
               var lat = data.city.coord.lat;
               var lon = data.city.coord.lon;

            // gather city name from first api call, name is not included in second call
                cityNameResponse = data.city.name;
            
                var dateOutput = Date(data.list[0].dt_txt).toString().split(' ', 4).join(' ');
                
                
            
              
               currentDate = dateOutput;
               var wetApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=${part}&appid=${apiKey}`;
               fetch(wetApiUrl).then(function(response) {
                   if (response.ok) {
                    response.json().then(function(data) {
                        icon = data.current.weather[0].icon;
                        description = data.current.weather[0].description;
                        createWeatherCard(data);
                        
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
    cityNameInputEl.value = "";

    // create dashboard view for loaction
    var cityCard = document.createElement("div")
    cityCard.className = "card";
    var cardBody = document.createElement("div")
    cardBody.className = "card-body";
    // create title element
    var titleEl = document.createElement("div")
    titleEl.classList = "card-title fs-2";
    // create container for other weather details
    var weatherDetails = document.createElement("ul");
    weatherDetails.classList = "card-text list-group";
    var temperature = document.createElement("p");
    temperature.className = "list-item";
    var tempicon = document.createElement("img");
    var feelsLike = document.createElement("p");
    feelsLike.className = "list-item";
    var humidity = document.createElement("p");
    humidity.className = "list-item";
    var uvIndex = document.createElement("p");
    uvIndex.className = "list-item";

    // set text of weather details equal to data from api
    temperature.innerHTML = `Temperature: ${Math.floor(weather.current.temp)}`;
    
    feelsLike.textContent = `Feels like: ${Math.floor(weather.current.feels_like)}`;
    humidity.textContent = `Humidity: ${weather.current.humidity}`;
    uvIndex.textContent = `UV Index: ${weather.current.uvi}`;
    
    if (icon === '01d') {
        tempicon.src = "./assets/images/01d.png";
    } else if (icon === '01n') {
        tempicon.src = "./assets/images/01n.png";
    } else if (icon === '02d') {
        tempicon.src = "./assets/images/02d.png";
    } else if (icon === '02n') {
        tempicon.src = "./assets/images/02n.png";
    } else if (icon === '03d') {
        tempicon.src = "./assets/images/03d.png";
    } else if (icon === '03n') {
        tempicon.src = "./assets/images/03n.png";
    } else if (icon === '04d') {
        tempicon.src = "./assets/images/04d.png";
    } else if (icon === '04n') {
        tempicon.src = "./assets/images/04n.png";
    } else if (icon === '05d') {
        tempicon.src = "./assets/images/05d.png";
    } else if (icon === '05n') {
        tempicon.src = "./assets/images/05n.png";
    } else if (icon === '09d') {
        tempicon.src = "./assets/images/09d.png";
    } else if (icon === '09n') {
        tempicon.src = "./assets/images/09n.png";
    } else if (icon === '10d') {
        tempicon.src = "./assets/images/10d.png";
    } else if (icon === '10n') {
        tempicon.src = "./assets/images/10n.png";
    } else if (icon === '11d') {
        tempicon.src = "./assets/images/11d.png";
    } else if (icon === '11n') {
        tempicon.src = "./assets/images/11n.png";
    } else if (icon === '13d') {
        tempicon.src = "./assets/images/13d.png";
    } else if (icon === '13n') {
        tempicon.src = "./assets/images/13n.png";
    } else if (icon === '50d') {
        tempicon.src = "./assets/images/50d.png";
    } else if (icon === '50n') {
        tempicon.src = "./assets/images/50n.png";
    }
    
    titleEl.textContent = `${cityNameResponse} - ${currentDate}`;
    
    temperature.appendChild(tempicon);
    weatherDetails.appendChild(temperature);
    weatherDetails.appendChild(feelsLike);
    weatherDetails.appendChild(humidity);
    weatherDetails.appendChild(uvIndex);
    cardBody.appendChild(titleEl);
    cardBody.appendChild(weatherDetails);
    cityCard.appendChild(cardBody);

    var fiveDay = document.createElement("ul");
    fiveDay.classList = "list-group list-group-horizontal-lg";
    fiveDay.innerHTML = "<h2 class='list-group-item flex-fill'>5-Day Forecast: </h2>"


   
    
  

    dashboardEl.appendChild(cityCard);
    dashboardEl.appendChild(fiveDay);
    

    for (var i = 0; i < 5; i++) {
        var forecastCard = document.createElement("li");
        forecastCard.classList = "list-group-item card";
        
        var forecastBody = document.createElement("div");
        forecastBody.className = "card-body";
        var forecastDetails = document.createElement("div");
        forecastDetails.classList = "card-text list-group";
        var forecastTitle = document.createElement("p");
        forecastTitle.classList = "card-title fs-3";
        var forecastTemp = document.createElement("p");
        forecastTemp.className = "list-item";
        var forecastIcon = document.createElement("img");
        var forecastFeelsLike = document.createElement("p");
        forecastFeelsLike.className = "list-item";
        var forecastHumidity = document.createElement("p");
        forecastHumidity.className = "list-item";
        var forecastUV = document.createElement("p");
        forecastUV.className = "list-item";
        var forecastDate = new Date(moment().add(i + 1, "days"));
        
        
        
        forecastTitle.textContent = moment(forecastDate).format("ddd MMM DD YYYY");
        forecastTemp.textContent = `Temperature: ${Math.floor(weather.daily[i].temp.day)}`;
        forecastFeelsLike.textContent = `Feels Like: ${Math.floor(weather.daily[i].feels_like.day)}`;
        forecastHumidity.textContent = `Humidity: ${Math.floor(weather.daily[i].humidity)}`;
        forecastUV.textContent = `UV Index: ${weather.daily[i].uvi}`;

        if (icon === '01d') {
            forecastIcon.src = "./assets/images/01d.png";
        } else if (icon === '01n') {
            forecastIcon.src = "./assets/images/01n.png";
        } else if (icon === '02d') {
            forecastIcon.src = "./assets/images/02d.png";
        } else if (icon === '02n') {
            forecastIcon.src = "./assets/images/02n.png";
        } else if (icon === '03d') {
            forecastIcon.src = "./assets/images/03d.png";
        } else if (icon === '03n') {
            forecastIcon.src = "./assets/images/03n.png";
        } else if (icon === '04d') {
            forecastIcon.src = "./assets/images/04d.png";
        } else if (icon === '04n') {
            forecastIcon.src = "./assets/images/04n.png";
        } else if (icon === '05d') {
            forecastIcon.src = "./assets/images/05d.png";
        } else if (icon === '05n') {
            forecastIcon.src = "./assets/images/05n.png";
        } else if (icon === '09d') {
            forecastIcon.src = "./assets/images/09d.png";
        } else if (icon === '09n') {
            forecastIcon.src = "./assets/images/09n.png";
        } else if (icon === '10d') {
            forecastIcon.src = "./assets/images/10d.png";
        } else if (icon === '10n') {
            forecastIcon.src = "./assets/images/10n.png";
        } else if (icon === '11d') {
            forecastIcon.src = "./assets/images/11d.png";
        } else if (icon === '11n') {
            forecastIcon.src = "./assets/images/11n.png";
        } else if (icon === '13d') {
            forecastIcon.src = "./assets/images/13d.png";
        } else if (icon === '13n') {
            forecastIcon.src = "./assets/images/13n.png";
        } else if (icon === '50d') {
            forecastIcon.src = "./assets/images/50d.png";
        } else if (icon === '50n') {
            forecastIcon.src = "./assets/images/50n.png";
        }

        forecastTemp.appendChild(forecastIcon);
        forecastDetails.appendChild(forecastTemp);
        forecastDetails.appendChild(forecastFeelsLike);
        forecastDetails.appendChild(forecastHumidity);
        forecastDetails.appendChild(forecastUV);
        forecastBody.appendChild(forecastTitle);
        forecastBody.appendChild(forecastDetails);
        forecastCard.appendChild(forecastBody);

        fiveDay.appendChild(forecastCard);
        

    }

    saveCities();
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
        
        
        saveCities();
    } else {
        alert("Please enter a city name");
    }
    dashboardEl.innerHTML = "";
}

// loadCities();
searchFormEl.addEventListener("submit", formSubmitHandler);