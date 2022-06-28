// показать ошибку
const showInputError = (formElement, inputElement, errorMessage, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.errorClass);
};

// спрятать ошибку
const hideInputError = (formElement, inputElement, setting) => {
  console.log({formElement, inputElement, setting, selector:`.${inputElement.id}-error`});
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.classList.remove(setting.errorClass);
  errorElement.textContent = '';
};

// проверка на валидность
const checkInputValidity = (formElement, inputElement, setting) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, setting);
  } else {
    hideInputError(formElement, inputElement, setting);
  }
};

// проверяет есть ли не валидные поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// отключить кнопку
const disableButton = (buttonElement, setting) => {
  buttonElement.classList.add(setting.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

// включить кнопку
const enableButton = (buttonElement, setting) => {
  buttonElement.classList.remove(setting.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

// поведение кнопки сабмита если есть невалидный инпут
const toggleButtonState = (inputList, buttonElement, setting) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, setting);
  } else {
    enableButton(buttonElement, setting);
  }
};

// установка слушателей на каждый инпут
const setEventListeners = (formElement, setting) => {
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

// валидация всех форм
const enableValidation = (setting) => {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault;
    });
    setEventListeners(formElement, setting);
  });
};

// сброс введеных данных после закрытия попапа
const resetForm = (form, setting) => {
  form.reset();
  const listInputs = Array.from(form.querySelectorAll(setting.inputSelector));
  listInputs.forEach((inputElement) => {
    hideInputError(form, inputElement, setting);
  });
};
