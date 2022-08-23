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

// экземпляр класса для работы с данными пользователя в профиле
const newUserInfo = new UserInfo(profileData);

// загрузка информации профиля с сервера
// api.getProfileInfo()
//   .then((data) => {
//     // console.log(data);
//     newUserInfo.setUserInfo(data);
//   })
//     .catch((err) => {
//     console.log(err);
//   });

// ----------\/ редактирование аватарки \/------------ //

// обработка сабмита в форме с аватаркой
const handleSubmitFormAvatar = (userInfoData) => {
  popupAvatar.waitingLoading(true, 'Сохранение...');
  api.editAvatar(userInfoData.link)
  .then((data) => {
    newUserInfo.setUserInfo(data);
    newUserInfo.renderUserAvatar();
    popupAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAvatar.waitingLoading(false);
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
  validationFormAvatar.resetForm();
  popupAvatar.open();
}

// ----------\/ редактирование текстовой информации \/------------ //

// обработка сабмита в форме профиля
const handleSubmitFormProfile = (userInfoData) => {
  popupProfile.waitingLoading(true, 'Сохранение...');
  api.setProfileInfo(userInfoData)
  .then((data) => {
    // console.log(data);
    newUserInfo.setUserInfo(data);
    newUserInfo.renderUserInfo();
    popupProfile.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupProfile.waitingLoading(false);
  });
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
  // очистить форму
  validationFormEditProfile.resetForm();
  // подставить данные в поля ввода
  nameInput.value = newUserInfo.getUserInfo().name;
  aboutInput.value = newUserInfo.getUserInfo().about;
  // и только потом открыть готовый попап
  popupProfile.open();
};

// ----------\/ карточки мест \/------------ //

// идентификатор запрашиваемый с сервера
let userId;

const initialListCards = new Section((cardItem) => {
  const idCardCompare = userId === cardItem.owner._id;
  const idLikeCompare = cardItem.likes.some((like) = > {
    like._id === userId
  });
  initialListCards.addItem((createCard(cardItem.name,
    cardItem.link,
    cardItem.likes,
    cardItem._id,
    handleDeleteCard,
    idCardCompare,
    handleLikeElement,
    idLikeCompare)))
}, cardsContainer);

/*
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

//
//


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
  popupNewCard.waitingLoading('Сохранение...');
  api.createCard(cardItem)
  .then((data) => {
    // console.log(data);
    createCard(data);
    // api.getInitialCards();
    popupNewCard.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    // popupNewCard.setInitialSubmitCaption();
  });
  // createCard(cardItem);
  // popupNewCard.close();
};

// экземпляр попапа с формой для добавления новой карточки
// передаём (селектор попапа, обработчик сабмита формы)
const popupNewCard = new PopupWithForm(popupAddCard, handleSubmitFormNewCard);
popupNewCard.setEventListeners();

// действия при нажатии кнопки добавления карточки
const handleClickButtonAddCard = () => {
  validationFormAddCard.resetForm();
  popupNewCard.open();
};

*/
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
    // popupDelete.setInitialSubmitCaption();
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

// слушатель кнопки редактирования аватара
buttonEditAvatar.addEventListener("click", handleClickButtonEditAvatar);

// слушатель кнопки редактирования профиля
buttonEditProfile.addEventListener("click", handleClickButtonEditProfile);

// слушатель кнопки добавления карточки
buttonAddCard.addEventListener("click", handleClickButtonAddCard);


Promise.all([
  // запрос данных о пользователе с сервера
  api.getProfileInfo(),
  // запрос всех карточек с сервера
  api.getInitialCards()
])
.then(([userInfo, cards]) => {
  newUserInfo.setUserInfo(userInfo);
  newUserInfo.renderUserInfo();
  newUserInfo.renderUserAvatar();
  userId = userInfo._id;

  initialListCards.renderItems(cards);
})
.catch((err) => {
  console.log(err);
});
