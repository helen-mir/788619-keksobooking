'use strict';

(function () {
  var INACTIVEPIN_WIDTH = 156;
  var INACTIVEPIN_HEIGHT = 156;
  var ACTIVEPIN_WIDTH = 62;
  var ACTIVEPIN_HEIGHT = 84;
  var PIN_MAIN_LEFT = 570;
  var PIN_MAIN_TOP = 375;

  var mapFilter = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');
  var formHeader = document.querySelector('.ad-form-header');
  var formElement = document.querySelectorAll('.ad-form__element');
  var address = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var sectionMap = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var xPin = mapPinMain.offsetLeft + (INACTIVEPIN_WIDTH / 2);
  var yPin = mapPinMain.offsetTop + (INACTIVEPIN_HEIGHT / 2);

  // неактивное состояние
  var disabledMap = function () {
    mapFilter.disabled = true;
    mapFeatures.disabled = true;
    formHeader.disabled = true;

    formElement.forEach(function (item) {
      item.disabled = true;
    });

    form.reset();
    sectionMap.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    window.calculateAddress(xPin, yPin);
    mapPinMain.style.top = PIN_MAIN_TOP + 'px';
    mapPinMain.style.left = PIN_MAIN_LEFT + 'px';
  };

  disabledMap();

  // активное состояние
  // реализация перемещения метки
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var x = mapPinMain.offsetLeft - shift.x;
      var y = mapPinMain.offsetTop - shift.y;

      // ограничение перетаскивания маркера внутри карты
      if (x < window.data.MIN_X) {
        x = window.data.MIN_X;
      }

      if (x > window.data.MAX_X) {
        x = window.data.MAX_X;
      }

      if (y < window.data.MIN_Y) {
        y = window.data.MIN_Y;
      }

      if (y > window.data.MAX_Y) {
        y = window.data.MAX_Y;
      }

      mapPinMain.style.top = y + 'px';
      mapPinMain.style.left = x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        setMainPinPosition();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var activateMap = function () {
    mapFilter.disabled = false;
    mapFeatures.disabled = false;
    formHeader.disabled = false;

    formElement.forEach(function (item) {
      item.disabled = false;
    });
  };

  var activateForm = function () {
    if (form.classList.contains('ad-form--disabled')) {
      activateMap();
      sectionMap.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      window.renderPins(window.map.originalAds);
    }
  };

  var setMainPinPosition = function () {
    if (!window.map.originalAds) {
      window.backend.load(function (advertisements) {
        window.map.originalAds = advertisements;
        activateForm();
      });
    } else {
      activateForm();
    }

    var xActivePin = mapPinMain.offsetLeft + (ACTIVEPIN_WIDTH / 2);
    var yActivePin = mapPinMain.offsetTop + ACTIVEPIN_HEIGHT;
    window.calculateAddress(xActivePin, yActivePin);
  };

  var addAdsClickHandler = function (icon, advertisement) {
    icon.addEventListener('click', function () {
      closeCard();
      window.getAds(advertisement);
    });
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var closeCard = function () {
    var mapCard = document.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
    }
  };

  window.map = {
    addAdsClickHandler: addAdsClickHandler,
    disabledMap: disabledMap,
    address: address,
    removePins: removePins,
    closeCard: closeCard,
    sectionMap: sectionMap
  };
})();
