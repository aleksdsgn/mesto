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
    this._submitButtonText = this._submitButton.textContent;
    // this._formInputsValues = {};
    // объект с данными всех инпутов
    this._inputsValues = {};
  }

  // собирает данные всех полей формы в объект
  _getInputValues() {
    // объект с данными всех инпутов
    // this._inputsValues = {};
    // значения каждого инпута записываю в объект
    this._inputList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  // добавляет обработчик клика по иконке закрытия,
  // и добавляет обработчик сабмита формы.
  setEventListeners() {

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());

    });
    super.setEventListeners();
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
  }

  // Отображение текста в кнопке сабмита во время загрузки данных
  waitingLoading(isLoading, waitingText) {
    if (isLoading) {
      this._submitButton.textContent = waitingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
