import {createApartmentAd} from './data.js';
import {getApartmentCards} from './apartment.js';
import { validateRooms, validateType, validateTime } from './form.js';

const SIMILAR_APARTMENTS_AD_COUNT = 10;

const similarApartmentAd = new Array(SIMILAR_APARTMENTS_AD_COUNT).fill(null).map(() => createApartmentAd());
const similarListApartmentCards = getApartmentCards(similarApartmentAd);
const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(similarListApartmentCards.querySelector('.popup'));

validateRooms();
validateType();
validateTime();

document.addEventListener('DOMContentLoaded', () => {
  console.log('!!!');
  const capacity = document.querySelector('#capacity');
  const optionsCapacity = capacity.querySelectorAll('option');
  optionsCapacity.forEach((option) => {
    if (option.selected === false) {
      option.hidden = true;
    }
  });
});
