import "./AddItemModal.css";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/UseFormAndValidation";

const AddItemModal = ({ onAddItem, isOpen, isLoading, onClose }) => {
  const { values, handleChange, isValid, errors, setValues, resetForm } =
    useFormAndValidation();

  const resetCurrentForm = () => {
    resetForm({ name: "", imageUrl: "", weather: "" });
  };

  useEffect(() => setValues({ weather: "hot" }), [setValues]);

  return (
    <ModalWithForm
      title="new garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => {
        const newItem = {
          name: values.name,
          weather: values.weather,
          imageUrl: values.imageUrl,
        };
        onAddItem(newItem, resetCurrentForm);
      }}
      formValid={isValid}
    >
      <label htmlFor="name-AddItem" className="modal__label">
        Name{" "}
        <input
          placeholder="Name"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          id="name-AddItem"
          type="text"
          className="modal__input"
          minLength="2"
          maxLength="30"
        />
        <span
          className={`modal__input-error ${
            errors.name ? "modal__input-error_visible" : ""
          }`}
          id="name-error"
        >
          {errors.name}
        </span>
      </label>
      <label htmlFor="imageUrl-AddItem" className="modal__label">
        Image{" "}
        <input
          placeholder="Image Url"
          value={values.imageUrl || ""}
          name="imageUrl"
          onChange={handleChange}
          id="imageUrl-AddItem"
          type="url"
          className="modal__input"
          minLength="1"
        />
        <span
          className={`modal__input-error ${
            errors.imageUrl ? "modal__input-error_visible" : ""
          }`}
          id="avatarUrl-error"
        >
          {errors.imageUrl}
        </span>
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          {" "}
          <input
            name="weather"
            id="hot"
            value="hot"
            type="radio"
            onChange={handleChange}
            className="modal__radio-input"
            checked={values.weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            value="warm"
            type="radio"
            className="modal__radio-input"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            name="weather"
            value="cold"
            id="cold"
            type="radio"
            className="modal__radio-input"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>{" "}
    </ModalWithForm>
  );
};

export default AddItemModal;