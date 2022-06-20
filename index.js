// Сергей Криворучко - ты супер! Накидал много дельных советов и очень подробно всё объяснил.
// Я не всё понял как исправить. Про замыкания статья показалась сложной.
// и с закрытием по Escape не вышло. Просто нужно подробней углубиться.
// Спасибо большое за такой разбор! Это лучший разбор моей практической работы!

// редактирования профиля
const profileEditButton = document.querySelector('.profile__button_type_edit'); // кнопка открытия редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); // селектор попапа редактирования профиля

const nameInput = popupEditProfile.querySelector('.popup__input_type_name'); // поле ввода имени в профиле
const jobInput = popupEditProfile.querySelector('.popup__input_type_job'); // поле ввода доп. информации в профиле

const profileName = document.querySelector('.profile__title'); // отображаемое в разметке имя профиля
const profileJob = document.querySelector('.profile__subtitle'); // отображаемая в разметке доп. информация

// добавления карточки
const profileAddButton = document.querySelector('.profile__button_type_add'); // кнопка открытия добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card'); // селектор попапа добавления карточки

const titleInput = popupAddCard.querySelector('.popup__input_type_title'); // поле ввода заголовка карточки
const linkInput = popupAddCard.querySelector('.popup__input_type_link'); // поле ввода ссылки на картинку

const cardTitle = document.querySelector('.card__title'); // отображаемое в карточке название
const cardImage = document.querySelector('.card__image'); // отображаемая в карточке картинка

const placesContainer = document.querySelector('.places__container'); // тег ul внутрь которого вставляются шаблонные li
const cardTemplate = document.querySelector('#card-template').content; // поиск шаблона для карточки

// открытие картинки
const popupOpenImg = document.querySelector('.popup_type_img'); // селектор попапа открытия картинки
const popupImage = document.querySelector('.popup__image'); // картинка в попапе
const popupCaption = document.querySelector('.popup__caption'); // подпись к картинке в попапе

// ------------функции---------------------------------------------------------
function openPopup(namePopup) { // ф-я открытия всех попапов
  namePopup.classList.add('popup_opened');
  // document.addEventListener('keyup', closePopupOnEsc); // событие закрытия по Escape
}

function closePopup(namePopup) { // ф-я закрытия всех попапов
  namePopup.classList.remove('popup_opened');
  // document.removeEventListener('keyup', closePopupOnEsc); // событие закрытия по Escape
}

//функция закрытия всех попапов по клавише Escape
// function closePopupOnEsc(e) {
//   if (e.key === 'Escape') {
//     console.log(`Нажали на кнопку ${e.key}`);
//     document.getElementsByClassName('popup').classList.remove('popup_opened'); // пока не понял ка кэто сделать
//   }
// }

//
// ------------редактирование профиля---------------------------------------------------------
//
function handleProfileFormSubmit(e) { // ф-я отправки данных редактирования профиля на страницу
  e.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value; // передаем новые значения в форму
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

popupEditProfile.addEventListener('submit', handleProfileFormSubmit); // событие отправки введенных данных редактирования профиля на страницу

profileEditButton.addEventListener('click', function() { // событие открытия редактирования профиля
  nameInput.value = profileName.textContent; // выводим что было написано ранее
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
});

//
// ------------добавление карточки---------------------------------------------------------
//
function createCard(name, link) { // ф-я создания новой карточки
  const newElement = cardTemplate.cloneNode(true); // клонирование содержимого шаблона
  const cardTitle = newElement.querySelector('.card__title');
  const cardImage = newElement.querySelector('.card__image');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  newElement.querySelector('.card__button-like').addEventListener('click', (event) => {  // переключатель лайка
    event.target.classList.toggle('card__button-like_active');
  });
  newElement.querySelector('.card__button-delete').addEventListener('click', (event) => { // удаляем карточку
    event.target.closest('.places__element').remove();
  });
  cardImage.addEventListener('click', () => {  // открытие картинки
    renderImg(name, link);
    openPopup(popupOpenImg);
});
  return newElement;
}

function addCard(name, link) { // ф-я добавления новой карточки
  const card = createCard(name, link);
  placesContainer.prepend(card); // добавляем в контейнер
}

function renderInitCards() {
  initialCards.forEach((item) => { // добавление первых 6 карточек
    addCard(item.name, item.link)
    });
}

renderInitCards(); // вызов отрисовки первых 6 карточек

function hundleAddCardSubmit(event) {
  event.preventDefault(); // предотвращаем отправку события
  addCard(titleInput.value, linkInput.value); // вызов ф-ии
  closePopup(popupAddCard);
  event.target.reset(); // очищаем поля формы
}

popupAddCard.addEventListener('submit', hundleAddCardSubmit); // событие добавления карточки

profileAddButton.addEventListener('click', function() { // событие открытия добавления карточки
  openPopup(popupAddCard);
});

//
// ------------открытие картинки---------------------------------------------------------
//
function renderImg(name, link) { // ф-я отрисовки увеличенного изображения
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

document.querySelectorAll('.popup').forEach( popup => { // ф-я закрытия всех модалок по клику вне окна или по Х
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    };
  });
});
