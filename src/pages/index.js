import "./index.css";
import apiConfig from "../utils/apiConfig.js";
import Api from "../components/Api.js"
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
// import initialCards from "../utils/initialCards.js";
import selectorsForm from "../utils/selectorsForm.js";
import {
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
} from "../utils/constants.js";

const api = new Api(apiConfig);

// ----------\/ работа с профилем \/------------ //

const newUserInfo = new UserInfo(profileData);

// загрузка информации профиля с сервера
api.getProfileInfo()
  .then((data) => {
    console.log(data);
    newUserInfo.setUserInfo(data);
  })
    .catch((err) => {
    console.log(err);
  });

// обработка сабмита в форме профиля
const handleSubmitFormProfile = (userInfoData) => {
  newUserInfo.setUserInfo(userInfoData);
  popupProfile.close();
};

const validationFormEditProfile = new FormValidator(
  selectorsForm,
  formEditProfile
);
validationFormEditProfile.enableValidation();

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

// ----------\/ карточки мест \/------------ //

// создание карточки
const createCard = (cardItem) => {
  const card = new Card(cardItem, ".card-template", () => {
    handleCardClick(cardItem);
  });
  const cardElement = card.generateCard();

  return cardElement;
  // initialList.addItem(cardElement);
};

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

// добавление новой карточки
const handleSubmitFormNewCard = (cardItem) => {
  createCard(cardItem);
  popupNewCard.close();
};

const validationFormAddCard = new FormValidator(selectorsForm, formAddCard);
validationFormAddCard.enableValidation();

const popupNewCard = new PopupWithForm(popupAddCard, handleSubmitFormNewCard);
popupNewCard.setEventListeners();

// действия при нажатии кнопки добавления карточки
const handleClickButtonAddCard = () => {
  validationFormAddCard.resetForm();
  popupNewCard.open();
};

// ----------\/ открытая карточка \/------------ //

const popupImage = new PopupWithImage(popupOpenImage);
popupImage.setEventListeners();

const handleCardClick = (card) => {
  popupImage.open(card);
};

// ----------\/ слушатели \/------------ //

// слушатель кнопки редактирования профиля
buttonEditProfile.addEventListener("click", handleClickButtonEditProfile);

// слушатель кнопки добавления карточки
buttonAddCard.addEventListener("click", handleClickButtonAddCard);
