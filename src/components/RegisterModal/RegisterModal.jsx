import React, { useRef, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";


const RegisterModal = ({
  activeModal,
  closeActiveModal,
  handleRegisterSubmit,
  buttonText = "sign up",
  setActiveModal,
  modalRef,
}) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    handleRegisterSubmit(values);
  };
  return (
    <ModalWithForm
      isOpen={activeModal === "register"}
      title="Sign up"
      buttonText={buttonText}
      activeModal={activeModal}
      secondaryButtonText="or Log In"
      onSecondaryClick={() => setActiveModal("login")}
      onSubmit={handleSubmit}
      modalRef={modalRef}
      closeActiveModal={closeActiveModal}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="signupEmail"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="signupPassword"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="signupName"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="text"
          className="modal__input"
          id="avatarURL"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};
export default RegisterModal;