function scrolling(upSelector) {
  // Реализация показа на страницу кнопки со стрелкой вверх
  const upElem = document.querySelector(upSelector);
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 1650) {
      upElem.classList.add('animated', 'fadeIn');
      upElem.classList.remove('fadeOut');
    } else {
      upElem.classList.add('fadeOut');
      upElem.classList.remove('fadeIn');
    }
  });

  // Реализация плавного скролла
  // ВАРИАНТ 1 (Чисто на JS)
  // const element = document.documentElement;
  // const body = document.body;

  // // Функция, которая занимается подсчетом того, сколько нужно пролистать и как это сделать
  // function calcScroll() {
  //   upElem.addEventListener('click', function (evt) {
  //     // Какое расстояние было пролистано сверху
  //     let scrollTop = Math.round(body.scrollTop || element.scrollTop);

  //     // Когда мы кликаем на ссылки(локальные)/кнопки, которые отвечают за навигацию по нашем сайту, у нас в строке поиска появляется #(хеш).
  //     if (this.hash !== '') {
  //       // Если хеш не пустой - то запускаем preventDefault (то есть, если мы действительно кликнули по локальной ссылке)
  //       // Мы отменяем у ссылки действие по умолчанию
  //       evt.preventDefault();
  //       // Получаем тот элемент, к которому будем скроллить
  //       let hashElement = document.querySelector(this.hash);
  //       // Сколько еще нужно пролистать пикселей до родителя хеш элемента
  //       let hashElementTop = 0;

  //       // Вычисляем hashElementTop
  //       // offsetParent - тот элемент, относительно которого будет позиционироваться hashElement
  //       // Пока он будет существовать - будем запускать цикл
  //       while (hashElement.offsetParent) {
  //         // offsetTop - позволяет определить, сколько пикселей осталось до верхней границы родительского элемента от хеш элемента
  //         hashElementTop += hashElement.offsetTop;
  //         // Перебираем всех родителей, торорые могут быть основой для позиционирования данного элемента
  //         hashElement = hashElement.offsetParent;
  //       }

  //       hashElementTop = Math.round(hashElementTop);
  //       // Теперь мы узнали все значения для запуска плавного скролла ^^^ (scrollTop, hashElementTop, this.hash)
  //       smoothScroll(scrollTop, hashElementTop, this.hash);
  //     }
  //   });
  // }

  // function smoothScroll(from, to, hash) {
  //   // То значение, через которое будет производиться анимация
  //   let timeInterval = 1;
  //   let prevScrollTop;
  //   let speed;

  //   // Определяемся, в какую сторону будем листать (вверх или вниз)
  //   if (to > from) {
  //     // Сверху вниз
  //     speed = 30;
  //   } else {
  //     // Снизу вверх
  //     speed = -30;
  //   }

  //   // Создаем анимацию
  //   // Идентификатор интервала
  //   let move = setInterval(function () {
  //     // Эта функция отвечает за анимацию
  //     let scrollTop = Math.round(body.scrollTop || element.scrollTop);
  //     if (
  //       prevScrollTop === scrollTop ||
  //       (to > from && scrollTop >= to) ||
  //       (to < from && scrollTop <= to)
  //     ) {
  //       clearInterval(move);
  //       history.replaceState(
  //         history.state,
  //         document.title,
  //         location.href.replace(/#.*$/g, '')
  //       ) + hash;
  //     } else {
  //       // Страничка будет двигаться с той скоростью, которую мы задали (speed)
  //       body.scrollTop += speed;
  //       element.scrollTop += speed;
  //       prevScrollTop = scrollTop;
  //     }
  //   }, timeInterval);
  // }
  // calcScroll();

  // Второй вариант
  // Scrolling при помощи requestAnimationFrame

  // Получаем ссылки
  // Ищем все ссылки, которые начинаются с #
  let links = document.querySelectorAll('[href^="#"]');
  let speed = 0.3;

  links.forEach((link) => {
    link.addEventListener('click', function (evt) {
      evt.preventDefault();

      // Какое расстояние было пролистано сверху
      let widthTop = document.documentElement.scrollTop;
      let hash = this.hash;
      // Верхняя граница элемента, к которому будем скроллить
      let toBlock = document.querySelector(hash).getBoundingClientRect().top;
      let start = null;

      requestAnimationFrame(step);

      function step(time) {
        // Узнаем, первый ли раз запускается эта анимация
        if (start === null) {
          start = time;
        }

        let progress = time - start;
        // Кол-во пикселей, которые нам необходимо пролистать в течении этой анимации
        // На сколько пикселей необходимо продвинуть нашу анимацию и в какую сторону (вверх или вниз)
        let r =
          toBlock < 0
            ? Math.max(widthTop - progress / speed, widthTop + toBlock)
            : Math.min(widthTop + progress / speed, widthTop + toBlock);

        document.documentElement.scrollTo(0, r);

        if (r !== widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });
}

export default scrolling;
