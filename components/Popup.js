// отвечает за открытие и закрытие попапа
export default class Popup {
  // Принимает в конструктор единственный параметр — селектор попапа
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  // Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  // Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      this.close(openedPopup);
    }
  }

  // Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    document.querySelectorAll('.popup').forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
        if (
          evt.target === evt.currentTarget ||
          evt.target.classList.contains('popup__close-button')
        ) {
          this.close(popup);
        }
      });
    });
  }
}
