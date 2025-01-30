import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  handleAddClick,
  clothingItems,
  handleCardClick,
  handleCardLike,
}) {
  // Subscribe to CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Filter items to show only those owned by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header-button">
        <p className="clothes-section__header">Your items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;