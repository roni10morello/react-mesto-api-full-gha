import React from "react";
import { useForm } from "./hooks/useForm";
import AuthForm from "./AuthForm";

function Register({ onRegister }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <AuthForm
      name="register"
      title="Регистрация"
      textButton="Зарегистрироваться"
      textLabel="Уже зарегистрированы?"
      textLink={"Войти"}
      onSubmit={handleSubmit}
    >
      <input
        value={values.email || ""}
        className="form__input form__input_form_authorize"
        type="email"
        id="email"
        name="email"
        minLength="2"
        maxLength="40"
        required
        placeholder="Email"
        onChange={handleChange}
        autoComplete="off"
      />
      <span
        id="email-error"
        className="form__error form__error_visible form__error_email_error"
      ></span>
      <input
        value={values.password || ""}
        className="form__input form__input_form_authorize"
        type="password"
        name="password"
        id="password"
        minLength="4"
        maxLength="16"
        placeholder="Пароль"
        required
        onChange={handleChange}
        autoComplete="off"
      />
      <span
        id="password-error"
        className="form__error form__error_visible form__error_password-error"
      ></span>
    </AuthForm>
  );
}
export default Register;
