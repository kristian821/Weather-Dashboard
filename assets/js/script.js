var apiKey = "7b7485dc2f6118460368d46ce0344303"


var getWeather = function(cityName) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("The request failed!");
        }
    });
};

getWeather("spokane");