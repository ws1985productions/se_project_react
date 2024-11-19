import { useEffect, useState } from 'react';
import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer'
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { coordinates, APIkey } from '../../utils/constants';
function App() {
  const [weatherData, setWeatherData] = useState({ 
    type: "cold", 
    temp: { F: 999 }, 
    city: "",
  });
  const [activeModal, setActiveModal] = useState("preview");
  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }
  const handleAddClick = () => {
    setActiveModal("add-garment");
  }
  const closeActiveModal = () => {
    setActiveModal("");
  }
  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then((data) => {
      const filterData = filterWeatherData(data);
      setWeatherData(filterData);
    })
    .catch(console.error);
  }, []);
  useEffect(() => {
    if (!activeModal) return;
    const handleModalClose = (evt) => {
      if ((evt.target.classList.contains("modal_open") && evt.type === "click") || evt.key === "Escape") {
        closeActiveModal();
      }
    }
    document.addEventListener("keydown", handleModalClose);
    document.addEventListener("click", handleModalClose);
    return () => {
      document.removeEventListener("keydown", handleModalClose);
      document.removeEventListener("click", handleModalClose);
    }
  }, [activeModal]);
  return (
    <div className='app'>
      <div className="app__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <ModalWithForm  closeActiveModal={closeActiveModal} buttonText="Add garment" isOpen={activeModal === "add-garment"} titleText="New garment" activeModal={activeModal}>
          <label htmlFor='name' className='modal__label'>Name
            <input type='text' className='modal__input' id='name' placeholder='Name'></input>
          </label>
          <label htmlFor='imageUrl' className='modal__label'>Image
            <input type='URL' className='modal__input' id='imageUrl' placeholder='Image URL'></input>
          </label>
          <fieldset className='modal__fieldset'>
            <legend className='modal__legend'>Select the weather type:</legend>
            <div>
            <input type='radio' id='hot' name='weather' className='modal__radio-input'></input>
            <label htmlFor='hot' className='modal__label modal__label_type_radio'>
              Hot
            </label>
            </div>
            <div>
            <input type='radio' name='weather' className='modal__radio-input' id='warm'></input>
            <label htmlFor='warm' className='modal__label modal__label_type_radio'>
              Warm
            </label>
            </div>
            <div>
            <input type='radio' name='weather' className='modal__radio-input' id='cold'></input>
            <label htmlFor='cold' className='modal__label modal__label_type_radio'>
              Cold
            </label>
            </div>
          </fieldset>
        </ModalWithForm>
        <ItemModal  activeModal={activeModal} card={selectedCard} closeActiveModal={closeActiveModal} />
      </div>
      <Footer />
    </div>
  );
}
export default App