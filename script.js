'use strict';

/*
Base URL: http://api.weatherapi.com/v1

Current weather	/current.json or /current.xml

Parameter:
key
1b6bd68056034f65bd2150430230903
q

Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
city name e.g.: q=Paris

dummy fetch:
http://api.weatherapi.com/v1/current.json?key=1b6bd68056034f65bd2150430230903&q=London&aqi=no
*/

const weatherList = document.querySelector('#weather-details');
const locationForm = document.querySelector('#location-form');
const locationInput = document.querySelector('#location-input');

//Handling form submition
locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityName = locationInput.value;
  const url = `http://api.weatherapi.com/v1/current.json?key=1b6bd68056034f65bd2150430230903&q=${cityName}`;
  getData(url);
});

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const cityName = data.location.name;
    const country = data.location.country;
    const iconUrl = data.current.condition.icon;
    const conditionText = data.current.condition.text;
    const currentTemp = data.current.temp_c;
    const feelsLike = data.current.feelslike_c;
    const uv = data.current.uv;
    const wind = data.current.wind_kph;
    const timeZone = data.location.tz_id;

    //getting the time
    const date = new Date();
    //formatting the hours as "HH:MM AM/PM"
    const options = {
      timeZone: `${timeZone}`,
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const time = date.toLocaleString('en-US', options);

    weatherList.innerHTML = `
    <li id="temperature" class="weather-detail">${currentTemp}ºC</li>
    <li id="feelslike" class="weather-detail">Feels like ${feelsLike}ºC</li>
    <li id="condition" class="weather-detail"><img id="condition-icon" src="${iconUrl}" alt="${conditionText}">${conditionText}</li>
    <li class="weather-detail">${time}</li>
    <li class="weather-detail">${cityName}, ${country}</li>
    <li class="weather-detail smaller-detail">UV Index: ${uv}</li>
    <li class="weather-detail smaller-detail">Wind speed: ${wind} kmph</li>`;
  } catch (error) {
    console.log(error);
  }
}
