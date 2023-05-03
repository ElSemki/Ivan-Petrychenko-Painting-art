function sliders(slides, dir, interval, prev, next) {
  const items = document.querySelectorAll(slides);
  let slideCurrentIndex = 1;
  // Переменная с автоматическим интервалом переключения слайдов
  let paused = false;

  function showSlides(n) {
    if (n > items.length) {
      slideCurrentIndex = 1;
    }

    if (n < 1) {
      slideCurrentIndex = items.length;
    }

    items.forEach((item) => {
      item.classList.add('animated');
      item.style.display = 'none';
    });

    items[slideCurrentIndex - 1].style.display = 'block';
  }

  showSlides(slideCurrentIndex);

  function plusSlideIndex(n) {
    showSlides((slideCurrentIndex += n));
  }

  // Так как у нас в одном слайдере нет кнопок переключения - при вызове функции sliders() мы не будем передавать аргументы кнопок. И что бы функция вызвалась без ошибок - используем блок try{}catch(){}. Туда мы передаем кнопки, которые есть в другом слайдере. Эти кнопки мы будем передавать как аргумент в вызов функции sliders(), которая будет отвечать за слайдер С КНОПКАМИ.
  try {
    const prevSlideBtn = document.querySelector(prev);
    const nextSlideBtn = document.querySelector(next);

    prevSlideBtn.addEventListener('click', () => {
      plusSlideIndex(-1);
      // Добавляем классы при переключении слайдера из библиотека animations.css
      items[slideCurrentIndex - 1].classList.remove('slideInLeft');
      items[slideCurrentIndex - 1].classList.add('slideInRight');
    });

    nextSlideBtn.addEventListener('click', () => {
      plusSlideIndex(1);
      // Добавляем классы при переключении слайдера из библиотека animations.css
      items[slideCurrentIndex - 1].classList.remove('slideInRight');
      items[slideCurrentIndex - 1].classList.add('slideInLeft');
    });
  } catch (e) {}

  // Функция для автоматикечкого переключения слайдов
  function activateAnimation() {
    // Если слайды необходимо переключать автоматически вертикально
    if (dir === 'vertical') {
      paused = setInterval(() => {
        plusSlideIndex(1);
        items[slideCurrentIndex - 1].classList.add('slideInDown');
      }, interval);
    } else {
      // Если слайды необходимо переключать автоматически горизонтально
      paused = setInterval(() => {
        plusSlideIndex(1);
        items[slideCurrentIndex - 1].classList.remove('slideInRight');
        items[slideCurrentIndex - 1].classList.add('slideInLeft');
      }, interval);
    }
  }
  activateAnimation();

  // Обрашаемся к родителю слайдов

  // Если пользователь навел мышкой на слайдер или на элемент слайдера - то автоматическое переключение слайдов останавливается
  items[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused);
  });

  // Если пользователь убрал мышку со слайдера или с его элементов - то автоматическое переключение слайдов включается
  items[0].parentNode.addEventListener('mouseleave', () => {
    activateAnimation();
  });

  // ^ Два последних пункта нужны для того, что бы во время взаимодействия пользователя со слайдом, слайды автоматически не переключались
}
export default sliders;
