class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkError() {
    return (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  // getCards() {
  //   return fetch(this._url + `/cards/`, {
  //     method: "GET",
  //     headers: this._headers,
  //   }).then(this._checkError());
  // }

  getCards() {
    const token = localStorage.getItem("token");
    return fetch(`${this._address}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  getUser() {
    const token = localStorage.getItem("token");
    return fetch(this._url + `/users/me/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkError());
  }

  editUserInfo(info) {
    const token = localStorage.getItem("token");
    return fetch(this._url + `/users/me/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    }).then(this._checkError());
  }

  changeUserAvatar(data) {
    const token = localStorage.getItem("token");
    return fetch(this._url + `/users/me/avatar/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkError());
  }

  addNewCard(data) {
    const token = localStorage.getItem("token");
    return fetch(this._url + `/cards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkError());
  }

  removeCard(cardId) {
    const token = localStorage.getItem("token");
    return fetch(this._url + `/cards/` + cardId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkError());
  }

  likeCard(cardId) {
    const token = localStorage.getItem("token");
    return fetch(this._url + `/cards/` + cardId + `/likes/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkError());
  }

  dislikeCard(cardId) {
    const token = localStorage.getItem("token");
    return fetch(this._url + `/cards/` + cardId + `/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkError());
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this.dislikeCard(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }
}

const api = new Api({
  url: "http://localhost:3000",
  // headers: {
  //   authorization: "",
  //   "Content-Type": "application/json",
  // },
});

// const api = new Api({
//   url: "http://localhost:3000",
//   headers: {
//     authorization: "186e858b-0f86-414d-8c8c-a1408bf9b14d",
//     "Content-Type": "application/json",
//   },
// });

export default api;