function burger(menuSelector, burgerSelector) {
  const menuElement = document.querySelector(menuSelector);
  const burgerElement = document.querySelector(burgerSelector);

  // Вручную скрываем меню
  menuElement.style.display = 'none';

  // Отслеживание действий с бургером
  burgerElement.addEventListener('click', () => {
    // Если меню скрыто и ширина экрана для вывода информации меньше 993
    if (menuElement.style.display == 'none' && window.screen.availWidth < 993) {
      // Покажем меню
      menuElement.style.display = 'block';
    } else {
      // Если меню открыто - скроем
      menuElement.style.display = 'none';
    }
  });

  // Если ширина экрана для вывода информации больше 992 - меню в бургере скрывается
  window.addEventListener('resize', () => {
    if (window.screen.availWidth > 992) {
      menuElement.style.display = 'none';
    }
  });
}

export default burger;
