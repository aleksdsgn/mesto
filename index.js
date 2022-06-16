// редактирования профиля
const profileEditButton = document.querySelector('.profile__button_type_edit'); // кнопка открытия редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); // селектор попапа редактирования профиля
const popupCloseButtonEditProfile = popupEditProfile.querySelector('.popup__close-button'); // кнопка закрытия попапа редактирования профиля
const nameInput = popupEditProfile.querySelector('.popup__input_type_name'); // поле ввода имени в профиле
const jobInput = popupEditProfile.querySelector('.popup__input_type_job'); // поле ввода доп. информации в профиле
const profileName = document.querySelector('.profile__title'); // отображаемое в разметке имя профиля
const profileJob = document.querySelector('.profile__subtitle'); // отображаемая в разметке доп. информация

// добавления карточки
const initialCards = [// массив первых шесть карточек которые появляются при загрузке страницы
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

const profileAddButton = document.querySelector('.profile__button_type_add'); // кнопка открытия добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card'); // селектор попапа добавления карточки
const popupCloseButtonAddCard = popupAddCard.querySelector('.popup__close-button'); // кнопка закрытия попапа добавления карточки

const titleInput = popupAddCard.querySelector('.popup__input_type_title'); // поле ввода заголовка карточки
const linkInput = popupAddCard.querySelector('.popup__input_type_link'); // поле ввода ссылки на картинку

const cardTitle = document.querySelector('.card__title'); // отображаемое в карточке название
const cardImage = document.querySelector('.card__image'); // отображаемая в карточке картинка

const placesContainer = document.querySelector('.places__container'); // тег ul внутрь которого вставляются шаблонные li

const cardTemplate = document.querySelector('#card-template').content; // поиск шаблона для карточки



// добавление первых 6 карточек
initialCards.forEach(function (item) {
  const newElement = cardTemplate.cloneNode(true);
  newElement.querySelector('.card__title').innerText = item.name;
  newElement.querySelector('.card__image').src = item.link;
  newElement.querySelector('.card__image').alt = item.name;
  newElement.querySelector('.card__button-like').addEventListener('click', function(event) {  // переключатель лайка
    event.target.classList.toggle('card__button-like_active');
  });
  placesContainer.append(newElement)
}
);

// ++ функция открытия всех попапов
function openPopup(namePopup) {
  namePopup.classList.add('popup_opened');
  // document.addEventListener('keyup', closePopupOnEsc); // функция закрытия попапа по клавише Escape
  // редактирование профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // добавление карточки
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// ++ слушатель на открытие попапа редактирования профиля
profileEditButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
});
// ++ слушатель на открытие попапа добавления карточки
profileAddButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});

// ++ функция закрытия всех попапов
function closePopup(namePopup) {
  namePopup.classList.remove('popup_opened');
  // document.removeEventListener('keyup', closePopupOnEsc);  // функция закрытия попапа по клавише Escape
}

// ++ слушатель закрытия попапа редактирования профиля по кнопке закрытия
popupCloseButtonEditProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
});
// ++ слушатель закрытия попапа добавления карточки по кнопке закрытия
popupCloseButtonAddCard.addEventListener('click', function() {
  closePopup(popupAddCard);
});

// функция отправки введенных данных попапа редактирования профиля на страницу
function editProfileSubmitHandler(e) {
  e.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// отправка введенных данных попапа редактирования профиля на страницу
popupEditProfile.addEventListener('submit', editProfileSubmitHandler);

function renderCard(name, link) { // ф-я добавления карточки на страницу
  const newElement = cardTemplate.cloneNode(true); // клонирование содержимого шаблона
  newElement.querySelector('.card__title').innerText = name;
  newElement.querySelector('.card__image').src = link;
  newElement.querySelector('.card__button-like').addEventListener('click', function(event) {  // переключатель лайка
    event.target.classList.toggle('card__button-like_active');
  });
  placesContainer.prepend(newElement); // добавляем в контейнер
}

function createCard(e) {
  e.preventDefault(); // предотвращаем отправку события
  renderCard(titleInput.value, linkInput.value); // вызов ф-ии
  titleInput.value = '';
  linkInput.value = '';
  closePopup(popupAddCard);
}

popupAddCard.addEventListener('submit', createCard); // обработчик добавления карточки



/* необязательное задание
// функция закрытия всех попапов по клавише Escape
function closePopupOnEsc(e) {
  if (e.code === 'Escape') {
    console.log('Нажали на кнопку Esc');
    closePopup(namePopup);
  }
}*/

/* необязательное задание
// слушатель закрытия попапа редактирования профиля по клику вне области формы
popupEditProfile.addEventListener('click', function(e) {
  if (e.target === e.currentTarget) {
    closePopup();
    console.log('клик вне области формы');
  }
});
*/
