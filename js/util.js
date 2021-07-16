// Основной код функции скопирован из https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  if (min < 0 || max < 0) {
    return;
  }
  // Последняя строка функции обработала бы эту ситуацию правильно, но чтобы не выполнять много лишних действий сразу вернем результат
  if (max === min) {
    return min;
  }

  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloatInclusive(min, max, precision) {
  if (min < 0 || max < 0) {
    return;
  }

  if (max === min) {
    return min;
  }

  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
  }

  precision = Math.pow(10, precision);
  return Math.round((Math.random() * (max - min) + min) * precision) / precision;
}

function isEscEvent(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomIntInclusive, getRandomFloatInclusive, isEscEvent, debounce};
