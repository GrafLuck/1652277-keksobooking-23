import { deactivateForm, initialFormToDefaultValue, onSuccess, onFail, validateFieldForm } from './form.js';
import { addMarker, createMap } from './map.js';
import { sendData } from './network.js';
import { initialFilterToDefaultValue } from './filter.js';

deactivateForm();

createMap();
addMarker();

const adForm = document.querySelector('.ad-form');
adForm.noValidate = true;
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validateFieldForm()) {
    sendData(onSuccess, onFail, new FormData(evt.target));
  }
});

adForm.addEventListener('reset', (evt) => {
  evt.preventDefault();
  initialFormToDefaultValue();
  initialFilterToDefaultValue();
});
