let now = new Date();
let date = now.getDate();
let currentDate = document.querySelector("#dateOfDay");
currentDate.innerHTML = date;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = days[now.getDay()];
let currentDay = document.querySelector("#weekDay");
currentDay.innerHTML = day;

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
let month = months[now.getMonth()];
let currentMonth = document.querySelector("#month");
currentMonth.innerHTML = month;

let hour = now.getHours();
let currentHour = document.querySelector("#hour");
currentHour.innerHTML = hour;
let minutes = now.getMinutes();
let currentMinute = document.querySelector("#minute");
currentMinute.innerHTML = minutes;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-status").innerHTML =
    response.data.weather[0].main;
}

function showCity(event) {
  event.preventDefault();
  let apiKey = `ae9cc35716eff0ddc16a6f4a0947e685`;
  let currentCity = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
let action = document.querySelector("#search-form");
action.addEventListener("submit", showCity);

function searchLocation(position) {
  let apiKey = `ae9cc35716eff0ddc16a6f4a0947e685`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fTemp = document.querySelector("h1");
  fTemp.innerHTML = Math.round(16 * 1.8 + 32);
}
let currentfTemp = document.querySelector("#fahrenheit-link");
currentfTemp.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let cTemp = document.querySelector("h1");
  cTemp.innerHTML = Math.round((61 - 32) / 1.8);
}

let currentcTemp = document.querySelector("#celsiuse-link");
currentcTemp.addEventListener("click", showCelsius);
let currentButtonLocation = document.querySelector("#current-location-button");
currentButtonLocation.addEventListener("click", findCurrentLocation);
