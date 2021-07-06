import {getDefaultCoordinate, resetCoordinateMarker} from './map.js';
import { isEscEvent } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const ROOMS_TO_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const IMAGE_FILE_TYPES = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];

const INDEX_DEFAULT_TYPE = 1;

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const addressInput = adForm.querySelector('#address');
const typeSelect = adForm.querySelector('#type');
const typeSelectOptions = typeSelect.querySelectorAll('option');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const optionTimeIn = timeIn.querySelectorAll('option');
const optionTimeOut = timeOut.querySelectorAll('option');

function validFileType(file) {
  return IMAGE_FILE_TYPES.includes(file.type);
}

function initialFormToDefaultValue(mainMarker) {

  titleInput.value = '';

  priceInput.value = '';
  priceInput.placeholder = 1000;
  priceInput.min = 1000;

  typeSelectOptions[INDEX_DEFAULT_TYPE].selected = true;

  optionTimeIn[0].selected = true;
  optionTimeOut[0].selected = true;

  // resetCoordinateMarker(mainMarker);
}

function fillAddress(coordinate) {
  addressInput.value = ` ${ coordinate.lat.toFixed(5) }, ${ coordinate.lng.toFixed(5) }`;
}

function deactivateForm() {
  adForm.classList.add('ad-form--disabled');
  const fieldsetsForm = adForm.querySelectorAll('fieldset');
  fieldsetsForm.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('map__filters--disabled');
  const mapFilterSelects = mapFilters.querySelectorAll('select');
  const mapFilterFieldset = mapFilters.querySelector('fieldset');
  mapFilterSelects.forEach((select) => {
    select.disabled = true;
  });
  mapFilterFieldset.disabled = true;
}

function activateForm() {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  const fieldsetsForm = adForm.querySelectorAll('fieldset');
  fieldsetsForm.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');
  const mapFilterSelects = mapFilters.querySelectorAll('select');
  const mapFilterFieldset = mapFilters.querySelector('fieldset');
  mapFilterSelects.forEach((select) => {
    select.disabled = false;
  });
  mapFilterFieldset.disabled = false;

  const defaultCoordinate = getDefaultCoordinate();
  fillAddress(defaultCoordinate);
  initialCapacitySelectForm();
}

function validateTitle() {
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
  priceInput.addEventListener('input', () => {
    const value = priceInput.value;
    if (!isFinite(value) || value > MAX_PRICE_VALUE) {
      priceInput.setCustomValidity(`В поле требуется ввести число до ${ MAX_PRICE_VALUE }`);
    } else if (value < priceInput.min) {
      priceInput.setCustomValidity(`Цена должна быть не меньше ${ priceInput.min }`);
    } else {
      priceInput.setCustomValidity('');
    }
    priceInput.reportValidity();
  });

}

function validateType() {
  const typeSelectOptions = typeSelect.querySelectorAll('option');
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

function validateRoomsAndCapacity() {
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

  capacitySelect.addEventListener('change', () => {
    const roomNumberSelectIndex = roomNumberSelect.selectedIndex;
    const roomNumberSelectOptionValue = Number.parseInt(roomNumberSelectOptions[roomNumberSelectIndex].value, 10);
    const capacityArray = ROOMS_TO_CAPACITY[roomNumberSelectOptionValue];

    if (capacityArray.indexOf(Number.parseInt(capacitySelect.selectedOptions[0].value, 10)) === -1) {
      capacitySelect.setCustomValidity('Недопустимое число гостей');
    } else {
      capacitySelect.setCustomValidity('');
    }
    capacitySelect.reportValidity();
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

function initialCapacitySelectForm() {
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

function validateForm() {
  validateTitle();
  validatePrice();
  validateType();
  validateRoomsAndCapacity();
  validateTime();
}

function validateTypeFile() {
  const imagesInput = document.querySelector('#images');
  const avatarInput = document.querySelector('#avatar');
  const fileImage = imagesInput.files[0];
  const avatarImage = avatarInput.files[0];
  if (!validFileType(fileImage) || !validFileType(avatarImage)) {
    return false;
  }
  return true;
}

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);

const body = document.querySelector('body');

function onSuccess() {
  openSuccessMessage();
  initialFormToDefaultValue();
}

function onFail() {
  openErrorMessage();
}

function openSuccessMessage() {
  body.append(successMessage);
  window.addEventListener('click', onSuccessMessageClick);
  window.addEventListener('keydown', onSuccessMessageEscKeydown);
}

function openErrorMessage() {
  body.append(errorMessage);
  window.addEventListener('click', onErrorMessageClick);
  window.addEventListener('keydown', onErrorMessageEscKeydown);
}

function closeSuccessMessage() {
  window.removeEventListener('click', onSuccessMessageClick);
  window.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

function closeErrorMessage() {
  window.removeEventListener('click', onErrorMessageClick);
  window.removeEventListener('keydown', onErrorMessageEscKeydown);
}

function onSuccessMessageClick() {
  successMessage.remove();
  closeSuccessMessage();
}

function onErrorMessageClick() {
  errorMessage.remove();
  closeErrorMessage();
}

function onSuccessMessageEscKeydown(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    successMessage.remove();
  }
}

function onErrorMessageEscKeydown(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    errorMessage.remove();
  }
}

export {onSuccess, onFail};
export {deactivateForm, activateForm, fillAddress, initialFormToDefaultValue};
export {validateForm};
