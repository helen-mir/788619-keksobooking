'use strict';

var COUNT_ADS = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_GUEST = 1;
var MAX_GUEST = 15;

var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = 0;
var MAX_X = 1200;

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
      'author': {
        'avatar': 'img/avatars/user' + ('0' + (i + 1)) + '.png',
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

//var sectionMap = document.querySelector('.map');
//sectionMap.classList.remove('map--faded');

function renderPins(pins) {
  var mapPin = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    var mapPinElement = template.cloneNode(true);
    var author = pins[i].author;
    mapPinElement.querySelector('img').src = author.avatar;
    mapPinElement.style.left = pins[i].location.x + 'px';
    mapPinElement.style.top = pins[i].location.y + 'px';
    fragment.appendChild(mapPinElement);
  }

mapPin.appendChild(fragment);
}

var getFeatures = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + arr[i];
    fragment.appendChild(li);
  }
  return fragment;
};

var getPhotos = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var img = document.createElement('img');
    img.className = 'popup__photo';
    img.src = arr[i];
    img.alt = 'Фотография жилья';
    img.width = 45;
    img.height = 40;
    fragment.appendChild(img);
  }
  return fragment;
};

function getAds(advertisement) {
  var offer = advertisement.offer;
  var author = advertisement.author;

  var mapCardPlace = document.querySelector('.map_card');
  var templateCard = document.querySelector('#card').content.querySelector('article');


    var mapCardElement = templateCard.cloneNode(true);
    mapCardElement.querySelector('.popup__title').textContent = offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = translateType(offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

    var featuresElement = mapCardElement.querySelector('.popup__features');
    featuresElement.innerHTML = '';
    featuresElement.appendChild(getFeatures(offer.features));

    mapCardElement.querySelector('.popup__description').textContent = offer.description;

    var photosElement = mapCardElement.querySelector('.popup__photos');
    photosElement.innerHTML = '';
    photosElement.appendChild(getPhotos(offer.photos));

    mapCardElement.querySelector('.popup__avatar').src = author.avatar;

    mapCardPlace.appendChild(mapCardElement);
}

var sectionMap = document.querySelector('.map')
var mapCard = document.createElement('div');
var afterMapCard = document.querySelector('.map__filters-container');
mapCard.classList.add('map_card');
sectionMap.insertBefore(mapCard, afterMapCard);

/*
var advertisements = generateAds();
renderPins(advertisements);
getAds(advertisements[1]);
*/

//ВТОРОЕ ЗАДАНИЕ #16 Личный проект: подробности
//неактивное состояние
var mapFilter = document.querySelectorAll('.map__filter');
var mapFeatures = document.querySelector('.map__features');
var formHeader = document.querySelector('.ad-form-header');
var formElement = document.querySelectorAll('.ad-form__element');

mapFilter.disabled = true;
mapFeatures.disabled = true;
formHeader.disabled = true;
formElement.disabled = true;

//активное состояние
var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mouseup', function() {
  //функция, которая будет отменять изменения DOM-элементов, описанные в пункте «Неактивное состояние» технического задания.
  mapFilter.disabled = false;
  mapFeatures.disabled = false;
  formHeader.disabled = false;
  formElement.disabled = false;

  var sectionMap = document.querySelector('.map');
  sectionMap.classList.remove('map--faded');

  var form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');

  var advertisements = generateAds();
  renderPins(advertisements);
  //вызов метода, который устанавливает значения поля ввода адреса.
})

//Нажатие на метку похожего объявления на карте, приводит к показу карточки с подробной информацией об этом объявлении.
//Получается, что для меток должны быть созданы обработчики событий, которые вызывают показ карточки с соответствующими данными.
