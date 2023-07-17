import { Link } from "react-router-dom";
function AuthForm(props) {
  return (
    <>
      <div className="authorize">
        <div className="authorize__container">
          <h3 className="authorize__title">{props.title}</h3>
          <form
            className={`form form_type_auth form_type_${props.name}`}
            name={`form-type_${props.name}`}
            noValidate
            onSubmit={props.onSubmit}
          >
            {props.children}
            <button
              className="form__button-save form__button-save_type_auth"
              type="submit"
            >
              {props.textButton}
            </button>
          </form>
          <p className="authorize__text-label">{props.textLabel} <Link to="/sign-in" className="authorize__link-login">{props.textLink}</Link></p>
        </div>
      </div>
    </>
  );
}

export default AuthForm;
