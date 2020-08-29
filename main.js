
// select elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// app data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// kelvin temp from api
const KELVIN = 273;
// api key
const key = "22c8956a7e95264099da46051f8f0e9a";

// check browser support geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// retrieve user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

// display error if geolocation not supported
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// retrieve weather data from api
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
// data into json object
            let data = response.json();
            return data;
        })
        .then(function(data){
// round temp integer down to whole integer
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// display weather
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// click event conversion
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

/* change colour background */
/*
let body = document.getElementById(`body`)

    let tempValue = celsius
    if (tempValue >= 28) {
      gradColors = ['red','orange']
    } else if (tempValue >= 20) {
      gradColors = ['orange','yellow']
    } else if (tempValue >= 15) {
      gradColors = ['yellow','green']
    } else if (tempValue >= 10) {
      gradColors = ['green','blue']
    } else {
      gradColors = ['blue','white']
    }
    body.style.background = `-webkit-linear-gradient(left, ${gradColors[0]}, ${gradColors[1]})`


function changeColor(body) {
 let tempValue = celsius;
 if (tempValue >= 20) {
   document.getElementByTagName("body").style.background = '#99C262';
 }
 else if (tempValue >= 10 && tempValue < 20)
 {
   document.getElementByTagName("body").style.background = '#F8D347';
 }
 else (tempValue <=9)
 {
   document.getElementByTagName("body").style.background = '#FF6C60';
 }
}

changeColor()
*/
