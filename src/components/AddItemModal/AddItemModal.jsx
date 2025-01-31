import "./AddItemModal.css";
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, activeModal }) => {
  console.log("AddItemModal function executed");
  const [name, setName] = useState("");
  const [link, setUrl] = useState("");
  const [weather, setWeather] = useState("warm"); // Default to warm

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting item:", { name, link, weather }); // Debugging log
    onAddItem({ name, link, weather });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={activeModal === "add-garment"}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          placeholder="Image URL"
          value={link}
          onChange={handleUrlChange}
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />
          <span>Hot</span>
        </label>

        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          <span>Warm</span>
        </label>

        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;