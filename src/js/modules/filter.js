function filter() {
  // Находим родитель табов
  const tabParent = document.querySelector('.portfolio-menu');
  // Находим табы
  const tabItems = tabParent.querySelectorAll('li');
  // Находим родитель фотографий
  const contentWrapper = document.querySelector('.portfolio-wrapper');
  // Находим сами фото
  const contentItems = contentWrapper.querySelectorAll('div');
  // // Находим блок с контентом вместо фото
  const no = document.querySelector('.portfolio-no');

  // Собираем в массив классы фильтрации (у кнопок и контента класс один)
  const classesArr = [
    '.all',
    '.lovers',
    '.chef',
    '.girl',
    '.guy',
    '.grandmother',
    '.granddad',
  ];

  // Функция для показа нужного контента
  // Как аргумент будем передавать в нее элемент контента
  function typeFilter(markType) {
    // Скрываем весь контент
    contentItems.forEach((item) => {
      item.style.display = 'none';
      item.classList.remove('animated', 'fadeIn');
    });

    // Скрываем блок, который служит заглушкой
    no.style.display = 'none';
    no.classList.remove('animated', 'fadeIn');

    // Фильтрация
    // Если мы передали контент, и у нас есть подходящий таб - выводим этот контент на страницу
    if (markType) {
      markType.forEach((item) => {
        item.style.display = 'block';
        item.classList.add('animated', 'fadeIn');
      });
    } else {
      // Если контента для подходящего таба нет - выводим блок заглушку
      no.style.display = 'block';
      no.classList.add('animated', 'fadeIn');
    }
  }

  // Функция для переключения активного класса табов
  tabParent.addEventListener('click', (evt) => {
    let target = evt.target;
    if (target && target.tagName == 'LI') {
      tabItems.forEach((item) => {
        // Убираем активный класс у таба
        item.classList.remove('active');
        // Назначаем активный класс кликнутому табу
        target.classList.add('active');
      });
    }
  });

  // Функция - аптимизация для фильтра
  // Как аргумент передаем класс
  function getTabContent(className) {
    const trigger = tabParent.querySelector(className);
    const content = contentWrapper.querySelectorAll(className);
    trigger.addEventListener('click', () => {
      if (
        trigger.classList.contains('grandmother') ||
        trigger.classList.contains('granddad')
      ) {
        typeFilter();
      } else {
        typeFilter(content);
      }
    });
  }

  classesArr.forEach((el) => {
    getTabContent(el);
  });
}

export default filter;
