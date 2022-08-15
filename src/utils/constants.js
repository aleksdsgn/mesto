// ----------\/ редактирование профиля \/------------ //

// кнопка открытия попапа для редактирования профиля
export const buttonEditProfile = document.querySelector(
  ".profile__button_type_edit"
);

// сам попап редактирование профиля
export const popupEditProfile = ".popup_type_edit-profile";

// форма редактирования профиля
export const formEditProfile = document.forms.profile;

// селекторы отображаемых данных профиля
export const profileData = {
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar"
};

// селекторы инпутов в форме редактирования профиля
export const nameInput = document.querySelector(".popup__input_type_name");
export const aboutInput = document.querySelector(".popup__input_type_about");

// ----------\/ добавление новой карточки \/------------ //

// кнопка открытия попапа для добавления новой карточки
export const buttonAddCard = document.querySelector(
  ".profile__button_type_add"
);

// сам попап добавление карточки
export const popupAddCard = ".popup_type_add-card";

// форма добавления карточки
export const formAddCard = document.forms.place;

// контейнер для шаблонов карточек
export const cardsContainer = ".places__container";

// ----------\/ открытая карточка \/------------ //

// попап увеличенной картинки
export const popupOpenImage = ".popup_type_img";


// ----------\/ прочее \/------------ //

// попап подтвержения удаления
export const popupDeleteCard = ".popup_type_delete-card";
