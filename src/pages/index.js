import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../utils/initialCards.js';
import selectorsForm from '../utils/selectorsForm.js';
import {
  buttonEditProfile,
  popupEditProfile,
  formEditProfile,
  profileData,
  nameInput,
  infoInput,
  ButtonAddCard,
  popupAddCard,
  formAddCard,
  cardsContainer,
  popupOpenImage
} from '../utils/constants.js';


// ----------\/ редактирование профиля \/------------ //

const handleSubmitFormProfile = (userInfoData) => {
  newUserInfo.setUserInfo(userInfoData);
  popupProfile.close();
}

const validationFormEditProfile = new FormValidator(selectorsForm, formEditProfile);
validationFormEditProfile.enableValidation();

const popupProfile = new PopupWithForm(popupEditProfile, handleSubmitFormProfile);
popupProfile.setEventListeners();

const newUserInfo = new UserInfo(profileData);

// действия при нажатии кнопки редактирования профиля
const handleButtonEditProfile = () => {
  validationFormEditProfile.resetForm();
  nameInput.value = newUserInfo.getUserInfo().name;
  infoInput.value = newUserInfo.getUserInfo().info;
  popupProfile.open();
}

// слушатель кнопки редактирования профиля
buttonEditProfile.addEventListener('click', handleButtonEditProfile);


// ----------\/ добавление первых 6 карточек \/------------ //

const initialList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(
      cardItem,
      '.card-template',
      () => {
      handleCardClick(cardItem);
    });
    const cardElement = card.generateCard();
    initialList.addItem(cardElement);
  }
},
cardsContainer);

initialList.renderItems();


// ----------\/ добавление новой карточки \/------------ //

const handleSubmitFormNewCard = (cardItem) => {
  const card = new Card(
    cardItem,
    '.card-template',
    () => {
    handleCardClick(cardItem);
  });

  const cardElement = card.generateCard();
  initialList.addItem(cardElement);

  popupNewCard.close();
}

const validationFormAddCard = new FormValidator(selectorsForm, formAddCard);
validationFormAddCard.enableValidation();

const popupNewCard = new PopupWithForm(popupAddCard, handleSubmitFormNewCard);
popupNewCard.setEventListeners();

// действия при нажатии кнопки добавления карточки
const handleButtonAddCard = () => {
  validationFormAddCard.resetForm();
  popupNewCard.open();
}

// слушатель кнопки добавления карточки
ButtonAddCard.addEventListener('click', handleButtonAddCard);


// ----------\/ открытая карточка \/------------ //

const popupImage = new PopupWithImage(popupOpenImage);
popupImage.setEventListeners();

const handleCardClick = (card) => {
  popupImage.open(card);
}
