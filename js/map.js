'use strict';

var COUNT_ADS = 8; //количество похожих объявлений неподалеку

var MIN_PRICE = 1000; // минимальная цена в объявлении
var MAX_PRICE = 1000000; // максимальная цена в объявлении

var MIN_ROOMS = 1; // минимальное количество комнат
var MAX_ROOMS = 5; // максимальное количество комнат

var MIN_GUEST = 1;
var MAX_GUEST = 15;

var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = 0;
var MAX_X = 1200;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var TITLE_ADS = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPE_OF_ROOMS = [
  'flat',
  'house',
  'bungalo'
];
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var ADVANTAGES = [
  'wifi',
  'dishwasher',
  'parking',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// функция генерации случайных данных
function generateAds() {
  var ads = [];
  var titleAds = shuffleArray(TITLE_ADS);

  for (var i = 0; i < COUNT_ADS; i++) {
    var locationX = getRandomNumber(MIN_X, MAX_X);
    var locationY = getRandomNumber(MIN_Y, MAX_Y);

    ads.push({
      'autor': {
        'avatar': 'img/avatars/user' + ('0' + i) + '.png',
      },
      'offer': {
        'title': titleAds[i],
        'address': (locationX + ', ' + locationY),
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': getRandomElement(TYPE_OF_ROOMS),
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomNumber(MIN_GUEST, MAX_GUEST),
        'checkin': getRandomElement(TIMES),
        'checkout': getRandomElement(TIMES),
        'features': getArrayLength(ADVANTAGES),
        'description': '',
        'photos': shuffleArray(PHOTOS) // один и тот же порядок получается в каждом объявлении
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }

  return ads;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
  }
  var randomElement = array[randomIndex];
  return randomElement;
}

// массив произвольной длины
function getArrayLength(array) {
  var clone = array.slice();
  clone.length = getRandomNumber(1, array.length);
  return clone;
}

// массив в случайном порядке
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var tempValue = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

// Переводим название типов жилья на русский
function translateType(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    default:
      return type;
  }
}

// У блока .map уберите класс .map--faded.

var sectionMap = document.querySelector('.map');
sectionMap.classList.remove('map--faded');

//
function renderPins(pins) {
var mapPin = document.querySelector('.map_pins');
var template = document.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment;

for (var i = 0; i < pins.length; i++) {
  var mapPinElement = template.cloneNode(true);
  mapPinElement.style =  'left: ' + ads[i].location.x + 'px; top:'+ ads[i].location.y + 'px;'; //это аообще правильная запись?
  fragment.appendChild(mapPinElement);
}

mapPin.appendChild(fragment);
}

//
var sectionMap = document.querySelector('.map')
var mapCard = document.createElement('div');
var afterMapCard = document.querySelector('.map__filters-container');
mapCard.classList.add('map_card');
sectionMap.insertBefore(mapCard, afterMapCard);

//

function getAds(advertisement) {
  var offer = advertisement.offer;
  var autor = advertisement.autor;

  var mapCardPlace = document.querySelector('.map_card');
  var templateCard = document.querySelector('#card').content.querySelector('article');

  for (var i = 0; i < advertisement.length; i++) {
    var mapCardElement = templateCard.cloneNode(true);
    mapCardElement.querySelector('.popup__title').textContent = offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = translateType(offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

    var features = mapCardElement.querySelector('.popup__features');
    mapCardElement.removeChild(features);
    // как мне создать новые актульные удобства?

    mapCardElement.querySelector('.popup__description').textContent = offer.description;
    mapCardElement.querySelector('.popup__photos');
    // как вывести все фото и записать в них разные src?

    mapCardPlace.img.src = autor.avatar;

    mapCardPlace.appendChild(mapCardElement);
  }
};
