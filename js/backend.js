'use strict';

(function() {
  var Code = {
    SUCCESS: 200,
    INVALID: 400,
    NOT_FOUND: 404
  };

  var URL = {
    load: 'https://js.dump.academy/keksobooking/data',
    upload: 'https://js.dump.academy/keksobooking'
  };

  var xhrSend = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.SUCCESS:
          onLoad(xhr.response);
          break;
        case Code.INVALID:
          onError('Неверный запрос');
          break;
        case Code.NOT_FOUND:
          onError('Ничего не найдено');
          break;
        default:
          onError('Неизвестный результат ошибки: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = 10000;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = xhrSend(onLoad, onError);
    xhr.open('GET', URL.load);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = xhrSend(onLoad, onError);
    xhr.open('POST', URL.upload);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
