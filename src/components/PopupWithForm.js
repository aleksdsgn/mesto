import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    // список всех инпутов в конкретной форме
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._initialSubmitCaption = this._submitButton.textContent;
  }

  // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    // объект с данными всех инпутов
    this._inputsValues = {};
    // значения каждого инпута записываю в объект
    this._inputList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  // Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
  }

  // метод отображающий текст во время загрузки данных
  waitingLoading(waitingText) {
    this._submitButton.textContent = waitingText;
  }

  // установить изначальный текст кнопки
  setInitialSubmitCaption() {
    this._submitButton.textContent = this._initialSubmitCaption;
  }
}
