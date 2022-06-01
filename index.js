const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

function closePopupOnQ(e) {
  if (e.code === 'KeyQ') {
    closePopup();
  }
  console.log(1);
}

function openPopup() {
  popup.classList.remove('popup_hidden');
  document.addEventListener('keypress', closePopupOnQ);
}

function closePopup() {
  popup.classList.add('popup_hidden');
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

document.addEventListener('keypress', function(e) {

})
