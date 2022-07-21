// класс, который настраивает валидацию полей формы
export default class FormValidator {
  // принимает в конструктор объект настроек с селекторами и классами формы;
  // принимает вторым параметром элемент той формы, которая валидируется;
  constructor(setting, formElement) {
    this._setting = setting;
    this._formElement = formElement;
  }

  // имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
  // показать ошибку
  _showInputError = (formElement, inputElement, errorMessage, setting) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(setting.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(setting.errorClass);
  };

  // спрятать ошибку
  _hideInputError = (formElement, inputElement, setting) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(setting.inputErrorClass);
    errorElement.classList.remove(setting.errorClass);
    errorElement.textContent = '';
  };

  // проверка на валидность
  _checkInputValidity = (formElement, inputElement, setting) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, setting);
    } else {
      hideInputError(formElement, inputElement, setting);
    }
  };

  // проверяет есть ли не валидные поля
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // отключить кнопку
  _disableButton = (buttonElement, setting) => {
    buttonElement.classList.add(setting.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  // включить кнопку
  _enableButton = (buttonElement, setting) => {
    buttonElement.classList.remove(setting.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  // поведение кнопки сабмита если есть невалидный инпут
  _toggleButtonState = (inputList, buttonElement, setting) => {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, setting);
    } else {
      enableButton(buttonElement, setting);
    }
  };

  // установка слушателей на каждый инпут
  _setEventListeners = (formElement, setting) => {
    const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
    const buttonElement = formElement.querySelector(setting.submitButtonSelector);

    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement, setting);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, setting);

        // чтобы проверять при изменении любого из полей
        toggleButtonState(inputList, buttonElement, setting);
      });
    });
  };

  // имеет публичный метод enableValidation, который включает валидацию формы.
  // валидация всех форм
  enableValidation = (setting) => {
    const formList = Array.from(document.querySelectorAll(setting.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault;
      });
      setEventListeners(formElement, setting);
    });
  };

  // сброс введеных данных после закрытия попапа
  _resetForm = (form, setting) => {
    form.reset();
    const listInputs = Array.from(form.querySelectorAll(setting.inputSelector));
    listInputs.forEach((inputElement) => {
      hideInputError(form, inputElement, setting);
    });
  };
}

// Для каждой проверяемой формы создайте экземпляр класса FormValidator.

/*
-Создайте класс FormValidator, который настраивает валидацию полей формы:
-принимает в конструктор объект настроек с селекторами и классами формы;
-принимает вторым параметром элемент той формы, которая валидируется;
-имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
-имеет публичный метод enableValidation, который включает валидацию формы.
-Для каждой проверяемой формы создайте экземпляр класса FormValidator.
*/
