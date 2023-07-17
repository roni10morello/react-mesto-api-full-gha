import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card,onCardClick, onCardDelete, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `elements__btn-like ${isLiked && 'elements__btn-like_active'}` 
  );; 

  function handleClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  function handleLikeCardClick() {
    onCardLike(card);
  }

  return (
    <article className="elements__item">
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="elements__info">
        <h2 className="elements__place">{card.name}</h2>
        {isOwn && (
          <button
            className="elements__btn-delete"
            type="button"
            onClick={handleDeleteClick}
          ></button>
        )}
        <div className="elements__like-container">
          <button className={cardLikeButtonClassName} type="button"  onClick={handleLikeCardClick}></button>
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
