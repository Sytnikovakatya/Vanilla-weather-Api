function formatdate(timestamp) {
    let date = new Date(timestamp);
    let minutes = date.getMinutes();
    if(minutes < 10) {
        minutes=`0${minutes}`;
    }
    let hours = date.getHours();
    let days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let days=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days[day];
}

function getForecast(city) {
    let apiKey = "5b20511b045634b6ffabf3o8bcc547t7";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector('#forecast');
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay,index){
        if(index <= 6 && index > 0){
        forecastHTML = forecastHTML + `
        <div class="col-2">
          <div class="weather-forecast-date">
            ${formatDay(forecastDay.time)}
          </div>
          <img
            src="${forecastDay.condition.icon_url}"
            alt="${forecastDay.condition.description}"
            width="36"
          />
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-max">${Math.round(forecastDay.temperature.maximum)}°</span>
            <span class="weather-forecast-min">${Math.round(forecastDay.temperature.minimum)}°</span>
          </div>
      </div>`;
      }
    })
    
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;
}



function displayTemperature (response){
    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    celsiusTemperature = response.data.temperature.current

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatdate(response.data.time*1000);
    let conditionIcon = response.data.condition.icon;
    iconElement.setAttribute('src', `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${conditionIcon}.png`);
    iconElement.setAttribute('alt', response.data.condition.description);

    getForecast(response.data.city);
}

function search(city) {
    let apiKey = "5b20511b045634b6ffabf3o8bcc547t7";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputelement = document.querySelector('#city-input');
    search(cityInputelement.value);
    console.log(cityInputelement.value);
}

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

search('Paris');


