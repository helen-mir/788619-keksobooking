'use strict';

(function() {
  function getAds(advertisement) {
  var offer = advertisement.offer;
  var author = advertisement.author;

  var mapCardPlace = document.querySelector('.map_card');
  var templateCard = document.querySelector('#card').content.querySelector('article');


  var mapCardElement = templateCard.cloneNode(true);
  mapCardElement.querySelector('.popup__title').textContent = offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = window.data.translateType(offer.type);
  mapCardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

  var featuresElement = mapCardElement.querySelector('.popup__features');
  featuresElement.innerHTML = '';
  featuresElement.appendChild(window.data.getFeatures(offer.features));

  mapCardElement.querySelector('.popup__description').textContent = offer.description;

  var photosElement = mapCardElement.querySelector('.popup__photos');
  photosElement.innerHTML = '';
  photosElement.appendChild(window.data.getPhotos(offer.photos));

  mapCardElement.querySelector('.popup__avatar').src = author.avatar;

  mapCardPlace.appendChild(mapCardElement);
}
})();
