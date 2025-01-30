
import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, onClose, handleDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content item-modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={card?.imageUrl}
          alt={card?.name}
          className="item-modal__image"
        />
        <div className="item-modal__footer">
          <div className="item-modal__footer-text">
            <h2 className="item-modal__caption">{card?.name}</h2>
            <p className="item-modal__weather">Weather: {card?.weather}</p>
          </div>

          {card?.owner === currentUser?._id && (
            <button
              type="button"
              className="item-modal__delete-btn"
              onClick={handleDeleteClick}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
