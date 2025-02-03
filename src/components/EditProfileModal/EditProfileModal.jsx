import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";


const EditProfileModal = ({
  isOpen,
  closeActiveModal,
  activeModal,
  buttonText,  
  setCurrentUser,
  modalRef,
  updateUserSubmit,
}) => {
  const { values, handleChange, setValues } = useForm({
    username: "",
    avatar: "",
  });

  const { currentUser } = useContext(CurrentUserContext);


  const handleSubmit = (e) => {
    e.preventDefault();

    updateUserSubmit(
      values.username,
      values.avatar,
      setCurrentUser,
      closeActiveModal
    );
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      console.log("Current User:", currentUser);
      setValues({
        username: currentUser?.name,
        avatar: currentUser?.avatar,
      });
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      isOpen={activeModal === "Edit-profile"}
      title="Edit Profile"
      buttonText={buttonText}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      customClass="edit-profile-modal"
      modalRef={modalRef}
    >
      <label  className="modal__label">
        Name
        <input
          type="text"
          id="username"
          name="username"
          placeholder={currentUser?.name}
          value={values.username}
          onChange={handleChange}
          className="modal__input"
        />
      </label>

      <label  className="modal__label">
        Avatar
        <input
          type="text"
          id="avatar"
          name="avatar"
          placeholder={currentUser?.avatar}
          value={values.avatar}
          onChange={handleChange}
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;