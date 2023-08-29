// Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var map = new ymaps.Map("map", {
           // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 13.5,
            // Координаты центра карты.
            center: [55.764644, 37.620663]
        });
         // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 19
            // Создание геообъекта с типом точка (метка).
        var myPlacemark = new ymaps.Placemark([55.769535, 37.639985], {}, {
          iconLayout: 'default#image',
          iconImageHref: './images/svg/orange-circle.svg',
          iconImageSize: [12, 12],
          iconImageOffset: [0, 0]
        });

          // Размещение геообъекта на карте.
          map.geoObjects.add(myPlacemark);

          map.controls.remove('geolocationControl'); // удаляем геолокацию
          map.controls.remove('searchControl'); // удаляем поиск
          map.controls.remove('trafficControl'); // удаляем контроль трафика
          map.controls.remove('typeSelector'); // удаляем тип
          map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
          map.controls.remove('zoomControl'); // удаляем контрол зуммирования
          map.controls.remove('rulerControl'); // удаляем контрол правил

    }
