// класс, который настраивает валидацию полей формы
export default class FormValidator {
  // принимает в конструктор объект настроек с селекторами и классами формы;
  // принимает вторым параметром элемент той формы, которая валидируется;
  constructor(setting, formElement) {
    this._setting = setting;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._setting.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._setting.submitButtonSelector);
  }

  // имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
  // показать ошибку
  _showInputError(inputElement, errorMessage) {
    // !!! может объявить это в контструкторе
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._setting.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._setting.errorClass);
  }

  // спрятать ошибку
  _hideInputError(inputElement) {
    // !!! может объявить это в контструкторе
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._setting.inputErrorClass);
    errorElement.classList.remove(this._setting.errorClass);
    errorElement.textContent = '';
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
    this._buttonElement.setAttribute('disabled', true);
  }

  // включить кнопку
  _enableButton() {
    this._buttonElement.classList.remove(this._setting.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
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
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        // чтобы проверять при изменении любого из полей
        this._toggleButtonState();
      });
    });
  }

  // имеет публичный метод enableValidation, который включает валидацию формы.
  // валидация всех форм
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
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
