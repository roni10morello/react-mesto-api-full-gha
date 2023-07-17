import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name || ""}
        className="form__input form__input_form_edit-name"
        type="text"
        id="name"
        name="name"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
        onChange={handleChangeName}
      />
      <span
        id="name-error"
        className="form__error form__error_visible form__error_name_error"
      ></span>
      <input
        value={about || ""}
        className="form__input form__input_form_edit-job"
        type="text"
        name="about"
        id="about"
        minLength="2"
        maxLength="200"
        placeholder="Вид деятельности"
        required
        onChange={handleChangeAbout}
      />
      <span
        id="about-error"
        className="form__error form__error_visible form__error_about_error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
