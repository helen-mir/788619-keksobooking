'use strict';

(function () {

  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  window.data = {
    MIN_Y : MIN_Y,
    MAX_Y : MAX_Y,
    MIN_X : MIN_X,
    MAX_X : MAX_X,
    ESC_KEYCODE : ESC_KEYCODE,
    ENTER_KEYCODE : ENTER_KEYCODE,
    translateType : translateType
  };
})();
