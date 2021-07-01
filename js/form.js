const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const ROOMS_TO_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
}

function validateTitle() {
  const titleInput = document.querySelector('#title');
  titleInput.addEventListener('input', () => {
    const valueLength = titleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
    } else {
      titleInput.setCustomValidity('');
    }

    titleInput.reportValidity();
  });
}

function validatePrice() {
  const priceInput = document.querySelector('#price');
  priceInput.addEventListener('input', () => {
    const value = priceInput.value;
    if (!isFinite(value) || value > MAX_PRICE_VALUE) {
      priceInput.setCustomValidity(`В поле требуется ввести число до ${ MAX_PRICE_VALUE }`);
    } else if (value < price.min) {
      priceInput.setCustomValidity(`Цена должна быть не меньше ${ price.min }`);
    } else {
      priceInput.setCustomValidity('');
    }
    priceInput.reportValidity();
  });

}

function validateType() {
  const typeSelect = document.querySelector('#type');
  const typeSelectOptions = typeSelect.querySelectorAll('option');
  const priceInput = document.querySelector('#price');
  const priceValue = priceInput.value;
  typeSelect.addEventListener('change', () => {
    const typesSelectIndex = typeSelect.selectedIndex;
    const typeSelectOptionValue = typeSelectOptions[typesSelectIndex].value;
    switch (typeSelectOptionValue) {
      case 'bungalow':
        priceInput.placeholder = 0;
        priceInput.min = 0;
        break;
      case 'flat':
        priceInput.placeholder = 1000;
        priceInput.min = 1000;
        break;
      case 'hotel':
        priceInput.placeholder = 3000;
        priceInput.min = 3000;
        break;
      case 'house':
        priceInput.placeholder = 5000;
        priceInput.min = 5000;
        break;
      case 'palace':
        priceInput.placeholder = 10000;
        priceInput.min = 10000;
        break;
    }

    if (priceValue !== '' &&  priceValue < priceInput.min) {
      priceInput.setCustomValidity(`Цена должна быть не меньше ${ priceInput.min }`);
    } else {
      priceInput.setCustomValidity('');
    }

    priceInput.reportValidity();
  });
}

function validateRooms() {
  const roomNumberSelect = document.querySelector('#room_number');
  const roomNumberSelectOptions = roomNumberSelect.querySelectorAll('option');
  const capacitySelect = document.querySelector('#capacity');
  const capacitySelectOptions = capacitySelect.querySelectorAll('option');
  roomNumberSelect.addEventListener('change', () => {
    const roomNumberSelectIndex = roomNumberSelect.selectedIndex;
    const roomNumberSelectOptionValue = Number.parseInt(roomNumberSelectOptions[roomNumberSelectIndex].value, 10);
    const capacityArray = ROOMS_TO_CAPACITY[roomNumberSelectOptionValue];

    if (capacityArray.indexOf(Number.parseInt(capacitySelect.selectedOptions[0].value, 10)) === -1) {
      capacitySelect.setCustomValidity('Недопустимое число гостей');
    } else {
      capacitySelect.setCustomValidity('');
    }
    capacitySelect.reportValidity();

    capacitySelectOptions.forEach((capacity) => {
      if (capacityArray.indexOf(Number.parseInt(capacity.value, 10)) === -1) {
        capacity.hidden = true;
      } else {
        capacity.hidden = false;
      }
    });
  });
}

function validateTime() {
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');
  const optionTimeIn = timeIn.querySelectorAll('option');
  const optionTimeOut = timeOut.querySelectorAll('option');
  timeIn.addEventListener('change', () => {
    const timeInIndex = timeIn.selectedIndex;
    optionTimeOut[timeInIndex].selected = true;
  });

  timeOut.addEventListener('change', () => {
    const timeOutIndex = timeOut.selectedIndex;
    optionTimeIn[timeOutIndex].selected = true;
  });
}

function validateForm() {
  document.addEventListener('DOMContentLoaded', onLoadPage());
  document.removeEventListener('DOMContentLoaded', onLoadPage());
}

function onLoadPage() {
  const roomNumberSelect = document.querySelector('#room_number');
  const roomNumberValue = Number.parseInt(roomNumberSelect.selectedOptions[0].value, 10);
  const capacityArray = ROOMS_TO_CAPACITY[roomNumberValue];
  const capacitySelect = document.querySelector('#capacity');
  const capacitySelectOptions = capacitySelect.querySelectorAll('option');

  capacitySelectOptions.forEach((capacity) => {
    if (capacityArray.indexOf(Number.parseInt(capacity.value, 10)) === -1) {
      capacity.hidden = true;
    } else {
      capacity.hidden = false;
    }
  });
}

export {validateForm, validateRooms, validateType, validateTime, validateTitle, validatePrice};
