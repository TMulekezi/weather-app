import './style.css';
import WeatherObject from './weatherObject';

async function fetchData(data) {
    const item = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=149cd3dd42a5e7846eafe9f596772ace`);
    const info = await item.json();
    return info;
}


function changeLocation() {
    const newLocation = document.querySelector("input");
    let input = newLocation.value;
    fetchData(input).then((response) => {
        changeDom(createWeatherObject(response));
    } 
    ).catch(function(err){
        console.error(err);
    })
}

function createWeatherObject(jsonInfo) {
    let location = jsonInfo.name;
    let timeZone = jsonInfo.timezone;
    console.log(timeZone);
    let weatherDescription = jsonInfo.weather[0].description;
    let temp = Math.round(((Number(jsonInfo.main.temp) - 273.15) * 10))/10;
    let icon = jsonInfo.weather[0].icon;
    return WeatherObject(location, timeZone, weatherDescription, temp, icon);
}

function changeDom(weatherObject) {
    const title = document.querySelector("a");
    title.textContent = weatherObject.location;
    title.href = `http://www.google.com/maps/search/${weatherObject.location}`;
    const timeDate = document.querySelector(".time-date");
    const time = convertDate(weatherObject.timeZone).toString().substring(0, 21);
    timeDate.textContent = time;

    const temp = document.querySelector(".temp");
    temp.textContent = weatherObject.temp;
    
    const description = document.querySelector(".description");
    description.textContent = capitalizeFirstLetter(weatherObject.conditions);
    
    const mainImage = document.querySelector(".main-data>img");
    mainImage.src = `http://openweathermap.org/img/wn/${weatherObject.icon}@2x.png`;

    
}

function convertDate(offset) {
    const localDate = new Date();
    let utc = localDate.getTime() - localDate.getTimezoneOffset();
    const newDate = new Date(utc + offset*1000);
    return newDate;
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
const searchButton = document.querySelector(".search-bar>img");
searchButton.addEventListener("click",changeLocation);


const newLocation = document.querySelector("input");
newLocation.value = "Boston";
changeLocation();
