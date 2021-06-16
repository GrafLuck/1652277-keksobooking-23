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

export {getRandomIntInclusive, getRandomFloatInclusive};
