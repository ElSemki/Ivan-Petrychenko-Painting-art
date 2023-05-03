import { getResource } from '../services/services';

// function showMoreStyles(buttonSelector, parentSelector) {
//   const button = document.querySelector(buttonSelector);

//   function creaeteCard(data) {
//     data.forEach(({ src, title, link }) => {
//       const card = document.createElement('div');
//       card.classList.add(
//         'col-sm-3',
//         'col-sm-offset-0',
//         'col-xs-10',
//         'col-xs-offset-1',
//         'animated',
//         'fadeInUp'
//       );
//       card.innerHTML = `
//         <div class=styles-block>
//         <img src=${src} alt>
//         <h4>${title}</h4>
//         <a href=${link}>Подробнее</a>
//       </div>
//           `;
//       document.querySelector(parentSelector).append(card);
//     });
//   }

//   button.addEventListener('click', () => {
//     getResource('http://localhost:3000/styles')
//       .then((data) => creaeteCard(data))
//       .catch((error) => console.log(error));
//     button.remove();
//   });
// }
function showMoreStyles(buttonSelector) {
  const button = document.querySelector(buttonSelector);
  class styleCard {
    constructor(src, title, link, parentSelector, ...classes) {
      this.src = src;
      this.title = title;
      this.link = link;
      this.parentSelector = document.querySelector(parentSelector);
      this.classes = classes;
    }

    render() {
      const card = document.createElement('div');
      this.classes.forEach((className) => card.classList.add(className));
      card.innerHTML = `
              <div class=styles-block>
              <img src=${this.src} alt>
              <h4>${this.title}</h4>
              <a href=${this.link}>Подробнее</a>
            </div>
                `;
      this.parentSelector.append(card);
    }
  }

  button.addEventListener('click', () => {
    getResource('http://localhost:3000/styles')
      .then((data) => {
        data.forEach(({ src, title, link }) => {
          new styleCard(
            src,
            title,
            link,
            '.styles .row',
            'col-sm-3',
            'col-sm-offset-0',
            'col-xs-10',
            'col-xs-offset-1',
            'animated',
            'fadeInUp'
          ).render();
        });
      })
      .catch((error) => console.log(error));
    button.remove();
  });
}
export default showMoreStyles;
