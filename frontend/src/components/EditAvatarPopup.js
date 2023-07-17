import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputAvatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
    // console.log(inputAvatarRef.current.value)
  }

  useEffect(() => {
    inputAvatarRef.current.value = ""
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар?"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_form_avatar-link"
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        tabIndex="1"
        required
        ref={inputAvatarRef}
      />
      <span
        id="avatar-error"
        className="form__error form__error_visible form__error_avatar_error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
