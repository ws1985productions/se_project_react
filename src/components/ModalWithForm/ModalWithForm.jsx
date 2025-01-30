
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  altButtonText,
  altButtonClick,
  title,
  isOpen,
  onClose,
  onSubmit,
  formValid,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <form action="" onSubmit={handleSubmit} className="modal__form">
          {children}
          <div className="modal__buttons-container">
            <button
              className={`modal__submit modal__el_hovered ${
                !formValid ? "modal__submit_disabled" : ""
              }`}
              type="submit"
              disabled={!formValid}
            >
              {buttonText}
            </button>
            <button
              className="modal__text-button modal__el_hovered"
              type="button"
              onClick={altButtonClick}
            >
              {altButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
