// общие переменные
const popupCloseButton = document.querySelector('.popup__close-button'); // кнопка закрытия попапа

// попап редактирования профиля
const profileEditButton = document.querySelector('.profile__button_type_edit'); // кнопка редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); // селектор попапа редактирования профиля
const nameInput = popupEditProfile.querySelector('.popup__input_type_name'); // поле ввода имени в профиле
const jobInput = popupEditProfile.querySelector('.popup__input_type_job'); // поле ввода доп. информации в профиле
const profileName = document.querySelector('.profile__title'); // отображаемое в разметке имя профиля
const profileJob = document.querySelector('.profile__subtitle'); // отображаемая в разметке доп. информация

// попап добавления карточки
const profileAddButton = document.querySelector('.profile__button_type_add'); // кнопка добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card'); // селектор попапа добавления карточки

//
const placesContainer = document.querySelector('.places__container'); // тег ul внутрь которого вставляются шаблонные li

// первые шесть карточек которые появляются при загрузке страницы
const initialCards = [
  {
    name: 'Кадини Мизурина',
    link: './images/card__cadini-misurina.jpg'
  },
  {
    name: 'Водопад Диялума, Шри-Ланка',
    link: './images/card__diyaluma-falls-sri-lanka.jpg'
  },
  {
    name: 'Озеро Гозаузеен, Австрия',
    link: './images/card__gosauseen-austria.jpg'
  },
  {
    name: 'о. Крит, Греция',
    link: './images/card__kreta-griechenland.jpg'
  },
  {
    name: 'г. Уаргла, Алжир',
    link: './images/card__ouargla-algeria.jpg'
  },
  {
    name: 'Сива, Египет',
    link: './images/card__siwa-egypt.jpg'
  }
];

// функция закрытия попапа по клавише Escape
function closePopupOnEsc(e) {
  if (e.code === 'Escape') {
    closePopup();
  }
}

// функция открытия попапа редактирования профиля
function openEditPopup() {
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  document.addEventListener('keyup', closePopupOnEsc);
}

// функция закрытия попапа редактирования профиля
function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupOnEsc);
}

// слушатель на открытие попапа редактирования профиля
profileEditButton.addEventListener('click', function() {
  openEditPopup()
});

// слушатель на закрытие попапа
popupCloseButton.addEventListener('click', function() {
  closePopup()
});

popupEditProfile.addEventListener('click', function(e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
});

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

popupEditProfile.addEventListener('submit', formSubmitHandler);

// функция добавления первых 6 карточек
initialCards.forEach(function (item) {
  const cardTemplate = document.querySelector('#card-template').content; // поиск шаблона для карточки
  const placesElement = cardTemplate.cloneNode(true); // клонирование содержимого шаблона

  placesElement.querySelector('.card__title').textContent = item.name;
  placesElement.querySelector('.card__image').src = item.link;
  placesElement.querySelector('.card__image').alt = item.name;

  placesContainer.append(placesElement)
});

// функция открытия попапа добавления карточки
function openAddPopup() {
  popupAddCard.classList.add('popup_opened');
  // nameInput.value = profileName.textContent;
  // jobInput.value = profileJob.textContent;
  document.addEventListener('keyup', closePopupOnEsc);
}

// слушатель на открытие попапа добавления карточки
profileAddButton.addEventListener('click', function() {
  openAddPopup()
});

// функция закрытия попапа добавления карточки
function closePopup() {
  popupAddCard.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupOnEsc);
}
