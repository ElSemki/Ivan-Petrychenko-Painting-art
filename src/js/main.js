import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import filter from './modules/filter';
import pictureSize from './modules/pictureSize';
import accordion from './modules/accordion';
import burger from './modules/burger';
import scrolling from './modules/scrolling';
import drop from './modules/drop';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let calcPrice = {};

  modals('.button-design', '.popup-design');
  modals('.button-consultation', '.popup-consultation');
  modals('.fixed-gift', '.popup-gift', true);
  sliders('.main-slider-item', 'vertical', 3000);
  sliders(
    '.feedback-slider-item',
    'horizontal',
    3000,
    '.main-prev-btn',
    '.main-next-btn'
  );
  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');
  showMoreStyles('.button-styles');
  calc(
    '#size',
    '#material',
    '#options',
    '#promocode',
    '.calc-price',
    calcPrice
  );
  forms('form', calcPrice);
  filter();
  pictureSize('.sizes-block');
  // accordion('.accordion-heading', '.accordion-block');
  accordion('.accordion-heading');
  burger('.burger-menu', '.burger');
  scrolling('.pageup');
  drop();
});
