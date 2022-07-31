// утилита, которая превращает относительный путь в абсолютный
const path = require('path'); // подключаем path к конфигу вебпак

// module.exports — это синтаксис экспорта в Node.js
module.exports = {
  entry: { main: './src/pages/index.js' },
  // Это итоговый файл, куда «Вебпак» сложит весь js-код
  output: {
    // путь к точке выхода
    path: path.resolve(__dirname, 'dist'),
    // имя файла, куда «Вебпак» положит код
    filename: 'main.js',
        // свойство для обновления путей внутри CSS- и HTML-файлов
        publicPath: ''
  }
}
