import {getListOfAd} from './network.js';
import { returnDrawMarkersCallback } from './map.js';
import { debounce } from './utils/debounce.js';

const HOUSING_PRICE = {
  'any': [0, Infinity],
  'middle': [10000, 50000],
  'low': [0, 9999],
  'high': [50001, Infinity],
};

const RERENDER_DELAY = 500;

const mapFilters = document.querySelector('.map__filters');

const typeFilter = document.querySelector('#housing-type');
const typeFilterOptions = typeFilter.querySelectorAll('option');

const priceFilter = document.querySelector('#housing-price');
const priceFilterOptions = priceFilter.querySelectorAll('option');

const numberOfRoomsFilter = document.querySelector('#housing-rooms');
const numberOfRoomsOptions = numberOfRoomsFilter.querySelectorAll('option');

const numberOfGuestsFilter = document.querySelector('#housing-guests');
const numberOfGuestsOptions = numberOfGuestsFilter.querySelectorAll('option');

const featuresCheckbox = document.querySelectorAll('.map__checkbox');
// const featuresFilter = document.querySelector('#housing-features');

function onFilterChange(ads, cb) {
  const typeFilterIndex = typeFilter.selectedIndex;
  const typeFilterOptionValue = typeFilterOptions[typeFilterIndex].value;
  let filterArray = ads.filter((ad) => (ad.offer.type === typeFilterOptionValue) || (typeFilterOptionValue === 'any'));

  const priceFilterIndex = priceFilter.selectedIndex;
  const priceFilterOptionValue = priceFilterOptions[priceFilterIndex].value;
  filterArray = filterArray.filter((ad) => (ad.offer.price >= HOUSING_PRICE[priceFilterOptionValue][0]) && (ad.offer.price <= HOUSING_PRICE[priceFilterOptionValue][1]));

  const numberOfRoomsFilterIndex = numberOfRoomsFilter.selectedIndex;
  const numberOfRoomsFilterOptionValue = numberOfRoomsOptions[numberOfRoomsFilterIndex].value;
  filterArray = filterArray.filter((ad) => (ad.offer.rooms === Number.parseInt(numberOfRoomsFilterOptionValue, 10)) || (numberOfRoomsFilterOptionValue === 'any'));

  const numberOfGuestsFilterIndex = numberOfGuestsFilter.selectedIndex;
  const numberOfGuestsFilterOptionValue = numberOfGuestsOptions[numberOfGuestsFilterIndex].value;
  filterArray = filterArray.filter((ad) => (ad.offer.guests === Number.parseInt(numberOfGuestsFilterOptionValue, 10)) || (numberOfGuestsFilterOptionValue === 'any'));

  const featuresCheckedArray = Array.from(featuresCheckbox).filter((feature) => feature.checked === true);
  const resultArray = [];
  filterArray.forEach((ad) => {
    let isExistFeauresInAd = true;
    featuresCheckedArray.forEach((feature) => {
      if (ad.offer.features && !ad.offer.features.includes(feature.value)) {
        isExistFeauresInAd = false;
        return isExistFeauresInAd;
      }
    });
    if (isExistFeauresInAd) {
      resultArray.push(ad);
    }
  });
  cb(resultArray.slice(0, 10));
}

function setFiltering(ads, cb) {
  mapFilters.addEventListener('change', debounce(onFilterChange.bind(this, ads, cb), RERENDER_DELAY));
}

// function setFilteringByType(ads, cb) {
//   typeFilter.addEventListener('change', () => {
//     const typeFilterIndex = typeFilter.selectedIndex;
//     const typeFilterOptionValue = typeFilterOptions[typeFilterIndex].value;
//     const filterArray = ads.filter((ad) => (ad.offer.type === typeFilterOptionValue) || (typeFilterOptionValue === 'any')).slice(0, 10);
//     cb(filterArray);
//   });
// }

// function setFilteringByPrice(ads, cb) {
//   priceFilter.addEventListener('change', () => {
//     const priceFilterIndex = priceFilter.selectedIndex;
//     const priceFilterOptionValue = priceFilterOptions[priceFilterIndex].value;
//     const filterArray = ads.filter((ad) => (ad.offer.price >= HOUSING_PRICE[priceFilterOptionValue][0]) && (ad.offer.price <= HOUSING_PRICE[priceFilterOptionValue][1])).slice(0, 10);
//     cb(filterArray);
//   });
// }

// function setFilteringByNumberOfRooms(ads, cb) {
//   numberOfRoomsFilter.addEventListener('change', () => {
//     const numberOfRoomsFilterIndex = numberOfRoomsFilter.selectedIndex;
//     const numberOfRoomsFilterOptionValue = numberOfRoomsOptions[numberOfRoomsFilterIndex].value;
//     const filterArray = ads.filter((ad) => (ad.offer.rooms === Number.parseInt(numberOfRoomsFilterOptionValue, 10)) || (numberOfRoomsFilterOptionValue === 'any')).slice(0, 10);
//     cb(filterArray);
//   });
// }

// function setFilteringByNumberOfGuests(ads, cb) {
//   numberOfGuestsFilter.addEventListener('change', () => {
//     const numberOfGuestsFilterIndex = numberOfGuestsFilter.selectedIndex;
//     const numberOfGuestsFilterOptionValue = numberOfGuestsOptions[numberOfGuestsFilterIndex].value;
//     const filterArray = ads.filter((ad) => (ad.offer.guests === Number.parseInt(numberOfGuestsFilterOptionValue, 10)) || (numberOfGuestsFilterOptionValue === 'any')).slice(0, 10);
//     cb(filterArray);
//   });
// }

// function setFilteringByFeatures(ads, cb) {
//   featuresFilter.addEventListener('change', () => {
//     const featuresCheckedArray = Array.from(featuresCheckbox).filter((feature) => feature.checked === true);
//     const filterArray = [];
//     ads.forEach((ad) => {
//       let isExistFeauresInAd = true;
//       featuresCheckedArray.forEach((feature) => {
//         if (ad.offer.features && !ad.offer.features.includes(feature.value)) {
//           isExistFeauresInAd = false;
//           return isExistFeauresInAd;
//         }
//       });
//       if (isExistFeauresInAd) {
//         filterArray.push(ad);
//       }
//     });
//     cb(filterArray.slice(0, 10));
//   });
// }

function initialFilterToDefaultValue() {
  typeFilterOptions[0].selected = true;
  priceFilterOptions[0].selected = true;
  numberOfRoomsOptions[0].selected = true;
  numberOfGuestsOptions[0].selected = true;
  featuresCheckbox.forEach((feature) => {
    feature.checked = false;
  });
  const ads = getListOfAd();
  const cb = returnDrawMarkersCallback();
  onFilterChange(ads, cb);
}

export {setFiltering, initialFilterToDefaultValue };
