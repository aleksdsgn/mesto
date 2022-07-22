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

  // поставить или убрать лайк
  _toggleLike(evt) {
    evt.target.classList.toggle('card__button-like_active');
  }

  // удалить карточку
  _deleteCard() {
    this._element.remove();
    // очистка ссылки на DOM-элемент
    this._element = null;
  }

  //открыть карточку
  _openCard() {
    this._handleCardClick(this._name, this._link);
  }

  // содержит приватные методы для каждого обработчика;
  _setEventListeners() {
    this._element.querySelector('.card__button-like').addEventListener('click', this._toggleLike);

    this._element.querySelector('.card__button-delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openCard();
    });
  }

}
