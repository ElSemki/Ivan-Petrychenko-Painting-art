const modalTimerId = setTimeout(
  () => openModal('.popup-consultation', modalTimerId),
  60000
);

function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function modals(triggerSelector, modalSelector, destroy = false) {
  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);
  // Собираем в коллекцию все модальные окна при помощи data-атрибута
  const popups = document.querySelectorAll('[data-modal]');

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      if (evt.target) {
        evt.preventDefault();
      }

      // Закрываем всех родителей всплывающих форм перед открытием новой
      popups.forEach((popup) => {
        popup.style.display = 'none';
        // Анимация при помощи библиотеки animation.css
        popup.classList.add('animated', 'fadeIn');
      });

      // Если пользователь кликнул на кнопку, у которой аргумент destroy - true - она удаляется со стр
      if (destroy) {
        btn.remove();
      }

      openModal(modalSelector);
    });
  });

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal || evt.target.className === 'popup-close') {
      // Закрываем все модальные окна перед открытием нового
      popups.forEach((popup) => {
        popup.style.display = 'none';
      });

      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape' && modal.style.display === 'block') {
      // Закрываем все модальные окна перед открытием нового
      popups.forEach((popup) => {
        popup.style.display = 'none';
      });
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    let giftImg = document.querySelector('.fixed-gift');
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1 &&
      giftImg
    ) {
      // Если пользователь долистал страницу до конца и не кликнул на подарок - откроется модальное окно и подарок удалится
      giftImg.remove();
      openModal('.popup-gift');
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
}

export default modals;
