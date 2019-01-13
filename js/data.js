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
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PHOTOS_WIDTH = 45;
  var PHOTOS_HEIGHT = 40;

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

  // Переводим название типов жилья на русский
  var translateType = function (type) {
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

    arr.forEach(function(element) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + element;
      fragment.appendChild(li);
    })
    return fragment;
  };

  var getPhotos = function (arr) {
    var fragment = document.createDocumentFragment();

    arr.forEach(function(element) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.src = element;
      img.alt = 'Фотография жилья';
      img.width = PHOTOS_WIDTH;
      img.height = PHOTOS_HEIGHT;
      fragment.appendChild(img);
    })
    return fragment;
  };

  window.data = {
    MIN_Y : MIN_Y,
    MAX_Y : MAX_Y,
    MIN_X : MIN_X,
    MAX_X : MAX_X,
    ESC_KEYCODE : ESC_KEYCODE,
    ENTER_KEYCODE : ENTER_KEYCODE,
    translateType : translateType,
    getPhotos : getPhotos,
    getFeatures : getFeatures
  };
})();
