import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  onCardLike,
  onCardClick,
  clothingItems,
  handleAddClick,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const userItems =
    currentUser && currentUser._id
      ? clothingItems.filter((item) => item.owner === currentUser._id)
      : [];
  return (
    <div className="clothesSection">
      <section className="clothesSection__controls">
        <p className="clothesSection__items">Your Items</p>
        <button onClick={handleAddClick} className="clothesSection__btn">
          +Add new
        </button>
      </section>
      <section className="clothesSection__lists">
        <ul className="cards__list">
          {userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ClothesSection;