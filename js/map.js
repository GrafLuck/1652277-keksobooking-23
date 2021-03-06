import { activateForm, fillAddress } from './form.js';
import { getCard } from './card.js';
import { setFiltering } from './filter.js';

const DEFAULT_LAT = 35.68950;
const DEFAULT_LNG = 139.69171;
const NUMBER_MARKERS_ON_MAP = 10;

let map;
let mainPinMarker;
let markerGroup;

function getNumberMarkersOnMap() {
  return NUMBER_MARKERS_ON_MAP;
}

function getDefaultCoordinate() {
  return {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  };
}

function createMap() {
  map = L.map('map-canvas')
    .on('load', () => {
      activateForm();
    })
    .setView({
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  markerGroup = L.layerGroup().addTo(map);

  return map;
}

function addMarker() {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  mainPinMarker = L.marker(
    {
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const coordinate = evt.target.getLatLng();
    fillAddress(coordinate);
  });

  return mainPinMarker;
}

function createMarker(point) {
  const {lat, lng} = point.location;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker.addTo(markerGroup)
    .bindPopup(
      getCard(point),
      {
        keepInView: true,
      },
    );
}

function closePopupOnMap() {
  map.closePopup();
}

function resetCoordinateMarker() {
  mainPinMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  return mainPinMarker.getLatLng();
}

function drawMarkersCallback(pointsArray) {
  markerGroup.clearLayers();
  pointsArray.forEach((point) => {
    createMarker(point);
  });
}

function drawUnfilteredMarkers(ads) {
  for (let identifier = 0; identifier < NUMBER_MARKERS_ON_MAP; identifier++) {
    createMarker(ads[identifier]);
  }
}

function returnDrawMarkersCallback() {
  return drawMarkersCallback;
}

function onSuccessGetData(ads) {
  drawUnfilteredMarkers(ads);

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');
  const mapFilterSelects = mapFilters.querySelectorAll('select');
  const mapFilterFieldset = mapFilters.querySelector('fieldset');
  mapFilterSelects.forEach((select) => {
    select.disabled = false;
  });
  mapFilterFieldset.disabled = false;

  setFiltering(ads, drawMarkersCallback);
}

function onFailGetData(error) {
  const body = document.querySelector('body');
  const errorGetDataTemplate = document.querySelector('#error-data').content.querySelector('.error-data');
  const errorGetDataDiv = errorGetDataTemplate.cloneNode(true);
  const errorGetDataMessage = errorGetDataDiv.querySelector('.error-data__message');
  errorGetDataMessage.textContent = `???????????? ?????? ?????????????????? ???????????? ?? ?????????????? ( ${error} )`;
  body.append(errorGetDataDiv);
  setTimeout(() => {
    errorGetDataDiv.remove();
  }, 1500);
}

export {createMap, addMarker, createMarker, closePopupOnMap, getDefaultCoordinate, resetCoordinateMarker, onSuccessGetData, onFailGetData, returnDrawMarkersCallback, getNumberMarkersOnMap};
