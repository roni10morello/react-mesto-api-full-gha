import accepted_login from "../images/accepted_login.svg";
import error_login from "../images/error_login.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  const infoImage = isSuccess ? accepted_login : error_login;
  const infoText = isSuccess
    ? "Вы успешно зарегестрировались!"
    : "Что-то пошло не так! Попробуйте еще раз.";

  return (
    <div className={`popup popup_type_tool ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_tooltip">
        <img className="popup__login-picture" src={infoImage} alt={infoText} />
        <h3 className="popup__title popup__title_type_tooltip">{infoText}</h3>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
