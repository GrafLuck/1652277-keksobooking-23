function fillTitle(card, title) {
  const cardTitle = card.querySelector('.popup__title');
  if (title) {
    cardTitle.textContent = title;
  } else {
    cardTitle.classList.add('hidden');
  }
}

function fillAddress(card, address) {
  const cardAddress = card.querySelector('.popup__text--address');
  if (address) {
    cardAddress.textContent = address;
  } else {
    cardAddress.classList.add('hidden');
  }
}

function fillPrice(card, price) {
  const cardPrice = card.querySelector('.popup__text--price');
  if (price) {
    cardPrice.textContent = `${price  } `;
    cardPrice.insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');
  } else {
    cardPrice.classList.add('hidden');
  }
}

function fillType(card, type) {
  const cardType = card.querySelector('.popup__type');
  switch (type) {
    case 'flat':
      cardType.textContent = 'Квартира';
      break;
    case 'bungalow':
      cardType.textContent = 'Бунгало';
      break;
    case 'house':
      cardType.textContent = 'Дом';
      break;
    case 'palace':
      cardType.textContent = 'Дворец';
      break;
    case 'hotel':
      cardType.textContent = 'Отель';
      break;
    default:
      cardType.classList.add('hidden');
  }
}

function fillCapacity(card, rooms, guests) {
  const cardCapacity = card.querySelector('.popup__text--capacity');
  if (rooms && guests) {
    cardCapacity.textContent = `${rooms  } комнаты для ${  guests  } гостей`;
  } else {
    cardCapacity.classList.add('hidden');
  }
}

function fillTime(card, checkin, checkout) {
  const cardTime = card.querySelector('.popup__text--time');
  if (checkin && checkout) {
    cardTime.textContent = `Заезд после ${  checkin  }, выезд до ${  checkout}`;
  } else {
    cardTime.classList.add('hidden');
  }
}

function fillFeatures(card, features) {
  const cardFeatures = card.querySelector('.popup__features');
  if (features) {
    const cardFeature = cardFeatures.querySelectorAll('.popup__feature');
    cardFeature.forEach((feature) => {
      feature.remove();
    });
    features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(`popup__feature--${  feature}`);
      cardFeatures.appendChild(featureElement);
    });
  } else {
    cardFeatures.classList.add('hidden');
  }
}

function fillDescription(card, description) {
  const cardDescription = card.querySelector('.popup__description');
  if (description) {
    cardDescription.textContent = description;
  } else {
    cardDescription.classList.add('hidden');
  }
}

function fillPhotos(card, photos) {
  const cardPhotos = card.querySelector('.popup__photos');
  if (photos) {
    cardPhotos.removeChild(card.querySelector('.popup__photo'));
    photos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.src = photo;
      photoElement.width = '45';
      photoElement.height = '40';
      photoElement.alt = 'Фотография жилья';
      cardPhotos.appendChild(photoElement);
    });
  } else {
    cardPhotos.classList.add('hidden');
  }
}

function fillAvatar(card, avatar) {
  const cardAvatar = card.querySelector('.popup__avatar');
  if (avatar) {
    cardAvatar.src = avatar;
  } else {
    cardAvatar.classList.add('hidden');
  }
}

function getCard(ad) {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  const card = cardTemplate.cloneNode(true);

  fillTitle(card, ad.offer.title);

  fillAddress(card, ad.offer.address);

  fillPrice(card, ad.offer.price);

  fillType(card, ad.offer.type);

  fillCapacity(card, ad.offer.rooms, ad.offer.guests);

  fillTime(card, ad.offer.checkin, ad.offer.checkout);

  fillFeatures(card, ad.offer.features);

  fillDescription(card, ad.offer.description);

  fillPhotos(card, ad.offer.photos);

  fillAvatar(card, ad.author.avatar);

  return card;
}

export {getCard};
