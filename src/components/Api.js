// import apiConfig from "../utils/apiConfig.js";

import { data } from "autoprefixer";

export default class Api {
  constructor(apiConfig) {
    this._url = apiConfig.baseUrl;
    this._headers = apiConfig.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получить данные профиля с сервера
  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(this._handleResponse);
  }

  // отправить отредактированные данные профиля на сервер
  setProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._handleResponse);
  }

  // получить карточки с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(this._handleResponse);
  }

  // создание и загрузка новой карточки на сервер
  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._handleResponse);
  }

  // удаление карточки с сервера
  deleteCardById(id) {
    return fetch(`${this._url}/cards/_${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleResponse);
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._handleResponse);
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleResponse);
  }
}
