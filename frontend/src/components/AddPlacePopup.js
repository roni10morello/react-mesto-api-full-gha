import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
     name, link
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name || ""}
        className="form__input form__input_form_add-name"
        type="text"
        name="placename"
        id="placename"
        placeholder="Название картинки"
        tabIndex="1"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeName}
      />
      <span
        id="placename-error"
        className="form__error form__error_visible form__error_placename_error"
      ></span>
      <input
        value={link || ""}
        className="form__input form__input_form_add-link"
        type="url"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        tabIndex="2"
        required
        onChange={handleChangeLink}
      />
      <span
        id="link-error"
        className="form__error form__error_visible form__error_link_error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
