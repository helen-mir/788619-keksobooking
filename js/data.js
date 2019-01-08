'use strict';

(function() {

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

  window.data = {
    MIN_Y : MIN_Y,
    MAX_Y : MAX_Y,
    MIN_X : MIN_X,
    MAX_X : MAX_X
  };

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
      var locationX = getRandomNumber(window.data.MIN_X, window.data.MAX_X);
      var locationY = getRandomNumber(window.data.MIN_Y, window.data.MAX_Y);

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

  window.data = {
    MIN_Y : MIN_Y,
    MAX_Y : MAX_Y,
    MIN_X : MIN_X,
    MAX_X : MAX_X,
    generateAds : generateAds,
    translateType : translateType,
    getPhotos : getPhotos,
    getFeatures : getFeatures
  };
})();
