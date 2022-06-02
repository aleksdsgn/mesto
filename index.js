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

let nameInput = popup.querySelector('.popup__name-input');
let jobInput = popup.querySelector('.popup__job-input');
// let profileName = document.getElementsByClassName('profile__title').textContent;
let profileJob = document.getElementsByClassName('profile__subtitle');
let profileName = document.querySelector('.profile__title');

// console.log(nameInput.value);
// console.log(jobInput);
console.log(profileName.textContent);
// console.log(profileName);

// console.log(profileJob);

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popup.addEventListener('submit', formSubmitHandler);
