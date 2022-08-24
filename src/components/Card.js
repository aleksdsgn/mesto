// класс, который создаёт карточку с текстом и ссылкой на изображение
export default class Card {
  // принимает в конструктор её данные и селектор её template-элемента;
  constructor(
    name,
    link,
    cardSelector,
    handleCardClick,
    likes = [],
    id,
    handleDeleteCardClick,
    // userId,
    handleLikeCardClick
    ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    // this._idOwner = cardData.owner._id;
    this._id = id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    // this._userId = userId;
    this._handleLikeCardClick = handleLikeCardClick;
    // this.isLiked = cardData.likes.some(user => user._id === this._userId);
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
  generateCard(idCardCompare, likeCompare) {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".card__image");
    this._buttonLike = this._card.querySelector(".card__button-like");
    this._buttonDelete = this._card.querySelector(".card__button-delete")
    this._likesCounter = this._card.querySelector(".card__likes-counter");

    if (likeCompare) {
      this._buttonLike.classList.add('card__button-like_active');
    }

    if (!idCardCompare) {
      this._buttonDelete.remove();
      // this._deleteIsValid = false;
    }
    // else {
    //   this._deleteIsValid = true;
    // }

    this._setEventListeners();

    this._card.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likesCounter.textContent = this._likes.length;

    return this._card;
  }

  // // добавить лайк
  // addLike() {
  //   this._buttonLike.classList.add("card__button-like_active");
  //   this.isLiked = true;
  // }

  // // убрать лайк
  // removeLike() {
  //   this._buttonLike.classList.remove("card__button-like_active");
  //   this.isLiked = false;
  // }

  // __
  // renderLikeCount () {
  //   this._likesCounter.textContent = this.likes.length;
  // }

  // __
  // setLikes(likes) {
  //   this.likes = likes;
  // }

  // переключатель лайка
  _toggleLike(likesArr) {
    this._likesCounter.textContent = likesArr.likes.length;
    this._buttonLike.classList.toggle('card__button-like_active');
  }


  // удалить карточку
  deleteCard() {
    this._handleDeleteCard(this._id, this._card);
    // this._card.remove();
    // очистка ссылки на DOM-элемент
    // this._card = null;
  }

  //открыть карточку
  _handleImageClick() {
    this._handleCardClick(this._name, this._link)
  }

  // _openCard() {
  //   this._handleCardClick(this._name, this._link);
  // }

  // содержит приватные методы для каждого обработчика;
  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.classList.contains('card__button-like_active')) {
        this._handleLikeCardClick(this._id, this._toggleLike.bind(this), true);
      } else {
        this._handleLikeCardClick(this._id, this._toggleLike.bind(this), false);
      }
    });

    this._buttonDelete.addEventListener("click", () => {
      this._deleteCard();
    })
    // if (this._deleteIsValid) {
    //   this._buttonDelete.addEventListener("click", () => {
    //     // this._deleteCard();
    //     this._handleDeleteCardClick(this);
    //     // this._handleDeleteCardClick(this);
    //   });
    // }

    this._cardImage.addEventListener("click", () => {
      // this._openCard();
      this._handleImageClick();
      // this._handleCardClick(this);
    });
  }
}
