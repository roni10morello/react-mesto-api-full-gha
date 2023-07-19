class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`ALLARM: ${res.status}`);
  }

  getAllCArds() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkAnswer(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkAnswer(res));
  }

  updateProfile({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkAnswer(res));
  }

  updateAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ avatar: avatar }),
    }).then((res) => this._checkAnswer(res));
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this._url}/cards/${_id}/likes`, {

      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkAnswer(res));
  };

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkAnswer(res));
  }

  deleteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkAnswer(res));
  }
}

const options = {
  url: 'https://api.morello.nomoreparties.sbs',
  // url: 'http://localhost:4000',
  headers: {
    "Content-Type": "application/json",
  },
};
const api = new Api(options);
export default api;


