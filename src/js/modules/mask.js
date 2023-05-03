function mask(selector) {
  // Функция для установки курсора
  let setCursorPosition = (pos, elem) => {
    elem.focus();

    // Устанавливаем выделение в input
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();

      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  function createMask(event) {
    // Матрица - ей мы руководствуемся при создадии маски
    let matrix = '+7 (___) ___ __ __';
    // Переменная итератор
    let i = 0;
    // Два значения
    // Статичное значение. Работает на основе матрицы. Получаем +7 при нажатии на input.
    let def = matrix.replace(/\D/g, '');
    // Динамичное значение. Работает на основе того, что ввел пользователь. Позволяет ему вводить только цифры
    let val = this.value.replace(/\D/g, '');

    // Если кол-во цифр, которые у нас остались в матрице после манипуляций def, больше или равно кол-ву цифр, которые в val, то это значение мы должны заменить на стандартное (то есть, пользователь не может удалить +7)
    if (def.length >= val.length) {
      val = def;
    }

    // Это то значение, которое ввел пользователь. Во внутрь, на основе матрицы, мы должны положить какое то значение, которое отобразим на стр.
    // Перебирам все символы в матрице. В матрице, есть ___ ___ __ __ и (). И когда пользователь будет заполнять эту матрицу, мы будем удалять ___ ___ __ __ при замене на опр. цифры, а () мы оставляем.
    // Нам нужно польностью пройтись по матрице, по каждому символу внутри, там где нужно - заменить на опр. value (на опр. значение, который ввел пользователь), а там где не нужно - оставить ().
    // Проходимся по всем символам внутри, и передаем callback-функцию, которая выполнится для каждого элемента, который будет найден
    this.value = matrix.replace(/./g, function (a) {
      // При помощи условий будем формировать строку, которую выведем пользователю
      // Функция возвращает символ
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ''
        : a;
    });

    // Вывод маски на страницу
    // blur
    // Если мы уводим мышку с инпута и там только +7, то маска пропадает
    if (event.type === 'blur') {
      if (this.value.length == 2) {
        this.value = '';
      }
    } else {
      // Если событие focus (нажали на инпут)
      setCursorPosition(this.value.length, this);
    }
  }

  let inputs = document.querySelectorAll(selector);

  inputs.forEach((input) => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
}
export default mask;
