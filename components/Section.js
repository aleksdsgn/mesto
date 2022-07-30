// отвечает за отрисовку элементов на странице
export default class Section {
  // Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
  // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
  // селектор контейнера, в который нужно добавлять созданные элементы.
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Содержит публичный метод, который отвечает за отрисовку всех элементов.
  // Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

  // Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}

// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
