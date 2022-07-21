// класс, который создаёт карточку с текстом и ссылкой на изображение
export default class Card {
  // принимает в конструктор её данные и селектор её template-элемента;
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

   // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.places__element')
      .cloneNode(true);

    return cardElement;
  }

  // содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    return this._element;
  }

  // содержит приватные методы для каждого обработчика;
  _setEventListeners() {
    this._element.querySelector('.card__button-like').addEventListener('click', () => {
      this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
    });
    this._element.querySelector('.card__button-delete').addEventListener('click', () => {
      this._element.closest('.places__element').remove();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

}
