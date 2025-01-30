import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, handleCardClick, handleCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Debugging: Log weatherData.type and clothing items
  console.log("Weather Data Type:", weatherData.type);
  console.log("Clothing Items:", clothingItems);

  // Filter items based on weather type
  const filteredItems = clothingItems.filter((item) => {
    console.log(
      `Filtering item: ${item.name}, item.weather: ${item.weather}, weatherData.type: ${weatherData.type}`
    );
    return (
      item.weather &&
      item.weather.toLowerCase() === weatherData.type.toLowerCase()
    );
  });

  // Debugging: Log the result of filtering
  console.log("Filtered clothing items:", filteredItems);

  // Debugging: Log the filtered items
  console.log("Filtered Items:", filteredItems);

  return (
    <main>
      <div className="main__container">
        <WeatherCard weatherData={weatherData} />
        <section className="cards">
          <p className="cards__text">
            Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
            {currentTemperatureUnit}. You may want to wear:
          </p>
          <ul className="cards__list">
            {filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike} // Pass the like handler to ItemCard
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Main;