import { createAd } from './data.js';
import { getCards } from './card.js';
import { deactivateForm, activateForm } from './form.js';
import { validateForm, validateRoomsAndCapacity, validateType, validateTime, validateTitle, validatePrice } from './form.js';

const SIMILAR_AD_COUNT = 10;

deactivateForm();

const similarAd = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());
const similarListCards = getCards(similarAd);
const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(similarListCards.querySelector('.popup'));


activateForm();

validateForm();
validateTitle();
validateRoomsAndCapacity();
validateType();
validateTime();
validatePrice();

