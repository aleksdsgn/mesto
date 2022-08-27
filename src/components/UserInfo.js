// отображение информации о пользователе на странице
export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  // метод возвращает объект с данными пользователя.
  // данные пользователя подставляются в форму при открытии.
  getUserInfo() {
    const userInfoData = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      id: this.id,
      avatar: this._avatar,
    };
    return userInfoData;
  }

  // принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
    this.id = _id;
  }
}
