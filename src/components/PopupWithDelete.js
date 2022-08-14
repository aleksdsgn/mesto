import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor (popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitButton = this._formElement.querySelector('.popup__submit-button');
    this._initialSubmitCaption = this._submitButton.textContent;
  }

  getFormElement () {
    return this._formElement;
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  pending (textPending) {
    this._submitButton.textContent = textPending;
  }

  setInitialSubmitCaption () {
    this._submitButton.textContent = this._initialSubmitCaption;
  }

  setDataCard (card) {
    this._card = card;
  }

  getDataCard () {
    return this._card;
  }
}
