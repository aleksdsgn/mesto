import "./index.css";
import apiConfig from "../utils/apiConfig.js";
import Api from "../components/Api.js"
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
// import initialCards from "../utils/initialCards.js";
import selectorsForm from "../utils/selectorsForm.js";
import {
  buttonEditAvatar,
  popupEditAvatar,
  formEditAvatar,
  buttonEditProfile,
  popupEditProfile,
  formEditProfile,
  profileData,
  nameInput,
  aboutInput,
  buttonAddCard,
  popupAddCard,
  formAddCard,
  cardsContainer,
  popupOpenImage,
  popupDeleteCard
} from "../utils/constants.js";

const api = new Api(apiConfig);

// ----------\/ работа с профилем \/------------ //

// экземпляр класса для работы с отображаемыми данными пользователя в профиле
const newUserInfo = new UserInfo(profileData);

// загрузка информации профиля с сервера
api.getProfileInfo()
  .then((data) => {
    // console.log(data);
    newUserInfo.setUserInfo(data);
  })
    .catch((err) => {
    console.log(err);
  });

// обработка сабмита в форме профиля
const handleSubmitFormProfile = (userInfoData) => {
  api.setProfileInfo(userInfoData)
  .then((data) => {
    // console.log(data);
    newUserInfo.setUserInfo(data);
    popupProfile.close();
  })
  .catch((err) => {
    console.log(err);
  });
  // newUserInfo.setUserInfo(userInfoData);
  // popupProfile.close();
};



// экземпляр попапа с формой для редактирования информации профиля
// передаём (селектор попапа, обработчик сабмита формы)
const popupProfile = new PopupWithForm(
  popupEditProfile,
  handleSubmitFormProfile
);
popupProfile.setEventListeners();


// действия при нажатии кнопки редактирования профиля
const handleClickButtonEditProfile = () => {
  validationFormEditProfile.resetForm();
  nameInput.value = newUserInfo.getUserInfo().name;
  aboutInput.value = newUserInfo.getUserInfo().about;
  popupProfile.open();
};

// обработка сабмита в форме с аватаркой
const handleSubmitFormAvatar = (userInfoData) => {
  popupAvatar.waitingLoading('Сохранение...');
  api.editAvatar(userInfoData.link)
  .then((data) => {
    newUserInfo.setUserInfo(data);
    newUserInfo.renderAvatar();
    popupAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAvatar.setInitialSubmitCaption();
  });
}

// экземпляр попапа с формой для редактирования аватарки
// передаём (селектор попапа, обработчик сабмита формы)
const popupAvatar = new PopupWithForm(
  popupEditAvatar,
  handleSubmitFormAvatar
);
popupAvatar.setEventListeners();

// действия при нажатии кнопки редактирования аватарки
const handleClickButtonEditAvatar = () => {
  console.log('Хочу сменить аватарку');
  popupAvatar.open();
}

// ----------\/ карточки мест \/------------ //

// создание карточки
const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    ".card-template",
    () => {
      handleCardClick(cardItem);
    },
    () => {
      console.log("Удаление карточки");
      popupDelete.setDataCard(card);

      popupDelete.open();
    },
    newUserInfo.id,
    likeCard);
    const cardElement = card.generateCard();
    // card.isLiked();

    return cardElement;
    // initialList.addItem(cardElement);
};

// лайк карточки
const likeCard = (card) => {
  if (!card.isLiked) {
    api.addLike(card.id)
    .then((data)=>{
      card.setLikes(data.likes);
      card.addLike();
      card.renderLikeCount();
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    api.deleteLike(card.id)
    .then((data)=>{
      card.setLikes(data.likes);
      card.removeLike();
      card.renderLikeCount();
    })
    .catch((err) => {
      console.log(err);
    });
  }
}


// загрузка карточек с сервера
api
  .getInitialCards()
  .then((data) => {
    const initialListCards = new Section(
      {
        items: data,
        renderer: (cardItem) => {
          initialListCards.addItem(createCard(cardItem));
        },
      },
      cardsContainer
    );
    initialListCards.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// обработка сабмита в форме добавление новой карточки
const handleSubmitFormNewCard = (cardItem) => {
  api.createCard(cardItem)
  .then((data) => {
    // console.log(data);
    createCard(data);
    // api.getInitialCards();
    popupNewCard.close();
  })
  .catch((err) => {
    console.log(err);
  });
  // createCard(cardItem);
  // popupNewCard.close();
};



const popupNewCard = new PopupWithForm(popupAddCard, handleSubmitFormNewCard);
popupNewCard.setEventListeners();

// const popupNewCard = new

// действия при нажатии кнопки добавления карточки
const handleClickButtonAddCard = () => {
  validationFormAddCard.resetForm();
  popupNewCard.open();
};

// ----------\/ удаление карточки \/------------ //

const handleSubmitDeleteCard = () => {
  popupDelete.waitingLoading('Удаление...');
  const card = popupDelete.getDataCard();
  api.deleteCardById(card.id)
  .then(() => {
    card.deleteCardById();
    popupDelete.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupDelete.setInitialSubmitCaption();
  });
}

const popupDelete = new PopupWithConfirm(popupDeleteCard, handleSubmitDeleteCard);
popupDelete.setEventListeners();


// ----------\/ открытая карточка \/------------ //

const popupImage = new PopupWithImage(popupOpenImage);
popupImage.setEventListeners();

const handleCardClick = (card) => {
  popupImage.open(card);
};

// ----------\/ валидация \/------------ //

// форма изменения аватарки
const validationFormAvatar = new FormValidator(
  selectorsForm,
  formEditAvatar
);
validationFormAvatar.enableValidation();

// форма редактирования профиля
const validationFormEditProfile = new FormValidator(
  selectorsForm,
  formEditProfile
);
validationFormEditProfile.enableValidation();

// форма добавления карточки
const validationFormAddCard = new FormValidator(
  selectorsForm,
  formAddCard
);
validationFormAddCard.enableValidation();

// ----------\/ слушатели \/------------ //

// слушатель кнопки редактирования профиля
buttonEditProfile.addEventListener("click", handleClickButtonEditProfile);

// слушатель кнопки редактирования аватара
buttonEditAvatar.addEventListener("click", handleClickButtonEditAvatar);

// слушатель кнопки добавления карточки
buttonAddCard.addEventListener("click", handleClickButtonAddCard);
