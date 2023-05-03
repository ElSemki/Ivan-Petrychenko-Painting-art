function drop() {
  const fileInputs = document.querySelectorAll('[name="upload"]');

  // Массив событий связаный с drag & drop
  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    fileInputs.forEach((intup) => {
      intup.addEventListener(eventName, preventDefaults, false);
    });
  });

  // Функция отменяет действия по умолчанию при перетаскивании (drag & drop в input) объектов
  function preventDefaults(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  // Изменение интерфейса (подсветка) при перетягивании в dropArea
  function highlight(item) {
    // Обращаемся к родителю input
    item.closest('.file_upload').style.border = '5px solid yellow';
    item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7';
  }

  // Отмена изменений
  function unhighlight(item) {
    item.closest('.file_upload').style.border = 'none';
    if (item.closest('.calc_form')) {
      item.closest('.file_upload').style.backgroundColor = '#ffffff';
    } else {
      item.closest('.file_upload').style.backgroundColor = '#ededed';
    }
  }

  // Эти два события отвечают за перетягивание файла в dropArea, а также вызывают функцию highlight (перекрашивают родитель инпута при перетягивании в него файла)
  ['dragenter', 'dragover'].forEach((eventName) => {
    fileInputs.forEach((intup) => {
      intup.addEventListener(eventName, () => highlight(intup), false);
    });
  });

  // Эти два события отвечают за то, что мы бросаем файл в dropAper, а также вызывают unhighlight (убирают перекрашивание родителя инпута)
  ['dragleave', 'drop'].forEach((eventName) => {
    fileInputs.forEach((intup) => {
      intup.addEventListener(eventName, () => unhighlight(intup), false);
    });
  });

  fileInputs.forEach((input) => {
    // Скидываем файл в инпут (действия c самим инпутом)
    input.addEventListener('drop', (evt) => {
      // Файл который скидываем помещаем внутрь инпута
      input.files = evt.dataTransfer.files;
      let dots;
      // item.files - это файл, который загрузили в input
      // item.files[0].name - имя загруженного файла
      // Метод split разбивает строку на две части до указываемого символа (то есть - picture . jpg)
      // Переменная для разделения строки на две части
      const arr = input.files[0].name.split('.');
      // Проверяем длинну имени фото
      arr[0].length > 6 ? (dots = '...') : (dots = '.');
      const name = arr[0].slice(0, 6) + dots + arr[1];
      // Элемент, куда нужно вывести название файла - находится перед инпутом
      input.previousElementSibling.textContent = name;
    });
  });
}

export default drop;
