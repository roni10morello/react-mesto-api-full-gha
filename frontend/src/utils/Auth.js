class Auth {
  constructor(options) {
    this._url = options.url;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`ALLARM: ${res.status}`);
  }

  authorize({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkError(res));
  }

  register({ email, password }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkError(res));
  }

  checkToken() { 
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkError(res));
  }

  logOut() {
    return fetch(`${this._url}/signout`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkError(res));
  }
}

const options = {
  url: 'https://api.morello.nomoreparties.sbs',
};

const auth = new Auth(options);
export default auth;
