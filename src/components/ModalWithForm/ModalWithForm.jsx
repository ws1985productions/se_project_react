import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  children,
  buttonText,
  title,
  onClose,
  onSubmit,
}) {
  if (!isOpen) {
    return null; // Return null if modal is not open
  }

  return (
    <div className="modal modal_opened">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;