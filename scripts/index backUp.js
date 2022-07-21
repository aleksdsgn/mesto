import Card from './Card.js';
import FormValidator from './FormValidator.js';

// редактирование профиля
const profileEditButton = document.querySelector('.profile__button_type_edit'); // кнопка открытия редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); // селектор попапа редактирования профиля
const formEfitProfile = document.forms.profile; // форма

const nameInput = popupEditProfile.querySelector('.popup__input_type_name'); // поле ввода имени в профиле
const jobInput = popupEditProfile.querySelector('.popup__input_type_job'); // поле ввода доп. информации в профиле

const profileName = document.querySelector('.profile__title'); // отображаемое в разметке имя профиля
const profileJob = document.querySelector('.profile__subtitle'); // отображаемая в разметке доп. информация

// добавление карточки
const profileAddButton = document.querySelector('.profile__button_type_add'); // кнопка открытия добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card'); // селектор попапа добавления карточки
const formAddCard = document.forms.place; // форма
const buttonSubmitFormAddCard = formAddCard.querySelector('.popup__submit-button');

const titleInput = popupAddCard.querySelector('.popup__input_type_title'); // поле ввода заголовка карточки
const linkInput = popupAddCard.querySelector('.popup__input_type_link'); // поле ввода ссылки на картинку

const cardTitle = document.querySelector('.card__title'); // отображаемое в карточке название
const cardImage = document.querySelector('.card__image'); // отображаемая в карточке картинка

const placesContainer = document.querySelector('.places__container'); // тег ul внутрь которого вставляются шаблонные li
const cardTemplate = document.querySelector('.card-template').content; // поиск шаблона для карточки

// открытие картинки
const popupOpenImg = document.querySelector('.popup_type_img'); // селектор попапа открытия картинки
const popupImage = document.querySelector('.popup__image'); // картинка в попапе
const popupCaption = document.querySelector('.popup__caption'); // подпись к картинке в попапе

// набор селекторов для работы с формами
const selectorsForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


// включение валидации всех форм
enableValidation(selectorsForm);

//
// ------------функции---------------------------------------------------------
//
// function openPopupAddCard() {
//   formAddCard.reset(); // сброс заполненных полей при повторном открытии
//   buttonSubmitFormAddCard.setAttribute('disabled', true);
//   buttonSubmitFormAddCard.classList.add('popup__submit-button_disabled');
//   openPopup(popupAddCard);
// }

  // ф-я открытия всех попапов
function openPopup(namePopup) {
  namePopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc); // событие закрытия по Escape
}

  // ф-я закрытия всех попапов
function closePopup(namePopup) {
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc); // событие закрытия по Escape
}

//функция закрытия всех попапов по клавише Escape
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//
// ------------редактирование профиля---------------------------------------------------------
//
  // ф-я отправки данных редактирования профиля на страницу
function handleProfileFormSubmit(e) {
  e.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value; // передаем новые значения в форму
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
  // событие отправки введенных данных редактирования профиля на страницу
popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

  // событие открытия редактирования профиля
profileEditButton.addEventListener('click', function () {
  resetForm(formEfitProfile, selectorsForm);
  nameInput.value = profileName.textContent; // выводим что было написано ранее
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
});

//
// ------------добавление карточки---------------------------------------------------------
//
  // ф-я создания новой карточки
function createCard(name, link) {
  const newElement = cardTemplate.cloneNode(true); // клонирование содержимого шаблона
  const cardTitle = newElement.querySelector('.card__title');
  const cardImage = newElement.querySelector('.card__image');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  newElement.querySelector('.card__button-like').addEventListener('click', (evt) => {
    // переключатель лайка
    evt.target.classList.toggle('card__button-like_active');
    });
  newElement.querySelector('.card__button-delete').addEventListener('click', (evt) => {
    // удаляем карточку
    evt.target.closest('.places__element').remove();
    });
    // открытие картинки
    cardImage.addEventListener('click', () => {
    renderImg(name, link);
    openPopup(popupOpenImg);
  });
  return newElement;
}

  // ф-я добавления новой карточки
function addCard(name, link) {
  const card = createCard(name, link);
  placesContainer.prepend(card); // добавляем в контейнер
}

  // добавление первых 6 карточек
function renderInitCards() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });
}

renderInitCards(); // вызов отрисовки первых 6 карточек

function hundleAddCardSubmit(evt) {
  evt.preventDefault(); // предотвращаем отправку события
  addCard(titleInput.value, linkInput.value); // вызов ф-ии
  closePopup(popupAddCard);
  evt.target.reset(); // очищаем поля формы
}

  // событие добавления карточки
popupAddCard.addEventListener('submit', hundleAddCardSubmit);

  // событие открытия добавления карточки
profileAddButton.addEventListener('click', function () {
  resetForm(formAddCard, selectorsForm);
  openPopup(popupAddCard);
  //отключить кнопку
  disableButton(formAddCard.submit, selectorsForm);
});

//
// ------------открытие картинки---------------------------------------------------------
//
  // ф-я отрисовки увеличенного изображения
function renderImg(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

  // ф-я закрытия всех модалок по клику вне окна или по Х
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
