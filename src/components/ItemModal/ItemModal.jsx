import './ItemModal.css'

function ItemModal({ activeModal, card, closeActiveModal, handleOverlay }) {
    return (
        <div onClick={handleOverlay} className={`modal ${activeModal === "preview" && "modal_open"}`}>
            <div className="modal__content modal__content_type_image">
                <button onClick={closeActiveModal} type='button' className='modal__close modal__close_item'></button>
                <img className='modal__image' src={card.link} alt='card.name' />
                <div className='modal__footer'>
                    <p className='modal__caption'>{card.name}</p>
                    <p className='modal__weather'>Weather: {card.weather}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;