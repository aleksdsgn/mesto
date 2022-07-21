import Card from './Card.js';
import initialCards from './initialCards.js';

// редактирование профиля
const profileEditButton = document.querySelector('.profile__button_type_edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const formEfitProfile = document.forms.profile;

const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_job');

// отображаемые данные профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

// добавление карточки
const profileAddButton = document.querySelector('.profile__button_type_add');
const popupAddCard = document.querySelector('.popup_type_add-card');

const formAddCard = document.forms.place;

const titleInput = popupAddCard.querySelector('.popup__input_type_title');
const linkInput = popupAddCard.querySelector('.popup__input_type_link');

// контейнер для шаблонов карточек
const placesContainer = document.querySelector('.places__container');

// шаблон карточки
const cardTemplate = document.querySelector('.card-template').content;

// попап с увеличенной картинкой
const popupOpenImg = document.querySelector('.popup_type_img');
const popupImage = document.querySelector('.popup__image'); // картинка в попапе
const popupCaption = document.querySelector('.popup__caption'); // подпись к картинке в попапе

// ------------ работа с попапами ------------ //

// открытие всех попапов
function openPopup(namePopup) {
  console.log(namePopup);
  namePopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}
// закрытие всех попапов
function closePopup(namePopup) {
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

// закрытие всех попапов по клавише Escape
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// закрытие всех попапов по клику вне окна или по Х
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


// ------------ редактирование профиля ------------ //

// отправка данных редактирования профиля
function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// событие отправки введенных данных редактирования профиля на страницу
popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

// событие открытия редактирования профиля
profileEditButton.addEventListener('click', () => {


  // resetForm(formEfitProfile, selectorsForm);

  // вывод ранее написаного
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(popupEditProfile);
});

// ------------ добавление карточки ------------ //

// событие открытия добавления карточки
profileAddButton.addEventListener('click', () => {

  // !!!!!!!!!!! уже валидация !!!!!!!!!!!!!!!
  // resetForm(formAddCard, selectorsForm);

  openPopup(popupAddCard);
  //отключить кнопку

  // !!!!!!!!!!! уже валидация !!!!!!!!!!!!!!!
  // disableButton(formAddCard.submit, selectorsForm);
});

// добавления новой карточки в контейнер
function addCard(card) {
  placesContainer.prepend(card);
}

// добавление первых 6 карточек
initialCards.forEach((item) => {
  const card = new Card(item, '.card-template', () => {
    renderImg(item.name, item.link);
    openPopup(popupOpenImg);
  });
  const cardElement = card.generateCard();
  addCard(cardElement);
});

// добавление пользовательских карточек
function hundleAddCardSubmit(evt) {
  evt.preventDefault();

  const item = {};

  item.name = titleInput.value;
  item.link = linkInput.value;

  const card = new Card(item, '.card-template', () => {
    renderImg(item.name, item.link);
    openPopup(popupOpenImg);
  });
  const cardElement = card.generateCard();
  addCard(cardElement);

  closePopup(popupAddCard);

  // !!!!!!!!!!! уже валидация !!!!!!!!!!!!!!!
  // evt.target.reset(); // очищаем поля формы
}

function renderImg(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

// событие добавления карточки
popupAddCard.addEventListener('submit', hundleAddCardSubmit);
