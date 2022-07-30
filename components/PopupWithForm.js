import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы
  constructor(popupSelector, handlerSubmitForm) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    // список всех инпутов в конкретной форме
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    // объект с данными всех инпутов
    this._inputsValues = {};
    // значения каждого инпута записываю в объект
    this._inputList.forEach(item => {
      this._inputsValues[item.name] = item.value;
    });
    return this._inputsValues;
  }

  // Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this._getInputValues());
    });
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
  }
}

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm
