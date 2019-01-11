'use strict';

(function () {
  var PINS_NUMBER = 5;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var DEBOUNCE_INTERVAL = 500;

  var mapFilter = document.querySelector('.map__filters-container');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var features = document.querySelectorAll('.map__features input');

  var debounce = function (cb) {
    var lastTimeout = null;

    return function() {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function() {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var selectType = function(ad) {
    if (housingType.value !== 'any') {
      return ad.offer.type === housingType.value;
    }

    return true;
  };

  var selectPrice = function(ad) {
    if (housingPrice.value === 'low') {
      return ad.offer.price < 10000;
    }

    if (housingPrice.value === 'hight') {
      return ad.offer.price > 50000;
    }

    if (housingPrice.value === 'middle') {
      return ad.offer.price > 10000 && ad.offer.price < 50000;
    }

    return true;
  };

  var selectRooms = function(ad) {
    if (housingRooms.value !== 'any') {
      return ad.offer.rooms === parseInt(housingRooms.value);
    }

    return true;
  };

  var selectGuests = function(ad) {
    if (housingGuests.value !== 'any') {
      return ad.offer.guests === parseInt(housingGuests.value);
    }

    return true;
  };



  var selectFeatures = function(ad) {

    var checkedFeatures = Array.from(features).filter(function(feature) {
      return feature.checked;
    })

    for (var i = 0; i < checkedFeatures.length; i++) {
      if (ad.offer.features.indexOf(checkedFeatures[i].value) === -1) {
        return false;
      }
    }

    return true;
  };

  var onFilterChange = function() {
    window.map.removePins();
    window.map.closeCard();

    var filteredAds = window.map.originalAds.filter(function(ad) {
      return (
        selectType(ad) &&
        selectPrice(ad) &&
        selectRooms(ad) &&
        selectGuests(ad) &&
        selectFeatures(ad)
      );
    });

    window.renderPins(filteredAds);
  };

  mapFilter.addEventListener('change', debounce(onFilterChange));
})();

