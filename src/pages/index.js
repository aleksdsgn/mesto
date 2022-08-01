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
  profileEditButton,
  popupEditProfile,
  formEditProfile,
  profileData,
  nameInput,
  infoInput,
  profileAddButton,
  popupAddCard,
  formAddCard,
  placesContainer,
  popupOpenImage
} from '../utils/constants.js';


// ----------\/ редактирование профиля \/------------ //

const handlerSubmitFormProfile = (userInfoData) => {
  newUserInfo.setUserInfo(userInfoData);
  popupProfile.close();
}

const validationFormEditProfile = new FormValidator(selectorsForm, formEditProfile);
validationFormEditProfile.enableValidation();

const popupProfile = new PopupWithForm(popupEditProfile, handlerSubmitFormProfile);
popupProfile.setEventListeners();

const newUserInfo = new UserInfo(profileData);

profileEditButton.addEventListener('click', () => {
  validationFormEditProfile.resetForm();

  nameInput.value = newUserInfo.getUserInfo().name;
  infoInput.value = newUserInfo.getUserInfo().info;

  popupProfile.open();
});


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
placesContainer);

initialList.renderItems();


// ----------\/ добавление новой карточки \/------------ //

const handlerSubmitFormNewCard = (cardItem) => {
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

const popupNewCard = new PopupWithForm(popupAddCard, handlerSubmitFormNewCard);
popupNewCard.setEventListeners();

profileAddButton.addEventListener('click', () => {
  validationFormAddCard.resetForm();
  popupNewCard.open();
});


// ----------\/ открытая карточка \/------------ //

const popupImage = new PopupWithImage(popupOpenImage);
popupImage.setEventListeners();

const handleCardClick = (item) => {
  popupImage.open(item);
}
