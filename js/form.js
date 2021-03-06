import {getDefaultCoordinate, resetCoordinateMarker} from './map.js';
import { isEscEvent } from './util.js';
import { onSuccessGetData, onFailGetData, closePopupOnMap } from './map.js';
import { getData } from './network.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const ROOMS_TO_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MIN_PRICE_OF_TYPES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const IMAGE_FILE_TYPES = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
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
const roomNumberSelect = document.querySelector('#room_number');
const roomNumberSelectOptions = roomNumberSelect.querySelectorAll('option');
const capacitySelect = document.querySelector('#capacity');
const capacitySelectOptions = capacitySelect.querySelectorAll('option');
const imagesInput = document.querySelector('#images');
const avatarInput = document.querySelector('#avatar');
const descriptionTextarea = document.querySelector('#description');
const featuresCheckbox = document.querySelectorAll('.features__checkbox');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);
const errorButton = errorTemplate.querySelector('.error__button');

const body = document.querySelector('body');

const fileImageLabel = document.querySelector('.ad-form__drop-zone');
const avatarImageLabel = document.querySelector('.ad-form-header__drop-zone');

function onValidateTitle() {
  const valueLength = titleInput.value.length;
  let isValid = true;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`?????? ${  MIN_TITLE_LENGTH - valueLength } ????????.`);
    isValid = false;
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`?????????????? ???????????? ${  valueLength - MAX_TITLE_LENGTH } ????????.`);
    isValid = false;
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
  return isValid;
}

function onValidatePrice() {
  const value = Number.parseInt(priceInput.value, 10);
  let isValid = true;
  const minPrice = Number.parseInt(priceInput.min, 10);
  if (!isFinite(value) || value > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`?? ???????? ?????????????????? ???????????? ?????????? ???? ${ MAX_PRICE_VALUE }`);
    isValid = false;
  } else if (value < minPrice) {
    priceInput.setCustomValidity(`???????? ???????????? ???????? ???? ???????????? ${ minPrice }`);
    isValid = false;
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
  return isValid;
}

function onValidateType() {
  const typesSelectIndex = typeSelect.selectedIndex;
  const typeSelectOptionValue = typeSelectOptions[typesSelectIndex].value;
  const priceValue = priceInput.value;
  let isValid = true;
  switch (typeSelectOptionValue) {
    case 'bungalow':
      priceInput.placeholder = MIN_PRICE_OF_TYPES.bungalow;
      priceInput.min = MIN_PRICE_OF_TYPES.bungalow;
      break;
    case 'flat':
      priceInput.placeholder = MIN_PRICE_OF_TYPES.flat;
      priceInput.min = MIN_PRICE_OF_TYPES.flat;
      break;
    case 'hotel':
      priceInput.placeholder = MIN_PRICE_OF_TYPES.hotel;
      priceInput.min = MIN_PRICE_OF_TYPES.hotel;
      break;
    case 'house':
      priceInput.placeholder = MIN_PRICE_OF_TYPES.house;
      priceInput.min = MIN_PRICE_OF_TYPES.house;
      break;
    case 'palace':
      priceInput.placeholder = MIN_PRICE_OF_TYPES.palace;
      priceInput.min = MIN_PRICE_OF_TYPES.palace;
      break;
  }

  if (priceValue !== '' &&  priceValue < priceInput.min) {
    priceInput.setCustomValidity(`???????? ???????????? ???????? ???? ???????????? ${ priceInput.min }`);
    isValid = false;
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
  return isValid;
}

function onValidateRoomNumber() {
  const roomNumberSelectIndex = roomNumberSelect.selectedIndex;
  const roomNumberSelectOptionValue = Number.parseInt(roomNumberSelectOptions[roomNumberSelectIndex].value, 10);
  const capacityArray = ROOMS_TO_CAPACITY[roomNumberSelectOptionValue];
  let isValid = true;

  if (capacityArray.indexOf(Number.parseInt(capacitySelect.selectedOptions[0].value, 10)) === -1) {
    capacitySelect.setCustomValidity('???????????????????????? ?????????? ????????????');
    isValid = false;
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

  return isValid;
}

function onValidateCapacity() {
  const roomNumberSelectIndex = roomNumberSelect.selectedIndex;
  const roomNumberSelectOptionValue = Number.parseInt(roomNumberSelectOptions[roomNumberSelectIndex].value, 10);
  const capacityArray = ROOMS_TO_CAPACITY[roomNumberSelectOptionValue];
  let isValid = true;

  if (capacityArray.indexOf(Number.parseInt(capacitySelect.selectedOptions[0].value, 10)) === -1) {
    capacitySelect.setCustomValidity('???????????????????????? ?????????? ????????????');
    isValid = false;
  } else {
    capacitySelect.setCustomValidity('');
  }
  capacitySelect.reportValidity();

  return isValid;
}

function onValidateTimeIn() {
  const timeInIndex = timeIn.selectedIndex;
  optionTimeOut[timeInIndex].selected = true;
}

function onValidateTimeOut() {
  const timeOutIndex = timeOut.selectedIndex;
  optionTimeIn[timeOutIndex].selected = true;
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

function onSuccessMessageClick() {
  successMessage.remove();
  window.removeEventListener('click', onSuccessMessageClick);
  window.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

function onErrorMessageClick() {
  errorMessage.remove();
  window.removeEventListener('click', onErrorMessageClick);
  window.removeEventListener('keydown', onErrorMessageEscKeydown);
  errorButton.addEventListener('click', onErrorMessageClick);
}

function validateTitle() {
  titleInput.addEventListener('input', onValidateTitle);
}

function validatePrice() {
  priceInput.addEventListener('input', onValidatePrice);
}

function validateType() {
  typeSelect.addEventListener('change', onValidateType);
}

function validateRoomsAndCapacity() {
  roomNumberSelect.addEventListener('change', onValidateRoomNumber);
  capacitySelect.addEventListener('change', onValidateCapacity);
}

function validateTime() {
  timeIn.addEventListener('change', onValidateTimeIn);
  timeOut.addEventListener('change', onValidateTimeOut);
}

function validFileType(file) {
  return IMAGE_FILE_TYPES.includes(file.type);
}

function initialCapacitySelectForm() {
  const roomNumberValue = Number.parseInt(roomNumberSelect.selectedOptions[0].value, 10);
  const capacityArray = ROOMS_TO_CAPACITY[roomNumberValue];

  capacitySelectOptions.forEach((capacity) => {
    if (capacityArray.indexOf(Number.parseInt(capacity.value, 10)) === -1) {
      capacity.hidden = true;
    } else {
      capacity.hidden = false;
    }
  });
}

function fillAddress(coordinate) {
  addressInput.value = ` ${ coordinate.lat.toFixed(5) }, ${ coordinate.lng.toFixed(5) }`;
}

function initialFormToDefaultValue() {

  avatarInput.files = undefined;
  imagesInput.files = undefined;

  titleInput.value = '';

  priceInput.value = '';
  priceInput.placeholder = MIN_PRICE_OF_TYPES.flat;
  priceInput.min = MIN_PRICE_OF_TYPES.flat;

  typeSelectOptions[INDEX_DEFAULT_TYPE].selected = true;

  optionTimeIn[0].selected = true;
  optionTimeOut[0].selected = true;

  roomNumberSelectOptions[0].selected = true;

  initialCapacitySelectForm();
  capacitySelectOptions[2].selected = true;

  descriptionTextarea.value = '';
  featuresCheckbox.forEach((feature) => {
    feature.checked = false;
  });

  const coordinate = resetCoordinateMarker();
  fillAddress(coordinate);
}

function startFormEventListener() {
  validateTitle();
  validatePrice();
  validateType();
  validateRoomsAndCapacity();
  validateTime();
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
  adForm.classList.remove('ad-form--disabled');
  const fieldsetsForm = adForm.querySelectorAll('fieldset');
  fieldsetsForm.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  getData(
    (ads) => {onSuccessGetData(ads);},
    (error) => {onFailGetData(error);},
  );

  const defaultCoordinate = getDefaultCoordinate();
  fillAddress(defaultCoordinate);
  initialCapacitySelectForm();
  startFormEventListener();
}

function validateFieldForm() {
  let isValid = true;
  if (!onValidateTitle()) {
    titleInput.style.borderColor = 'red';
    isValid = false;
  }
  if (!onValidatePrice()) {
    priceInput.style.borderColor = 'red';
    isValid = false;
  }
  if(!onValidateRoomNumber() || !onValidateCapacity()) {
    capacitySelect.style.borderColor = 'red';
    isValid = false;
  }
  const fileImage = imagesInput.files[0];
  const avatarImage = avatarInput.files[0];

  if (fileImage && !validFileType(fileImage)) {
    fileImageLabel.style.borderColor = 'red';
    isValid = false;
  }
  if (avatarImage && !validFileType(avatarImage)) {
    avatarImageLabel.style.borderColor = 'red';
    isValid = false;
  }
  return isValid;
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
  errorButton.addEventListener('click', onErrorMessageClick);
}

function onSuccess() {
  closePopupOnMap();
  openSuccessMessage();
  initialFormToDefaultValue();
}

function onFail() {
  closePopupOnMap();
  openErrorMessage();
}

export {onSuccess, onFail, deactivateForm, activateForm, fillAddress, initialFormToDefaultValue, validateFieldForm};
