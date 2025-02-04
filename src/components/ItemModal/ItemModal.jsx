import "./ItemModal.css";
import close from "../../assets/close_button.svg";
import { useRef } from "react";
import useEscapeKey from "../../hooks/useEscapeKey";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, handleDeleteClick }) {
  const modalRef = useRef(null);
  const closeActiveModal = () => {
    onClose();
  };
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card?.owner === currentUser?._id;

  useEscapeKey(!!activeModal, closeActiveModal, modalRef);
  return (
    <div
      className={`modal ${activeModal === "preview" && "modal_opened"}`}
      ref={modalRef}
    >
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close_button" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <section className="modal__footer-section">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </section>
          <section>
            {isOwn && (
              <button
                onClick={() => handleDeleteClick(card)}
                type="button"
                className="modal__delete"
              >
                Delete item
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;