import "./ConfirmDeleteModal.css";
import closeBtn from "../../assets/closeBtn.svg";

function ConfirmDeleteModal({
  item,
  activeModal,
  handleDeleteItem,
  closeActiveModal,
}) {
  const deleteCard = () => {
    handleDeleteItem(item);
  };

  return (
    <div className={`modal  ${activeModal && "modal_opened"}`}>
      <div className="modal__container modal__content_type_delete">
        <button className="modal__close" type="button">
          <img
            src={closeBtn}
            alt="close-button"
            className="modal__close-btn"
            onClick={closeActiveModal}
          />
        </button>
        <p className="modal__delete_question">
          Are you sure you want to delete this item?
          <br /> This action is irreversible.
        </p>

        <button type="submit" className="modal__confirm" onClick={deleteCard}>
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal__cancel"
          onClick={closeActiveModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;