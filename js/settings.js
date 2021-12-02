function changeBGColor() {
    const root = document.querySelector(':root');
    const bgColor = document.getElementById("inputBGColor").value;

    let colorTotal = 0;
    for(let i = 1; i < bgColor.length; i++) {
        if (i % 2 != 0) {
            if (bgColor[i] === 'f') {
                colorTotal += 15;
            } else if (bgColor[i] === 'e') {
                colorTotal += 14;
            } else if (bgColor[i] === 'd') {
                colorTotal += 13;
            } else if (bgColor[i] === 'c') {
                colorTotal += 12;
            } else if (bgColor[i] === 'b') {
                colorTotal += 11;
            } else if (bgColor[i] === 'a') {
                colorTotal += 10;
            } else {
                colorTotal += parseInt(bgColor[i]);
            }
        }
    }
    
    root.style.setProperty('--bg-color', bgColor);
    if (colorTotal <= 25) {
        root.style.setProperty('--bg-font-color', "#FFFFFF");
    } else {
        root.style.setProperty('--bg-font-color', "#000000");
    }
}
// Anchorage = 99502
const city = "Madison"
const zip = "53706";
const lat = 43.07815276502502;
const lon = -89.41477145047965;
const country = "us";
const key = "7340074306ad72b3dc57f0afe5190f08";

function getWeather() {

    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=`+zip+`,`+country+`&appid=`+
            key+`&units=imperial`, {cache: 'no-cache'})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const temp = Math.round(data.main.temp);
            document.getElementById('cityName').innerHTML = data.name;
            document.getElementById('temperature').innerHTML = temp + " Degrees Fahrenheit";

            console.log(data.main.temp);
        });

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=`+lat+`&lon=`+lon+
    `&exclude=minutely,daily,alerts&appid=`+key+`&units=imperial`, {cache: 'no-cache'})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const setTime = data.current.sunset;
            const riseTime = data.current.sunrise;

            const sunset = new Date(setTime * 1000);
            const sunrise = new Date(riseTime * 1000);
            const timeNow = new Date();

            const sunsetHour = sunset.getHours();
            const sunsetMinutes = sunset.getMinutes();
            const sunriseHour = sunrise.getHours();
            const sunriseMinutes = sunrise.getMinutes();
            const nowHour = timeNow.getHours();

            let tilSunset;
            let tilSunrise;

            if (sunsetHour - nowHour < 0) {
                tilSunset = 24 - nowHour + sunsetHour;
            } else {
                tilSunset = sunsetHour - nowHour;
            }

            if (sunriseHour - nowHour < 0) {
                tilSunrise = 24 - nowHour + sunriseHour;
            } else {
                tilSunrise = sunriseHour - nowHour;
            }

            const sunsetClouds = data.hourly[tilSunset].clouds;
            const sunriseClouds = data.hourly[tilSunrise].clouds;

            console.log(sunsetClouds);
            console.log(sunriseClouds);

            if (sunriseClouds < 10) {
                document.getElementById('sunrise').innerHTML = "Good Sunrise At " +
                        sunriseHour + ":" + sunriseMinutes;
            }
            if (sunsetClouds < 10) {
                document.getElementById('sunset').innerHTML = "Good Sunset At " +
                        sunsetHour + ":" + sunsetMinutes;
            }
        });
}

getWeather();