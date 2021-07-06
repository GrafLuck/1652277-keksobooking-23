import { deactivateForm, validateFormOnClient } from './form.js';
import { validateForm, validateRoomsAndCapacity, validateType, validateTime, validateTitle, validatePrice } from './form.js';
import { addMarker, createMap, createMarker } from './map.js';
import { getData, sendData } from './network.js';

const NUMBER_MARKERS_ON_MAP = 10;

deactivateForm();

const map = createMap();
addMarker(map);

getData((ads) => {
    for (let i = 0; i < NUMBER_MARKERS_ON_MAP; i++) {
      createMarker(map, ads[i]);
    }
});

validateForm();
validateTitle();
validateRoomsAndCapacity();
validateType();
validateTime();
validatePrice();

function onFail() {
  console.log('Ошибка')
}

function onSuccess() {
  console.log('Успех');
}

const adForm = document.querySelector('.ad-form');
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!validateFormOnClient()) {
    return;
  }
  sendData(onSuccess, onFail, new FormData(evt.target));
});

function returnToInitialValue() {

}
