// отвечает за отрисовку элементов на странице
export default class Section {
  // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
  // селектор контейнера, в который нужно добавлять созданные элементы.
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // метод отвечает за отрисовку всех элементов.
  // Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // принимает DOM-элемент и добавляет его в контейнер.
  addItem(domElement) {
    this._container.append(domElement);
  }

  // удаление элемента
  deleteItem(domElement) {
    domElement.remove();
  }
}
