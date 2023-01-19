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

function displayForecast() {
    let forecastElement = document.querySelector('#forecast');
    let forecastHTML = `<div class="row">`;
    let days = ['Thu', 'Fri', 'Sat', 'Sun'];
    days.forEach(function(day){
        forecastHTML = forecastHTML + `
        <div class="col-2">
          <div class="weather-forecast-date">
            ${day}
          </div>
          <img
            src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
            alt=""
            width="36"
          />
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-max">18°</span>
            <span class="weather-forecast-min">12°</span>
          </div>
      </div>`;
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

    displayForecast()

    celsiusTemperature = response.data.temperature.current

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatdate(response.data.time*1000);
    let conditionIcon = response.data.condition.icon;
    iconElement.setAttribute('src', `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${conditionIcon}.png`);
    iconElement.setAttribute('alt', response.data.condition.description)
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

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector('#temperature');
    celsiusLink.classList.remove('active');
    fahrenheitLink.classList.add('active');
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);  
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add('active');
    fahrenheitLink.classList.remove('active');
    let temperatureElement = document.querySelector('#temperature');
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', displayFahrenheitTemperature);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', displayCelsiusTemperature);

search('Paris');
