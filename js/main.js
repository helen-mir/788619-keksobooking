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

    mapPinMain.style.top = y + 'px';
    mapPinMain.style.left = x + 'px';
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
