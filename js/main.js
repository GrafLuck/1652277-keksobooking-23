import {createApartmentAd} from './data.js';

const SIMILAR_APARTMENTS_AD_COUNT = 10;

const similarApartmentAd = new Array(SIMILAR_APARTMENTS_AD_COUNT).fill(null).map(() => createApartmentAd());
similarApartmentAd;
