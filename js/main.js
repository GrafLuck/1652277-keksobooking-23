import {createApartmentAd} from './data.js';
import {getApartmentCards} from './apartment.js';

const SIMILAR_APARTMENTS_AD_COUNT = 10;

const similarApartmentAd = new Array(SIMILAR_APARTMENTS_AD_COUNT).fill(null).map(() => createApartmentAd());
const similarListApartmentCards = getApartmentCards(similarApartmentAd);
const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(similarListApartmentCards.querySelector('.popup'));
