import React, { useRef } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({
  activeModal,
  closeActiveModal,
  handleAddItemSubmit,
  buttonText,
  modalRef,
}) => {
  const { values, handleChange } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    handleAddItemSubmit(values);
  };

  return (
    <ModalWithForm
      isOpen={activeModal === "add-garment"}
      title="Sign up"
      buttonText={buttonText}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      modalRef={modalRef}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="ImageUrl" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          id="ImageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>

      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>

        <div>
          <input
            id="hot"
            type="radio"
            className="modal__radio_input"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            Hot
          </label>
        </div>

        <div>
          <input
            id="warm"
            type="radio"
            className="modal__radio_input"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            Warm
          </label>
        </div>

        <div>
          <input
            id="cold"
            type="radio"
            className="modal__radio_input"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
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