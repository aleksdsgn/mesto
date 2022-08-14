// класс, который создаёт карточку с текстом и ссылкой на изображение
export default class Card {
  // принимает в конструктор её данные и селектор её template-элемента;
  constructor(cardData, cardSelector, handleCardClick, userId, handleLikeCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this.likes = cardData.likes;
    this._idOwner = cardData.owner._id;
    this.id = cardData._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._handleLikeCardClick = handleLikeCardClick;
    this.isLiked = cardData.likes.some(user => user._id === this._userId);
  }

  // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".places__element")
      .cloneNode(true);

    return cardElement;
  }

  // содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".card__image");
    this._buttonLike = this._card.querySelector(".card__button-like");
    this._likesCounter = this._card.querySelector(".card__likes-counter");
    if (this.isLiked) this.addLike();

    this._setEventListeners();

    this._card.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likesCounter.textContent = this.likes.length;

    return this._card;
  }

  // добавить лайк
  addLike() {
    this._buttonLike.classList.add("card__button-like_active");
    this.isLiked = true;
  }

   // убрать лайк
   removeLike() {
    this._buttonLike.classList.remove("card__button-like_active");
    this.isLiked = false;
  }

  // __
  renderLikeCount () {
    this._likesCounter.textContent = this.likes.length;
  }

  // __
  setLikes(likes) {
    this.likes = likes;
  }

  // удалить карточку
  _deleteCard() {
    this._card.remove();
    // очистка ссылки на DOM-элемент
    this._card = null;
  }

  //открыть карточку
  _openCard() {
    this._handleCardClick(this._name, this._link);
  }

  // содержит приватные методы для каждого обработчика;
  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeCardClick(this);
    });

    this._card
      .querySelector(".card__button-delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._cardImage.addEventListener("click", () => {
      this._openCard();
    });
  }
}
