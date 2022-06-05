let profileEditButton = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');

let nameInput = popup.querySelector('.popup__name-input');
let jobInput = popup.querySelector('.popup__job-input');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

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
