function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-container">
        <img
          className="popup__pic"
          src={props.card.link}
          alt={props.card.name}
        />
        <h3 className="popup__image-title">{props.card.name}</h3>
        <button
          className="popup__button-close popup__button-close_image"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
