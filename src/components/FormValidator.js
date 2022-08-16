// класс, который настраивает валидацию полей формы
export default class FormValidator {
  constructor(setting, formElement) {
    // объект настроек с селекторами и классами формы
    this._setting = setting;
    // элемент той формы, которая валидируется
    this._formElement = formElement;
    // список инпутов конкретной формы
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._setting.inputSelector)
    );
    // кнопка сабмита попапа
    this._buttonElement = this._formElement.querySelector(
      this._setting.submitButtonSelector
    );
  }

  // показать ошибку (выделить инпут и отобразить текст ошибки под ним)
  _showInputError(inputElement, errorMessage) {
    // конкретный span отображающий текст ошибки
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    // выделить поле инпута красной полосой
    inputElement.classList.add(this._setting.inputErrorClass);
    // отобразить сообщение об ошибке в span-блоке
    errorElement.textContent = errorMessage;
    // добавить класс в котором включена видимость текста об ошибке
    errorElement.classList.add(this._setting.errorClass);
  }

  // спрятать ошибку
  _hideInputError(inputElement) {
    // конкретный span отображающий текст ошибки
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    // убрать выделение поле инпута красной полосой
    inputElement.classList.remove(this._setting.inputErrorClass);
    // убрать класс в котором включена видимость текста об ошибке
    errorElement.classList.remove(this._setting.errorClass);
    // убрать сообщение об ошибке в span-блоке
    errorElement.textContent = "";
  }

  // проверка на валидность
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // проверяет есть ли не валидные поля
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // отключить кнопку
  _disableButton() {
    this._buttonElement.classList.add(this._setting.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  // включить кнопку
  _enableButton() {
    this._buttonElement.classList.remove(this._setting.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // поведение кнопки сабмита если есть невалидный инпут
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  // установка слушателей на каждый инпут
  _setEventListeners() {
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        // чтобы проверять при изменении любого из полей
        this._toggleButtonState();
      });
    });
  }

  // включает валидацию формы
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault;
    });

    this._setEventListeners();
  }

  // сброс введеных данных после закрытия попапа
  resetForm() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableButton();
  }
}
