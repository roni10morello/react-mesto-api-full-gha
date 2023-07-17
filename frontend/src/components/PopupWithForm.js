function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          className={`popup__form form form_type_${props.name}`}
          name={`form-type_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="form__button-save" type="submit">
            {props.textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
