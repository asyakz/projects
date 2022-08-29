// Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
           // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 14,
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.75846806898367,37.60108849999989],
            controls: ['geolocationControl','zoomControl',],
            // Зададим опции для элементов управления.
            geolocationControlFloat: 'right',
            zoomControlFloat: 'right',
        });
         // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 14

            // Создание геообъекта с типом точка (метка).

        var myPlacemark = new ymaps.Placemark(myMap.getCenter([55.75846806898367,37.60108849999989]), {}, {
          iconLayout: 'default#image',
          iconImageHref: '../img/marker-map.svg',
          iconImageSize: [20, 20],
          iconImageOffset: [0, 0]
        });

          // Размещение геообъекта на карте.

          myMap.geoObjects.add(myPlacemark);

    }
