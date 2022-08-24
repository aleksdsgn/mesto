import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector(".popup__image"); // картинка в попапе
    this._popupCaption = document.querySelector(".popup__caption"); // подпись к картинке в попапе
    super.setEventListeners();
  }

  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
  }
}
