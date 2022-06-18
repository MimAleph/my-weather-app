let dateElement = document.querySelector("#date-info");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = currentTime.getDate();
if (date < 10) {
  date = `0${date}`;
}
let day = currentTime.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let month = currentTime.getMonth();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
dateElement.innerHTML = `${days[day]}, ${months[month]} ${date} <br />${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row weather-forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col-forecast" style="border: 2px solid rgb(255, 255, 255)">
            <div>
                 <img  
          src="image/${forecastDay.weather[0].icon}.svg"
          alt="less clouds"
          height="40"
          width="40" />
            </div>
            <div class="days">${formatDay(forecastDay.dt)}</div>
        
    <br />
    <div>
       <span><i class="fa-regular fa-sun"></i></span>
    <span>${Math.round(forecastDay.temp.max)}°</span>
</div>
<div>
    <span><i class="fa-regular fa-snowflake"></i></span>
    <span class="low-temp">${Math.round(forecastDay.temp.min)}°</span>
</div>
</div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ae9cc35716eff0ddc16a6f4a0947e685";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "#weather-status"
  ).innerHTML = `${response.data.weather[0].description}!`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `image/${response.data.weather[0].icon}.svg`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let iconStatus = document.querySelector("#icon-status");
  iconStatus.setAttribute("src", `image/${response.data.weather[0].icon}.svg`);
  iconStatus.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function showCity(city) {
  let apiKey = `ae9cc35716eff0ddc16a6f4a0947e685`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input");
  showCity(cityInputElement.value);
}
let action = document.querySelector("#search-form");
action.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = `ae9cc35716eff0ddc16a6f4a0947e685`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButtonLocation = document.querySelector("#current-location-button");
currentButtonLocation.addEventListener("click", findCurrentLocation);

function showFahrenheit(event) {
  event.preventDefault();
  let fTemp = Math.round(celsiusTemperature * 9) / 5 + 32;
  let currentfTemp = document.querySelector("#temperature");
  currentfTemp.innerHTML = Math.round(fTemp);
}
let currentfTemp = document.querySelector("#fahrenheit-link");
currentfTemp.addEventListener("click", showFahrenheit);
function showCelsius(event) {
  event.preventDefault();

  let currentcTemp = document.querySelector("#temperature");
  currentcTemp.innerHTML = Math.round(celsiusTemperature);
}

let currentcTemp = document.querySelector("#celsiuse-link");
currentcTemp.addEventListener("click", showCelsius);
let celsiusTemperature = null;

showCity("New York");
