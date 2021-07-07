import { activateForm, fillAddress } from './form.js';
import { getCard } from './card.js';

const DEFAULT_LAT = 35.68950;
const DEFAULT_LNG = 139.69171;

let mainPinMarker;

function getDefaultCoordinate() {
  return {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  };
}

function createMap() {
  const map = L.map('map-canvas')
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

  return map;
}

function addMarker(map) {
  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
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

function createMarker(map, point) {
  const {lat, lng} = point.location;

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
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

  marker.addTo(map)
    .bindPopup(
      getCard(point),
      {
        keepInView: true,
      },
    );
}

function resetCoordinateMarker() {
  mainPinMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  return mainPinMarker.getLatLng();
}

export {createMap, addMarker, createMarker, getDefaultCoordinate, resetCoordinateMarker};
