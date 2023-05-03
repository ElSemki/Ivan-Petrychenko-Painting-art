function pictureSize(imgSelector) {
  // Получаем блоки, с которыми будем работать
  const blocks = document.querySelectorAll(imgSelector);

  function showImg(block) {
    // Ищем фото в блоке
    const img = block.querySelector('img');
    // Меняем атрибут src у img
    // image.png => image-1.png
    img.src = img.src.slice(0, -4) + '-1.png';
    // Ищем в блоке все параграфы и скрываем их (все, кроме <p></p> с классом sizes-hit)
    block.querySelectorAll('p:not(.sizes-hit)').forEach((p) => {
      p.style.display = 'none';
    });
  }

  function hideImg(block) {
    // Ищем фото в блоке
    const img = block.querySelector('img');
    // Меняем атрибут src у img
    // image-1.png => image.png
    img.src = img.src.slice(0, -6) + '.png';
    block.querySelectorAll('p:not(.sizes-hit)').forEach((p) => {
      p.style.display = 'block';
    });
  }
  // mouseover - когда мышка находится непосредственно над элементом
  blocks.forEach((block) => {
    block.addEventListener('mouseover', () => {
      showImg(block);
    });

    // mouseout - когда мышка вышла за пределы элемента
    block.addEventListener('mouseout', () => {
      hideImg(block);
    });
  });
}

export default pictureSize;
