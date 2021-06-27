function fillApartmentTitle(apartment, title) {
  const apartmentTitle = apartment.querySelector('.popup__title');
  if (title) {
    apartmentTitle.textContent = title;
  } else {
    apartmentTitle.classList.add('hidden');
  }
}

function fillApartmentAddress(apartment, address) {
  const apartmentAddress = apartment.querySelector('.popup__text--address');
  if (address) {
    apartmentAddress.textContent = address;
  } else {
    apartmentAddress.classList.add('hidden');
  }
}

function fillApartmentPrice(apartment, price) {
  const apartmentPrice = apartment.querySelector('.popup__text--price');
  if (price) {
    apartmentPrice.textContent = price + ' ';
    apartmentPrice.insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');
  } else {
    apartmentPrice.classList.add('hidden');
  }
}

function fillApartmentType(apartment, type) {
  const apartmentType = apartment.querySelector('.popup__type');
  switch (type) {
    case 'flat':
      apartmentType.textContent = 'Квартира';
      break;
    case 'bungalow':
      apartmentType.textContent = 'Бунгало';
      break;
    case 'house':
      apartmentType.textContent = 'Дом';
      break;
    case 'palace':
      apartmentType.textContent = 'Дворец';
      break;
    case 'hotel':
      apartmentType.textContent = 'Отель';
      break;
    default:
      apartmentType.classList.add('hidden');
  }
}

function fillApartmentCapacity(apartment, rooms, guests) {
  const apartmentCapacity = apartment.querySelector('.popup__text--capacity');
  if (rooms && guests) {
    apartmentCapacity.textContent = rooms + ' комнаты для ' + guests + ' гостей';
  } else {
    apartmentCapacity.classList.add('hidden');
  }
}

function fillApartmentTime(apartment, checkin, checkout) {
  const apartmentTime = apartment.querySelector('.popup__text--time');
  if (checkin && checkout) {
    apartmentTime.textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
  } else {
    apartmentTime.classList.add('hidden');
  }
}

function fillApartmentFeatures(apartment, features) {
  const apartmentFeatures = apartment.querySelector('.popup__features');
  if (features) {
    const apartmentFeature = apartmentFeatures.querySelectorAll('.popup__feature');
    apartmentFeature.forEach((feature) => {
      feature.remove();
    });
    features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + feature);
      apartmentFeatures.appendChild(featureElement);
    });
  } else {
    apartmentFeatures.classList.add('hidden');
  }
}

function fillApartmentDescription(apartment, description) {
  const apartmentDescription = apartment.querySelector('.popup__description');
  if (description) {
    apartmentDescription.textContent = description;
  } else {
    apartmentDescription.classList.add('hidden');
  }
}

function fillApartmentPhotos(apartment, photos) {
  const apartmentPhotos = apartment.querySelector('.popup__photos');
  if (photos) {
    apartmentPhotos.removeChild(apartment.querySelector('.popup__photo'));
    photos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.src = photo;
      photoElement.width = '45';
      photoElement.height = '40';
      photoElement.alt = 'Фотография жилья';
      apartmentPhotos.appendChild(photoElement);
    });
  } else {
    apartmentPhotos.classList.add('hidden');
  }
}

function fillApartmentAvatar(apartment, avatar) {
  const apartmentAvatar = apartment.querySelector('.popup__avatar');
  if (avatar) {
    apartmentAvatar.src = avatar;
  } else {
    apartmentAvatar.classList.add('hidden');
  }
}

function getApartmentCards(similarApartmentAd) {
  const similarApartmentTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarApartmentFragment = document.createDocumentFragment();

  similarApartmentAd.forEach((apartment) => {
    const apartmentElement = similarApartmentTemplate.cloneNode(true);

    fillApartmentTitle(apartmentElement, apartment.offer.title);

    fillApartmentAddress(apartmentElement, apartment.offer.address);

    fillApartmentPrice(apartmentElement, apartment.offer.price);

    fillApartmentType(apartmentElement, apartment.offer.type);

    fillApartmentCapacity(apartmentElement, apartment.offer.rooms, apartment.offer.guests);

    fillApartmentTime(apartmentElement, apartment.offer.checkin, apartment.offer.checkout);

    fillApartmentFeatures(apartmentElement, apartment.offer.features);

    fillApartmentDescription(apartmentElement, apartment.offer.description);

    fillApartmentPhotos(apartmentElement, apartment.offer.photos);

    fillApartmentAvatar(apartmentElement, apartment.author.avatar);

    similarApartmentFragment.appendChild(apartmentElement);
  });

  return similarApartmentFragment;
}

export {getApartmentCards};
