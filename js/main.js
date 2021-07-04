import { createAd } from './data.js';
import { deactivateForm } from './form.js';
import { validateForm, validateRoomsAndCapacity, validateType, validateTime, validateTitle, validatePrice } from './form.js';
import { addMarker, createMap, createMarker } from './map.js';

const SIMILAR_AD_COUNT = 10;

deactivateForm();

const map = createMap();
addMarker(map);

const similarAd = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

validateForm();
validateTitle();
validateRoomsAndCapacity();
validateType();
validateTime();
validatePrice();

similarAd.forEach((ad) => {
  createMarker(map, ad);
});

