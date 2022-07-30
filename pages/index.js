import Card from '../components/Card.js';
import initialCards from '../utils/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import selectorsForm from '../utils/selectorsForm.js';

// редактирование профиля
const profileEditButton = document.querySelector('.profile__button_type_edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const formEditProfile = document.forms.profile;

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

// попап с увеличенной картинкой
const popupOpenImage = document.querySelector('.popup_type_img');
const popupImage = document.querySelector('.popup__image'); // картинка в попапе
const popupCaption = document.querySelector('.popup__caption'); // подпись к картинке в попапе

// ------------ валидация форм ------------ //

const validationFormEditProfile = new FormValidator(selectorsForm, formEditProfile);
validationFormEditProfile.enableValidation();

const validationFormAddCard = new FormValidator(selectorsForm, formAddCard);
validationFormAddCard.enableValidation();

// ------------ работа с попапами ------------ //

// открытие всех попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}
// закрытие всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
  validationFormEditProfile.resetForm();

  // вывод ранее написаного
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(popupEditProfile);
});

// ------------ добавление карточки ------------ //

// событие открытия добавления карточки
profileAddButton.addEventListener('click', () => {
  // сброс заполненный данных в форме
  formAddCard.reset();
  validationFormAddCard.resetForm();
  openPopup(popupAddCard);
});

// добавления новой карточки в контейнер
function addCard(card, container) {
  container.prepend(card);
}

// создание полностью готовой к вставке карточки
function createCard(item) {
  const card = new Card(item, '.card-template', () => {
    handleCardClick(item);
  });
  const cardElement = card.generateCard();
  return cardElement;
  // addCard(cardElement, placesContainer);
}

// добавление первых 6 карточек
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  addCard(cardElement, placesContainer);
});

// добавление пользовательских карточек
function hundleAddCardSubmit(evt) {
  evt.preventDefault();

  const item = {};
  item.name = titleInput.value;
  item.link = linkInput.value;

  const cardElement = createCard(item);
  addCard(cardElement, placesContainer);

  closePopup(popupAddCard);

  // очищаем поля формы
  evt.target.reset();
}

// откытие увеличенного изображения
function handleCardClick(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openPopup(popupOpenImage);
}

// событие добавления карточки
popupAddCard.addEventListener('submit', hundleAddCardSubmit);
