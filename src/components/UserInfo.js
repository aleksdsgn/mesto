// отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // метод возвращает объект с данными пользователя.
  // данные пользователя подставляются в форму при открытии.
  getUserInfo() {
    const userInfoData = {
      name: this._name.textContent,
      about: this._about.textContent,
      id: this.id,
      avatar: this._avatar
    };
    return userInfoData;
  }

  // принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, about, _id, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this.id = _id;
    this._avatar.src = avatar;
  }

  // принимает ссылку на аватар и добавляет ее на страницу
  // setUserAvatar({ avatar}) {
  //   this._avatar.src = avatar;
  // }
}
