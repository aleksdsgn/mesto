const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

function closePopupOnQ(e) {
  if (e.code === 'KeyQ') {
    closePopup();
  }
}

function openPopup() {
  popup.classList.add('popup_opened');
  document.addEventListener('keypress', closePopupOnQ);
}

function closePopup() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keypress', closePopupOnQ);
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
