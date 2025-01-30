import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import { useContext } from "react";
function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    handleCardLike({ id: item._id, isLiked });
  };

  const itemCardLikeClassName = `item__heart ${
    isLiked ? "item__heart_liked" : ""
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser?._id && (
        <button
          className={itemCardLikeClassName}
          type="button"
          onClick={handleLike}
        />
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;