(function() {
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');
  var timeinInput = document.querySelector('#timein');
  var timeoutInput = document.querySelector('#timeout');

  //функция, определяющая минимальную цену за ночь
  var defineMinPrice = function () {
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

  //отлавливание события выбора цены за ночь
  typeInput.addEventListener('change', function() {
    defineMinPrice();
  })

  //отлавливание события выбора времени заезда
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
  //отлавливание события выбора времени выезда
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

  roomNumberInput.addEventListener('change', function() {
    validateRoom();
  })

  capacityInput.addEventListener('change', function() {
    validateRoom();
  })

  var validateRoom = function () {
      capacityInput.setCustomValidity('');

    if (roomNumberInput.value === '1') {
      if (capacityInput.value === '3' || capacityInput.value ==='2' || capacityInput.value ==='0') {
        capacityInput.setCustomValidity('для одной комнаты доступен только вариант "для 1 гостя"')
      }
    } else if (roomNumberInput.value === '2') {
        if (capacityInput.value === '3' || capacityInput.value === '0') {
          capacityInput.setCustomValidity('для 2х комнат доступены варианты "«для 2 гостей» или «для 1 гостя»')
        }
    } else if (roomNumberInput.value === '3') {
        if (capacityInput.value === '0') {
          capacityInput.setCustomValidity('для 3х комнат доступены варианты «для 3 гостей», «для 2 гостей» или «для 1 гостя»')
        }
    } else if (roomNumberInput.value === '100') {
        if (capacityInput.value === '3' || capacityInput.value === '2' || capacityInput.value === '1') {
          capacityInput.setCustomValidity('для 100 комнат доступен только вариант "не для гостей"')
        }
      }
  }

  var calculateAddress = function (x, y) {
    window.map.address.value = Math.round(x) + ', ' + Math.round(y);
  }

  var mainSection = document.querySelector('main');
  var notice = document.querySelector('.notice');

  var showSuccessMessage = function () {
    var templateSuccess = document.querySelector('#success');
    var successMessage = templateSuccess.cloneNode(true);

    mainSection.insertBefore(successMessage, notice);

    document.addEventListener('keydown', function(evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        mainSection.removeChild(mainSection.lastElementChild);
      }
    });
  };

  var showErrorMessage = function () {
    var templateError = document.querySelector('#error');
    var errorMessage = templateError.cloneNode(true);

    mainSection.insertBefore(errorMessage, notice);

    document.addEventListener('keydown', function(evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        mainSection.removeChild(mainSection.lastElementChild);
      }
    })
  };

  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function (response) {
      form.reset();
      window.map.disabledMap();
      showSuccessMessage();
    }, function(response) {
      showErrorMessage();
    });
    evt.preventDefault();
  });

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function() {
    form.reset();
    window.map.disabledMap();
  });

  window.calculateAddress = calculateAddress;
})();
