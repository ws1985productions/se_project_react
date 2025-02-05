import { checkResponse } from "./api";

export const getWeather = ({latitude, longitude}, APIkey) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`)
   .then(checkResponse);
};

const toCelsius = (temp) => {
   const cel = Math.round((temp - 32) * 5/9);
   return cel;
}

export const filterWeatherData = (data) => {
   const result = {};
   result.city = data.name;
   result.temp = { F: Math.round(data.main.temp), C: toCelsius(Math.round(data.main.temp))};
   result.type = getWeatherType(result.temp.F);
   result.condition = data.weather[0].main.toLowerCase();
   result.isDay = isDay(data.sys, Date.now());
   return result;
}

const isDay = ({sunrise, sunset}, now) => {
   return sunrise * 1000 < now && now < sunset * 1000;
} 

const getWeatherType = (temperature) => {
   temperature = Math.round(temperature);
   if (temperature >= 86) {
       return 'hot';
     } else if (temperature >= 66) {
       return 'warm';
     } else {
       return 'cold';
     }
}