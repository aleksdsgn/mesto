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
    };
    return userInfoData;
  }

  // принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }

  // принимает ссылку на аватар и добавляет их на страницу
  // setUserAvatar({ avatar}) {
  //   this._avatar.src = avatar;
  // }
}
