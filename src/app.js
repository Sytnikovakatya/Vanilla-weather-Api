function displayTemperature (response){
    console.log(response.data);

    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let timeElement = document.querySelector('#time');

    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    //timeElement.innerHTML = New Date(response.data.time);
    
}
let apiKey = "5b20511b045634b6ffabf3o8bcc547t7";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lviv&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
/*function getForecast(coordinates) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }*/