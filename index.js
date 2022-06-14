// попап редактирования профиля
const profileEditButton = document.querySelector('.profile__button_type_edit'); // кнопка открытия редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); // селектор попапа редактирования профиля
const popupCloseButtonEditProfile = popupEditProfile.querySelector('.popup__close-button'); // кнопка закрытия попапа редактирования профиля
const nameInput = popupEditProfile.querySelector('.popup__input_type_name'); // поле ввода имени в профиле
const jobInput = popupEditProfile.querySelector('.popup__input_type_job'); // поле ввода доп. информации в профиле
const profileName = document.querySelector('.profile__title'); // отображаемое в разметке имя профиля
const profileJob = document.querySelector('.profile__subtitle'); // отображаемая в разметке доп. информация

// попап добавления карточки
const profileAddButton = document.querySelector('.profile__button_type_add'); // кнопка открытия добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card'); // селектор попапа добавления карточки
const popupCloseButtonAddCard = popupAddCard.querySelector('.popup__close-button'); // кнопка закрытия попапа добавления карточки

const placesContainer = document.querySelector('.places__container'); // тег ul внутрь которого вставляются шаблонные li

// массив первых шесть карточек которые появляются при загрузке страницы
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

// функция добавления первых 6 карточек
initialCards.forEach(function (item) {
  const cardTemplate = document.querySelector('#card-template').content; // поиск шаблона для карточки
  const placesElement = cardTemplate.cloneNode(true); // клонирование содержимого шаблона

  placesElement.querySelector('.card__title').textContent = item.name;
  placesElement.querySelector('.card__image').src = item.link;
  placesElement.querySelector('.card__image').alt = item.name;

  placesContainer.append(placesElement)
});

// ++ функция открытия всех попапов
function openPopup(namePopup) {
  namePopup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupOnEsc);
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
  console.log('Открыть попап');
}

// ++ слушатель на открытие попапа редактирования профиля
profileEditButton.addEventListener('click', function() {
  console.log('Нажали на кнопку редактирования профиля');
  openPopup(popupEditProfile);
});
// ++ слушатель на открытие попапа добавления карточки
profileAddButton.addEventListener('click', function() {
  console.log('Нажали на кнопку добавления карточки');
  openPopup(popupAddCard);
});



// функция закрытия всех попапов
function closePopup(namePopup) {
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupOnEsc);
  console.log('Закрыть попап');
}

// функция закрытия всех попапов по клавише Escape
function closePopupOnEsc(e) {
  if (e.code === 'Escape') {
    console.log('Нажали на кнопку Esc');
    closePopup();
  }
}

// функция закрытия попапа редактирования профиля по клавише Escape
// function closePopupOnEsc(e) {
//   if (e.code === 'Escape') {
//     console.log('Нажали на кнопку Esc из редактирования профиля');
//     closeEditPopup();
//   }
// }
// функция закрытия попапа добавления карточки по клавише Escape (объеденить с ^)
// function closePopupOnEsc(e) {
//   if (e.code === 'Escape') {
//     console.log('Нажали на кнопку Esc из добавления карточки');
//     closeAddPopup();
//   }
// }


// слушатель закрытия попапа редактирования профиля по кнопке закрытия
popupCloseButtonEditProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
  console.log('Нажали на кнопку Х редактирования профиля');
});
// слушатель закрытия попапа добавления карточки по кнопке закрытия
popupCloseButtonAddCard.addEventListener('click', function() {
  closePopup(popupAddCard);
  console.log('Нажали на кнопку Х добавления карточки');
});





// функция открытия попапа редактирования профиля
// function openEditPopup() {
//   popupEditProfile.classList.add('popup_opened');
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   document.addEventListener('keyup', closePopupOnEsc);
// }
// функция открытия попапа добавления карточки (объеденить с ^)
// function openAddPopup() {
//   popupAddCard.classList.add('popup_opened');

//   document.addEventListener('keyup', closePopupOnEsc);
// }








// слушатель закрытия попапа редактирования профиля по клику вне области формы
// popupEditProfile.addEventListener('click', function(e) {
//   if (e.target === e.currentTarget) {
//     closeEditPopup();
//   }
// });
// слушатель закрытия попапа добавления карточки по клику вне области формы
// popupAddCard.addEventListener('click', function(e) {
//   if (e.target === e.currentTarget) {
//     closeAddPopup();
//   }
// });


// функция отправки введенных данных попапа редактирования профиля на страницу
// function formSubmitHandler (evt) {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closeEditPopup();
// }

// отправка введенных данных попапа редактирования профиля на страницу
// popupEditProfile.addEventListener('submit', formSubmitHandler);


