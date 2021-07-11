import { deactivateForm, initialFormToDefaultValue, onSuccess, onFail, validateFieldForm } from './form.js';
import { addMarker, createMap } from './map.js';
import { onSuccessGetData, onFailGetData } from './map.js';
import { getData, sendData } from './network.js';

deactivateForm();

const map = createMap();
addMarker(map);

getData(
  (ads) => {onSuccessGetData(ads);},
  (error) => {onFailGetData(error);},
);

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
});
