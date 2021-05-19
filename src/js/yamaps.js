import $ from "jquery";

$(document).ready(function () {
    if ($("#map")[0]) {
        //- Функция ymaps.ready() будет вызвана, когда
        //- загрузятся все компоненты API,
        //- а также когда будет готово DOM-дерево.
        ymaps.ready(init);

        function init() {
            //- Создание карты.
            const myMap = new ymaps.Map("map", {
                //- Координаты центра карты.
                //- Порядок по умолчанию: «широта, долгота».
                center: [55.7479725545345,37.53500662698359],
                //- Уровень масштабирования.
                //- Допустимые значения: от 0 (весь мир) до 19.
                zoom: 16,
                controls: [],
            });

            // Добавляем свою метку
            const myPlacemark = new ymaps.Placemark(
                [55.747621568985565,37.53507099999993],
                {},
                {
                    //- Тип метки.
                    iconLayout: 'default#image',
                    //- Адрес изображение иконки метки.
                    iconImageHref: '/img/map-label.svg',
                    //- Размеры метки.
                    iconImageSize: [56, 56],
                    //- Смещение левого верхнего угла
                    //- иконки относительно точки привязки.
                    iconImageOffset: [-28, -56]
                }
            );
            myMap.geoObjects.add(myPlacemark);
        }
    }
});