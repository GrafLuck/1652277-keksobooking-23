import { deactivateForm, initialFormToDefaultValue, onSuccess, onFail } from './form.js';
import { validateForm } from './form.js';
import { addMarker, createMap, createMarker } from './map.js';
import { getData, sendData } from './network.js';

const NUMBER_MARKERS_ON_MAP = 10;

deactivateForm();

const map = createMap();
const mainMarker = addMarker(map);

getData((ads) => {
    for (let i = 0; i < NUMBER_MARKERS_ON_MAP; i++) {
      createMarker(map, ads[i]);
    }
});

validateForm();

const adForm = document.querySelector('.ad-form');
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(onSuccess, onFail, new FormData(evt.target));
});

adForm.addEventListener('reset', (evt) => {
  evt.preventDefault();
  initialFormToDefaultValue();
});
