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
    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
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

search('Paris')

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit)
