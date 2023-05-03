// Первый способ при помощи css стилей
// function accordion(triggersSelector, contentsSelector) {
//   const buttons = document.querySelectorAll(triggersSelector);
//   const contentBlocks = document.querySelectorAll(contentsSelector);

//   // Даем класс с анимациями блокам с контентом
//   contentBlocks.forEach((block) => {
//     block.classList.add('animated', 'fadeInDown');
//   });

//   buttons.forEach((button) => {
//     button.addEventListener('click', function () {
//       // Проверим, является ли тот элемент, на который нажали - активным
//       if (!this.classList.contains('active')) {
//         buttons.forEach((button) => {
//           // Контент показывается при помощи класса active-style (смотреть main.css)
//           button.classList.remove('active', 'active-style');
//         });
//         this.classList.add('active', 'active-style');
//       }
//     });
//   });
// }

// Второй вариант - при помощи JS анимаций
// Логика построена на изменении ширины контентных блоков
function accordion(triggersSelector) {
  const buttons = document.querySelectorAll(triggersSelector);

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      // Для подсветки выбранного загодовка у нас есть класс active-style
      this.classList.toggle('active-style');
      // В первом варианте использовался класс active на заголовках. Теперь, он будет использоватьна на контенте. Только переименуем его в active-content
      // Обратимся к следующему элементу после заголовка(контенту)
      this.nextElementSibling.classList.toggle('active-content');

      // Мы должны узнать: нам нужно показать контент при клике на заголовок или скрыть?
      if (this.classList.contains('active-style')) {
        // Даем контенту, который идет после кликнутого заголовка max-height (так как изначально она 0, см. main.css)
        // scrollHeight(высота контента в блоке + 80(внутренние padding))
        this.nextElementSibling.style.maxHeight =
          this.nextElementSibling.scrollHeight + 80 + 'px';
      } else {
        this.nextElementSibling.style.maxHeight = '0px';
      }
    });
  });
}

export default accordion;
