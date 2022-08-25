// класс, который создаёт карточку с текстом и ссылкой на изображение
export default class Card {
  // принимает в конструктор её данные и селектор её template-элемента;
  constructor(
    name,
    link,
    likes = [],
    id,
    cardSelector,
    handleCardClick,
    handleDeleteCardClick,
    handleLikeCardClick
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeCardClick = handleLikeCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".places__element")
      .cloneNode(true);

    return cardElement;
  }

  // возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard(idCardCompare, likeCompare) {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".card__image");
    this._buttonLike = this._card.querySelector(".card__button-like");
    this._buttonDelete = this._card.querySelector(".card__button-delete");
    this._likesCounter = this._card.querySelector(".card__likes-counter");

    // проверка: ставил ли я лайк, если да, то икока активная
    if (likeCompare) {
      this._buttonLike.classList.add("card__button-like_active");
    }

    // проверка: моя ли это карточка, если нет, то иконку удаления убрать
    if (!idCardCompare) {
      this._buttonDelete.remove();
    }

    this._setEventListeners();

    this._card.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likesCounter.textContent = this._likes.length;

    return this._card;
  }

  // переключатель лайка
  _toggleLike(likesArr) {
    this._likesCounter.textContent = likesArr.likes.length;
    this._buttonLike.classList.toggle("card__button-like_active");
  }

  // удаление карточки
  _deleteCard() {
    this._handleDeleteCardClick(this._id, this._card);
    // очистка ссылки на DOM-элемент
    this._card = null;
  }

  //открытие карточки
  _imageClick() {
    this._handleCardClick(this._name, this._link);
  }

  // содержит приватные методы для каждого обработчика;
  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.classList.contains("card__button-like_active")) {
        this._handleLikeCardClick(this._id, this._toggleLike.bind(this), true);
      } else {
        this._handleLikeCardClick(this._id, this._toggleLike.bind(this), false);
      }
    });
    this._buttonDelete.addEventListener("click", () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener("click", () => {
      this._imageClick();
    });
  }
}
