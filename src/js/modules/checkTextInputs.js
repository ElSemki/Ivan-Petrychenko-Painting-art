function checkTextInputs(selector) {
  const textInputs = document.querySelectorAll(selector);
  textInputs.forEach((input) => {
    input.addEventListener('keypress', function (evt) {
      // Разрешаем ввод только русских букв и цифр
      if (evt.key.match(/[^а-яё 0-9]/gi)) {
        evt.preventDefault();
      }
    });
    // Убираем всплывающие подсказки у input
    input.addEventListener('mouseenter', (evt) => {
      evt.target.setAttribute('autocomplete', 'off');
    });
  });
}

export default checkTextInputs;
