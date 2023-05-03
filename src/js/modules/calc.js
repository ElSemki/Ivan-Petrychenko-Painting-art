import { getResource } from '../services/services';

function calc(size, material, options, promocode, result, state) {
  const sizeBlock = document.querySelector(size);
  const materialBlock = document.querySelector(material);
  const optionsBlock = document.querySelector(options);
  const promocodeBlock = document.querySelector(promocode);
  const resultBlock = document.querySelector(result);

  let sum = 0;

  function calculatedTotal() {
    sum = Math.round(
      +sizeBlock.value * +materialBlock.value + +optionsBlock.value
    );

    if (sizeBlock.value == '' || materialBlock.value == '') {
      resultBlock.textContent = 'Пожалуйста, заполните все пункты!';
    } else if (promocodeBlock.value === 'IWANTPOPART') {
      resultBlock.textContent = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
    }
    state.sum = resultBlock.textContent;
    console.log(state);
  }

  // Получение значений value
  function getChangeInformation(event, input) {
    input.addEventListener(event, () => {
      switch (input.getAttribute('id')) {
        case 'material':
          materialBlock.value = input.value;
          break;
        case 'options':
          optionsBlock.value = input.value;
          break;
        case 'promocode':
          promocodeBlock.value = input.value;
          break;
      }
      calculatedTotal();
    });
  }

  // Получение цены с сервера
  function getPriceFromServer(data, block) {
    data.forEach((item) => {
      Object.values(item).forEach((element, index) => {
        block[index + 1].setAttribute('value', element);
      });
    });
  }

  sizeBlock.addEventListener('change', () => {
    getResource('http://localhost:3000/sizeArt').then((data) =>
      getPriceFromServer(data, sizeBlock)
    );
    calculatedTotal();
  });

  //  Если элемент <select></select> - его событие change
  getChangeInformation('change', materialBlock);
  getChangeInformation('change', optionsBlock);
  getChangeInformation('input', promocodeBlock);
}
export default calc;
