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

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(this._handleResponse);
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._handleResponse);
  }

  deleteCardById(id) {
    return fetch(`${this._url}/cards/_${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleResponse);
  }
}
