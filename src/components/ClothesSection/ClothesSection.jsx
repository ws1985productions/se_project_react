import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ items, handler, onClick, onCardLike }) {
  const currentUserId = useContext(CurrentUserContext)?._id;
  const userItems = items.filter((item) => item.owner === currentUserId);

  return (
    <section className="clothes-section">
      <div className="clothes-section__text-container">
        <p className="clothes-section__your-items">Your items</p>
        <button
          className="clothes-section__add-btn"
          type="button"
          onClick={onClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards-list">
        {userItems.map((item, index) => (
          <ItemCard
            key={`${item._id || item.id}-${index}`}
            item={item}
            onCardClick={handler}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;