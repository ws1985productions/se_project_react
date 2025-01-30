import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, updateUser, activeModal }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Access current user data from context
  const currentUser = useContext(CurrentUserContext);

  // Handle input changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const isOpen = activeModal === "edit-profile";

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !avatar.trim()) {
      alert("Please provide valid name and avatar URL.");
      return;
    }
    updateUser({ name, avatar });
  };

  // Pre-fill form with current user data when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="edit-name">
        Name
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          name="editName"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="avatar">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="edit-avatar"
          name="avatar"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;