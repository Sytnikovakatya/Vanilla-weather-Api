function formatdate(timestamp) {
    //calculate the date
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

function displayTemperature (response){
    console.log(response.data);

    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');

    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
   dateElement.innerHTML = formatdate(response.data.time*1000);
    
}
let apiKey = "5b20511b045634b6ffabf3o8bcc547t7";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lviv&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
/*function getForecast(coordinates) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }*/