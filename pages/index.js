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


/*
// редактирование профиля
// const profileEditButton = document.querySelector('.profile__button_type_edit');
// const popupEditProfile = document.querySelector('.popup_type_edit-profile');
// const formEditProfile = document.forms.profile;
// const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
// const jobInput = popupEditProfile.querySelector('.popup__input_type_job');
// отображаемые данные профиля
// const profileName = document.querySelector('.profile__title');
// const profileJob = document.querySelector('.profile__subtitle');
// добавление карточки
// const profileAddButton = document.querySelector('.profile__button_type_add');
//const popupAddCard = document.querySelector('.popup_type_add-card');
// const formAddCard = document.forms.place;
// const titleInput = popupAddCard.querySelector('.popup__input_type_title');
// const linkInput = popupAddCard.querySelector('.popup__input_type_link');
// контейнер для шаблонов карточек
// const placesContainer = document.querySelector('.places__container');
// const placesContainer = '.places__container';
// попап с увеличенной картинкой
// const popupOpenImage = document.querySelector('.popup_type_img');
// const popupImage = document.querySelector('.popup__image'); // картинка в попапе
// const popupCaption = document.querySelector('.popup__caption'); // подпись к картинке в попапе
*/


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



// ----------\/ добавление новой карточки \/------------ //

const validationFormAddCard = new FormValidator(selectorsForm, formAddCard);
validationFormAddCard.enableValidation();

const popupNewCard = new PopupWithForm(popupAddCard, );
popupNewCard.setEventListeners();


// ----------\/ открытая карточка \/------------ //

const popupImage = new PopupWithImage(popupOpenImage);
popupImage.setEventListeners();

// откытие увеличенного изображения
const handleCardClick = (item) => {
  popupImage.open(item);
}

// ------------ работа с попапами ------------ //

// открытие всех попапов
// function openPopup(popup) {
//   ----- popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupOnEsc);
// }
// закрытие всех попапов
// function closePopup(popup) {
//   ----- popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupOnEsc);
// }

// закрытие всех попапов по клавише Escape
/*
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
*/
// закрытие всех попапов по клику вне окна или по Х
/*
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains('popup__close-button')
    ) {
      closePopup(popup);
    }
  });
});
*/
// ------------ редактирование профиля ------------ //

// отправка данных редактирования профиля
/*
function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  // closePopup(popupEditProfile);
  popupProfile.close();
}
*/


// событие отправки введенных данных редактирования профиля на страницу
// popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

// событие открытия редактирования профиля


// ------------ добавление карточки ------------ //

// событие открытия добавления карточки
profileAddButton.addEventListener('click', () => {
  // сброс заполненный данных в форме
  // formAddCard.reset();
  validationFormAddCard.resetForm();
  // openPopup(popupAddCard);
  popupNewCard.open();
});

// добавления новой карточки в контейнер
/* ------------
function addCard(card, container) {
  container.prepend(card);
}
--------------- */

// создание полностью готовой к вставке карточки
/* ------------
function createCard(item) {
  const card = new Card(item, '.card-template', () => {
    handleCardClick(item);
  });
  const cardElement = card.generateCard();
  return cardElement;
  // addCard(cardElement, placesContainer);
}
--------------- */

// добавление первых 6 карточек
/* ------------
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  addCard(cardElement, placesContainer);
});
--------------- */
const initialList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, '.card-template', () => {
      handleCardClick(cardItem);
    });

    const cardElement = card.generateCard();
    initialList.addItem(cardElement);
  }
},
placesContainer);

initialList.renderItems();

// добавление пользовательских карточек
/*
function hundleAddCardSubmit(evt) {
  evt.preventDefault();

  const item = {};
  item.name = titleInput.value;
  item.link = linkInput.value;

  const cardElement = createCard(item);
  addCard(cardElement, placesContainer);

  // closePopup(popupAddCard);
  popupNewCard.close();

  // очищаем поля формы
  evt.target.reset();
}
*/
/*
// откытие увеличенного изображения
function handleCardClick(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openPopup(popupOpenImage);
}
*/

// событие добавления карточки
// popupAddCard.addEventListener('submit', hundleAddCardSubmit);
