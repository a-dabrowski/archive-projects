$(function() {
    $.ajax({ //ajax for getting location by ip
        type: "GET",
        url: 'https://ipinfo.io/json', //ip info url
        timeout: 9000,
        success: function(response) {
            var location = response.loc.split(',');
            var lat = location[0];
            var lon = location[1];
            getWeather(lat, lon);
        },
        fail: function(){
          console.log("fail to get coordinates by ip");
        }
    });
});

function getWeather(latitude, longitude) {
    $.ajax({
        type: "GET",
        url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=3f8f4f1acc17b08501990a25e6c93f3c',
        timeout: 9000,
        success: function(data) {
            console.log("Request success");
            var html = $("html");
            var htmlContainer = $("html");
            var temperature = data.main.temp;
            var celsiusTemp = Math.floor(temperature - 273);
            var fahrenheitTemp = Math.floor(32 + (9 / 5) * celsiusTemp);
            var weatherDescription = data.weather[0].main;
            $(".place h3").html(data.name);
            $(".temp-fahrenheit").prepend(fahrenheitTemp).hide();
            $(".temp-celsius").prepend(celsiusTemp);
            $(".presentation").html("<h3>" + weatherDescription + "</h3>");
            $("#toggleFahCel").on("submit click", function(e) {
                e.preventDefault;
                $(".temp-fahrenheit").toggle();
                $(".temp-celsius").toggle();
            });
            switch (weatherDescription) {//doesn't work
                case "Thunderstorm":
                    html.addClass("thunderstorm");
                    break;
                case "Rain":
                    html.addClass("heavyrain");
                    break;
                case "Snow":
                    html.addClass("snow");
                    break;
                case "Clear":
                    html.addClass("sun");
                    break;
                case "Clouds":
                    html.addClass("clouds");
                    break;
                case "Drizzle":
                    html.addClass("moderate-rain");
                    break;
                default:
                    $('.temperature').text("<p>Couldn't fetch data</p>");
                    htmlContainer.addClass("thunderstorm");
                    break;
            }
        },
        fail: function() {
            console.log("Request failed");
            $(".place").html("<p>Weather not available at the time</p>");
        }
    });
}
