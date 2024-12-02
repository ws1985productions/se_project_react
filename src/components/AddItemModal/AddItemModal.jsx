import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, isOpen, onAddItem }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setImageUrl(e.target.value);
  };

  const [weather, setWeatherType] = useState("");
  const handleWeatherTypeChange = (e) => {
    console.log(e.target.value);
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
            id="hot"
            name="weatherType"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherTypeChange}
          ></input>
          <label
            htmlFor="hot"
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
            id="warm"
            value="warm"
            onChange={handleWeatherTypeChange}
          ></input>
          <label
            htmlFor="warm"
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
            id="cold"
            value="cold"
            onChange={handleWeatherTypeChange}
          ></input>
          <label
            htmlFor="cold"
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