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

  checkToken() { //token
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
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
  url: "http://localhost:4000",
};

// const options = {
//   url: "https://auth.nomoreparties.co",
// };
const auth = new Auth(options);
export default auth;
