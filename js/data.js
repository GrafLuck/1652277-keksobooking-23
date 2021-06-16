import {getRandomIntInclusive, getRandomFloatInclusive} from './util.js';

const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;
const MIN_PRICE = 1;
const MAX_PRICE = 10000;
const MIN_NUMBER_ROOMS = 1;
const MAX_NUMBER_ROOMS = 100;
const MIN_NUMBER_GUESTS = 1;
const MAX_NUMBER_GUESTS = 100;

const TYPES_APARTMENTS = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS_APARTMENTS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getPhotosApartments() {
  const arrayPhotos = [];
  // Верхняя граница 2, а не 1, используется для повышения вероятности входа в цикл (увеличения количества фотографий)
  while (getRandomIntInclusive(0, 2)) {
    arrayPhotos.push(PHOTOS_APARTMENTS[getRandomIntInclusive(0, PHOTOS_APARTMENTS.length - 1)]);
  }
  return arrayPhotos;
}

function getFeaturesApartments() {
  const arrayFeatures = FEATURES.filter(() => {
    if (getRandomIntInclusive(0, 1)) {
      return true;
    }
    return false;
  });
  return arrayFeatures;
}

function createLocation() {
  return {
    lat: getRandomFloatInclusive(MIN_LATITUDE, MAX_LATITUDE, 5),
    lng: getRandomFloatInclusive(MIN_LONGITUDE, MAX_LONGITUDE, 5),
  };
}

function createOffer(apartmentAd) {
  return {
    title: 'Лучшее предложение для вашего отдыха',
    address: `${apartmentAd.location.lat  }, ${  apartmentAd.location.lng}`,
    price: getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
    type: TYPES_APARTMENTS[getRandomIntInclusive(0, TYPES_APARTMENTS.length - 1)],
    rooms: getRandomIntInclusive(MIN_NUMBER_ROOMS, MAX_NUMBER_ROOMS),
    guests: getRandomIntInclusive(MIN_NUMBER_GUESTS, MAX_NUMBER_GUESTS),
    checkin: TIME[getRandomIntInclusive(0, TIME.length - 1)],
    checkout: TIME[getRandomIntInclusive(0, TIME.length - 1)],
    features: getFeaturesApartments(),
    description: 'Эксклюзивное большое помещение для приема многочисленных гостей',
    photos: getPhotosApartments(),
  };
}

function createAuthor() {
  return {
    avatar: `img/avatars/user0${  getRandomIntInclusive(1, 8)  }.png`,
  };
}

function createApartmentAd() {
  const apartmentAd = {};
  apartmentAd.location = createLocation();
  apartmentAd.offer = createOffer(apartmentAd);
  apartmentAd.author = createAuthor();
  return apartmentAd;
}

export {createApartmentAd};
