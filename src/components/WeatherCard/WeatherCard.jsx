import { weatherOptions, defaultWeatherOptions } from '../../utils/constants';
import './WeatherCard.css'

function WeatherCard({ weatherData }) {



    const filterOptions = weatherOptions.filter((option) => {
        return (
            option.day === weatherData.isDay && 
            option.condition === weatherData.condition
        ); 
    }); 

    let weatherOption;
    if (filterOptions.length === 0) {
        weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
    } else {
        weatherOption = filterOptions[0];

    }

    console.log(weatherData.isDay);
    console.log(weatherOptions);
    console.log(filterOptions);


    return <section className="weather-card">
        <p className="weather-card__temp">{weatherData.temp.F} &deg;</p>
        <img src={weatherOption?.url} alt={`Card showing ${weatherOption?.day  ? "day" : "night"}time ${weatherOption?.condition} weather`} className="weather-card__image" />
    </section>;
}

export default WeatherCard;