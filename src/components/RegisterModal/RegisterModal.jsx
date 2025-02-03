import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  handleCloseModal,
  onRegister,
  isOpen,
  onLoginClick,
}) => {
  const [name, setName] = useState(""); // Not sure if this variable will need to be changed.
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    // Adapt for email-username
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState(""); // Adapt for password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      title={"Sign Up"}
      onClose={handleCloseModal}
      modalType={"register"}
      buttonText={"Sign Up"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      extraContent={
        <span
          onClick={() => {
            onLoginClick();
          }}
          className="modal__or_login"
        >
          or Log in
        </span>
      }
    >
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Email*{" "}
          <input
            type="email"
            name="email"
            maxLength="100"
            placeholder="Email"
            className="modal__input"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
      </div>
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Password*{" "}
          <input
            type="password"
            name="password"
            minLength="8"
            maxLength="100"
            placeholder="Password"
            className="modal__input"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Name *{" "}
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="100"
            placeholder="Name"
            className="modal__input"
            value={name}
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Avatar URL *{" "}
          <input
            type="url"
            name="avatar"
            minLength="5"
            maxLength="100"
            placeholder="Avatar URL"
            className="modal__input"
            value={avatar}
            onChange={handleAvatarChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;