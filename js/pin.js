'use strict';

(function() {
  function renderPins(ads) {
    var mapPin = document.querySelector('.map__pins');
    var template = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      if (!ads[i].offer) {
        continue;
      }

      var mapPinElement = template.cloneNode(true);
      var author = ads[i].author;
      mapPinElement.querySelector('img').src = author.avatar;
      mapPinElement.style.left = ads[i].location.x + 'px';
      mapPinElement.style.top = ads[i].location.y + 'px';
      window.map.addAdsClickHandler(mapPinElement, ads[i]);
      fragment.appendChild(mapPinElement);
    }

    mapPin.appendChild(fragment);
  }

  window.renderPins = renderPins;
})();
