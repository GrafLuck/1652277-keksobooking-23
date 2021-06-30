import {createAd} from './data.js';
import {getCards} from './card.js';

const SIMILAR_AD_COUNT = 10;

const similarAd = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());
const similarListCards = getCards(similarAd);
const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(similarListCards.querySelector('.popup'));
