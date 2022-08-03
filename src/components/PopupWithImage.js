import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector(".popup__image"); // картинка в попапе
    this._popupCaption = document.querySelector(".popup__caption"); // подпись к картинке в попапе
  }

  open(popup) {
    super.open();
    this._popupImage.src = popup.link;
    this._popupImage.alt = popup.name;
    this._popupCaption.textContent = popup.name;
  }
}
