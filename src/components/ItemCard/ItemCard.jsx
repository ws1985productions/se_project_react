import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  console.log("Item in ItemCard:", item);
  console.log("Image URL:", item.imageUrl);

  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : false;
  const itemLikeButtonClassName = `card__like-btn ${isLiked ? "liked" : ""}`;

  const handleLike = () => {
    const newLikes = [...item.likes];
    if (isLiked) {
      const index = newLikes.indexOf(currentUser._id);
      if (index !== -1) newLikes.splice(index, 1);
    } else {
      newLikes.push(currentUser._id);
    }

    onCardLike({ id: item._id, isLiked: isLiked });
    console.log("onCardLike in ItemCard:", onCardLike);
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        {currentUser?._id &&  (
        <button
          id={`like-btn-${item._id}`}
          onClick={handleLike}
          className={itemLikeButtonClassName}
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