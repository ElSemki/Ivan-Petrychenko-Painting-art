import { postData } from '../services/services';

function forms(formSelector, state) {
  const forms = document.querySelectorAll(formSelector);
  const upload = document.querySelectorAll('[name="upload"]');

  const message = {
    loading: 'Идет загрузка...',
    success: 'Спасибо, мы скоро свяжемся с вами',
    failure: 'Что-то пошло не так!',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png',
  };

  // Пути, по которым мы будем отправлять наши данные (Данный с формы где мы отправляем фото - идет на один адрес. Данные с формы где мы не отправляем фото - идет на другой адрес)
  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php',
  };

  // Выводим в верстку, где в форме написано "Файл не выбран", около загрузки фото, название загружаемого фото
  // upload - импуты для загрузки файлов
  upload.forEach((item) => {
    item.addEventListener('input', () => {
      // Переменная для кол-ва точек
      let dots;
      // item.files - это файл, который загрузили в input
      // item.files[0].name - имя загруженного файла
      // Метод split разбивает строку на две части до указываемого символа (то есть - picture . jpg)
      // Переменная для разделения строки на две части
      const arr = item.files[0].name.split('.');
      // Проверяем длинну имени фото
      arr[0].length > 6 ? (dots = '...') : (dots = '.');
      const name = arr[0].slice(0, 6) + dots + arr[1];
      // Элемент, куда нужно вывести название файла - находится перед инпутом
      item.previousElementSibling.textContent = name;
    });
  });

  forms.forEach((form) => {
    bindPostData(form);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      // Добавляем оповещение в родителя формы
      form.parentNode.append(statusMessage);

      // Скрываем форму, что бы показать статус отправка ^
      // Скрываем при помощи классов из animated.css и убираем со страницы
      form.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        form.style.display = 'none';
      }, 400);

      // Создаем элемент, в котором будет находится фото со статусом отправки
      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.append(statusImg);

      // Текстовое оповещение отправки
      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.append(textMessage);

      const formData = new FormData(form);

      if (form.getAttribute('data-calc') === 'end') {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      // Переменная, для динамического формирования пути APi, куда мы будем все данные с формы
      let api;
      // Ищет блок, который у данного элемента выше по иерархии (грубо говоря родителя, в котором находится форма), или если это форма, у которой класс calc_form
      form.closest('.popup-design') || form.classList.contains('calc_form')
        ? (api = path.designer)
        : (api = path.question);
      console.log(api);

      postData(api, formData)
        .then((data) => {
          console.log(data);
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          setTimeout(() => {
            statusMessage.remove();
            // Возвращаем форму обратно
            form.style.display = 'block';
            form.classList.remove('fadeOutUp');
            form.classList.add('fadeInUp');
          }, 3000);
          clearInputs(upload);
          closeFormParent('[data-modal]');
          if (form.getAttribute('data-calc') === 'end') {
            clearDataObj(state);
          }
          form.reset();
        });
    });
  }

  function closeFormParent(parentFormSelector) {
    const modals = document.querySelectorAll(parentFormSelector);
    modals.forEach((modal) => {
      const modalStyles = window.getComputedStyle(modal);
      if (modalStyles.display === 'block') {
        setTimeout(() => {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }, 5000);
      }
    });
  }

  // Функция для очистки textContent inputFile
  function clearInputs(inputFileSelect) {
    const inputs = inputFileSelect;
    inputs.forEach((input) => {
      input.previousElementSibling.textContent = 'Файл не выбран';
    });
  }

  function clearDataObj(obj) {
    Object.keys(obj).forEach((k) => delete obj[k]);
  }
}

export default forms;
