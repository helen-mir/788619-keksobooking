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

var INACTIVEPIN_WIDTH = 156;
var INACTIVEPIN_HEIGHT = 156;
var ACTIVEPIN_WIDTH = 62;
var ACTIVEPIN_HEIGHT = 84;

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

function renderPins(ads) {
  var mapPin = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    var mapPinElement = template.cloneNode(true);
    var author = ads[i].author;
    mapPinElement.querySelector('img').src = author.avatar;
    mapPinElement.style.left = ads[i].location.x + 'px';
    mapPinElement.style.top = ads[i].location.y + 'px';
    addAdsClickHandler(mapPinElement, ads[i]);
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

//запись в инпут координат метки в неактивном состоянии
var address = document.querySelector('#address');
var mapPinMain = document.querySelector('.map__pin--main');
address.value = Math.round(mapPinMain.offsetLeft + (INACTIVEPIN_WIDTH / 2)) + ', ' + Math.round(mapPinMain.offsetTop + (INACTIVEPIN_HEIGHT / 2));

//активное состояние
var mapPinMain = document.querySelector('.map__pin--main');
//реализация перемещения метки!!!!!
mapPinMain.addEventListener('mousedown', function(evt) {
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

    mapPinMain.style.top = y + 'px';
    mapPinMain.style.left = x + 'px';

    //ограничение перетаскивания маркера внутри карты
    if (x < MIN_X) {
      x = MIN_X;
    }

    if (x > MAX_X) {
      x = MAX_X;
    }

    if (y < MIN_Y) {
      y = MIN_Y;
    }

    if (y > MAX_Y) {
      y = MAX_Y;
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault)
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

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

  //при активации записываются следующие координаты метки в инпут
  address.value = Math.round(mapPinMain.offsetLeft + (ACTIVEPIN_WIDTH/2)) + ', ' + Math.round(mapPinMain.offsetTop + ACTIVEPIN_HEIGHT);
  })

//Нажатие на метку похожего объявления на карте, приводит к показу карточки с подробной информацией об этом объявлении.
//Получается, что для меток должны быть созданы обработчики событий, которые вызывают показ карточки с соответствующими данными.
var advertisementsList = generateAds();
var advertisements = document.querySelector('.full-photo');

var addAdsClickHandler = function (icon, advertisement) {
  icon.addEventListener('click', function () {
    getAds(advertisement);
  });
};

//#17 Личный проект: доверяй, но проверяй
var typeInput = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var roomNumberInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');
var timeinInput = document.querySelector('#timein');
var timeoutInput = document.querySelector('#timeout');

//пункт 2.3 из ТЗ
//функция, определяющая минимальную цену за ночь
var defineMinPrise = function () {
  var price;

  if (typeInput.value === 'bungalo') {
    price = 0;
  } else if (typeInput.value === 'flat') {
    price = 1000;
  } else if (typeInput.value === 'house') {
    price = 5000;
  } else if (typeInput.value === 'palace') {
    price = 10000;
  }

  if (priceInput.value < price) {
    priceInput.setCustomValidity('минимальная стоимость для выбранного типа жилья ' + price)
  } else {
    priceInput.setCustomValidity('')
    }

  priceInput.min = priceInput.placeholder = price;
}

//нужно отловить событие выбора цены за ночь
typeInput.addEventListener('change', function() {
  defineMinPrise();
})

//пункт 2.5 из ТЗ
//нужно отловить событие выбора времени заезда
timeinInput.addEventListener('change', function() {
  //изменение времени выезда
  if (timeinInput.value === '14:00') {
    timeoutInput.value = '14:00'
  } else if (timeinInput.value === '13:00'){
    timeoutInput.value = '13:00'
  } else if (timeinInput.value === '12:00'){
    timeoutInput.value = '12:00'
  }
})
//нужно отловить событие выбора времени выезда
timeoutInput.addEventListener('change', function() {
  //изменение времени въезда
    if (timeoutInput.value === '14:00') {
    timeinInput.value = '14:00'
  } else if (timeoutInput.value === '13:00'){
    timeinInput.value = '13:00'
  } else if (timeoutInput.value === '12:00'){
    timeinInput.value = '12:00'
  }
})

//пункт 2.6 из ТЗ
roomNumberInput.addEventListener('change', function() {
  validateRoom();
})

capacityInput.addEventListener('change', function() {
  validateRoom();
})

var validateRoom = function () {
    capacityInput.setCustomValidity('');

  if (roomNumberInput.value === '1') {
    //вариант "для 1 гостя"
    if (capacityInput.value === '3' || capacityInput.value ==='2' || capacityInput.value ==='0') {
      capacityInput.setCustomValidity('для одной комнаты доступен только вариант "для 1 гостя"')
    }
  } else if (roomNumberInput.value === '2') {
    //вариант «для 2 гостей» или «для 1 гостя»
      if (capacityInput.value === '3' || capacityInput.value === '0') {
        capacityInput.setCustomValidity('для 2х комнат доступены варианты "«для 2 гостей» или «для 1 гостя»')
      }
  } else if (roomNumberInput.value === '3') {
    //вариант «для 3 гостей», «для 2 гостей» или «для 1 гостя»
      if (capacityInput.value === '0') {
        capacityInput.setCustomValidity('для 3х комнат доступены варианты «для 3 гостей», «для 2 гостей» или «для 1 гостя»')
      }
  } else if (roomNumberInput.value === '100') {
    //вариант "не для гостей"
      if (capacityInput.value === '3' || capacityInput.value === '2' || capacityInput.value === '1') {
        capacityInput.setCustomValidity('для 100 комнат доступен только вариант "не для гостей"')
      }
    }
}
