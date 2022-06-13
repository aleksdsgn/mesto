let profileEditButton = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');

let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

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


function closePopupOnQ(e) {
  if (e.code === 'Escape') {
    closePopup();
  }
}

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  document.addEventListener('keyup', closePopupOnQ);
}

function closePopup() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupOnQ);
}

profileEditButton.addEventListener('click', function() {
  openPopup()
});

popupCloseButton.addEventListener('click', function() {
  closePopup()
});

popup.addEventListener('click', function(e) {
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

popup.addEventListener('submit', formSubmitHandler);

// функция добавления первых 6 карточек
initialCards.forEach(function (item) {
  const cardTemplate = document.querySelector('#card-template').content; // поиск шаблона для карточки
  const placesElement = cardTemplate.cloneNode(true); // клонирование содержимого шаблона

  placesElement.querySelector('.card__title').textContent = item.name;
  placesElement.querySelector('.card__image').src = item.link;
  placesElement.querySelector('.card__image').alt = item.name;

  placesContainer.append(placesElement)
});
