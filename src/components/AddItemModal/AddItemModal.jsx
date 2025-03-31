import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, isOpen, onAddItem }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const [weather, setWeatherType] = useState("");
  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      buttonText="Add garment"
      isOpen={isOpen}
      titleText="New garment"
      onSubmit={handleSubmit}
      firstBtnText="Add garment"
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        ></input>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="URL"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
        ></input>
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <div>
          <input
            type="radio"
            id="weatherHot"
            name="weatherType"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherTypeChange}
          ></input>
          <label
            htmlFor="weatherHot"
            className="modal__label modal__label_type_radio"
          >
            Hot
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="weatherWarm"
            value="warm"
            onChange={handleWeatherTypeChange}
          ></input>
          <label
            htmlFor="weatherWarm"
            className="modal__label modal__label_type_radio"
          >
            Warm
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="weatherCold"
            value="cold"
            onChange={handleWeatherTypeChange}
          ></input>
          <label
            htmlFor="weatherCold"
            className="modal__label modal__label_type_radio"
          >
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;