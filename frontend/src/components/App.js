import React from "react";
import { useState, useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import api from "../utils/Api";
import auth from "../utils/Auth";
import Main from "./Main";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [userEmail, setUserEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const navigate = useNavigate();

  function setUserInfo() {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(`ALLARM ${err}`));
  }

  function setAllCards() {
    api
      .getAllCArds()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => console.log(`ALLARM ${err}`));
  }

  useEffect(() => {
    setUserInfo();
    setAllCards();
  }, [isLogin]);

  function handleUpdateUser({ name, about }) {
    api
      .updateProfile({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopup();
      })
      .catch((err) => console.log(`ALLARM ${err}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar({ avatar })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopup();
      })
      .catch((err) => console.log(`ALLARM ${err}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(`ALLARM ${err}`));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleLikeCardClick(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((card) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? card : c))
        );
      })
      .catch((err) => console.log(`ALLARM ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`ALLARM ${err}`));
  }

  function closeAllPopup() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipOpen(false);
  }

  function handleLogin(inputValues) {
    auth
      .authorize(inputValues)
      .then(() => {
        setIsLogin(true);
        navigate("/");
        setUserEmail(inputValues.email);
      })
      .catch((err) => {
        setIsInfoToolTipOpen(true);
        setIsSuccess(false);
        console.log(`ALLARM ${err}`);
      })

  }

  function handleRegister(inputValues) {
    auth
      .register(inputValues)
      .then(() => {
        setIsSuccess(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(`ALLARM ${err}`);
      })
      .finally(() => setIsInfoToolTipOpen(true));
  }

  function handleLogOut() {
    auth
      .logOut()
      .then(() => {
        setIsLogin(false);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(`ALLARM ${err}`);
      })

  }

  useEffect(() => {
    auth
      .checkToken()
      .then((res) => {
        setIsLogin(true);

        setUserEmail(res.email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`ALLARM ${err}`);
        setIsLogin(false);
        setUserEmail("");
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          isLogin={isLogin}
          onSignOut={handleLogOut}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="*"
            element={
              isLogin ? <Navigate to="/" replace /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleLikeCardClick}
                cards={cards}
              />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          textButton="Да"
          onClose={closeAllPopup}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopup} />

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopup}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
