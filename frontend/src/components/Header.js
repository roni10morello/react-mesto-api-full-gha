import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/header_logo.svg";

function Header({ isLogin, userEmail, onSignOut }) {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <div className="header__menu">
          {isLogin ? <p className="header__email">{userEmail}</p> : ""}
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__menu-link">
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__menu-link">
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/"
              element={
                <Link
                  to="/"
                  className="header__menu-link"
                  onClick={onSignOut}
                  style={{ color: "grey" }}
                >
                  Выйти
                </Link>
              }
            />
          </Routes>
        </div>
      </header>
    </>
  );
}

export default Header;
