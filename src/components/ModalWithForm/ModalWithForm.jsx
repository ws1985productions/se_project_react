import React, { useRef } from "react";
import close from "../../assets/closeBtn.svg";
import useEscapeKey from "../../hooks/useEscapeKey";
import "./ModalWithForm.css";

function ModalWithForm({
  activeModal,
  closeActiveModal,
  children,
  buttonText,
  title,
  secondaryButtonText,
  onSecondaryClick,
  isOpen,
  handleCloseClick,
  onSubmit,
  customClass,
}) {
  console.log("Modal Button Text:", buttonText);

  const modalRef = useRef(null);
  useEscapeKey(!!activeModal, closeActiveModal, modalRef);

  return (
    <div
      className={`modal  ${isOpen ? "modal_opened" : ""} ${customClass || ""}`}
      ref={modalRef}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={close} alt="close_button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-container">
            <button
              type="submit"
              className={`modal__submit ${
                customClass === "edit-profile-modal"
                  ? "modal__submit_black"
                  : ""
              }`}
            >
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                type="button"
                className="modal__submit modal__submit_without-border"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;