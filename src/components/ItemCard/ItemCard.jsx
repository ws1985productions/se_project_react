import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext); // Access current user context

  // Check if the user is logged in and if the item is liked
  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);

  // Dynamically set the button className based on the like state
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleLikeClick = () => {
    if (currentUser) {
      onCardLike(item); // Pass the full item object
    } else {
      alert("You must be logged in to like items.");
    }
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && ( // Render like button only if user is logged in
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike" : "Like"}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;