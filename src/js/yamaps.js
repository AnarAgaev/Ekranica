import $ from "jquery";

$(document).ready(function () {
    if ($("#map")[0]) {
        //- Функция ymaps.ready() будет вызвана, когда
        //- загрузятся все компоненты API, а также когда будет готово DOM-дерево.
        ymaps.ready(init);

        function init() {
            //- Создание карты.
            const myMap = new ymaps.Map("map", {
                //- Координаты центра карты.
                //- Порядок по умолчанию: «широта, долгота».
                //- Чтобы не определять координаты центра карты вручную,
                //- воспользуйтесь инструментом Определение координат.
                center: [55.7479725545345,37.53500662698359],
                //- Уровень масштабирования. Допустимые значения:
                //- от 0 (весь мир) до 19.
                zoom: 16,
                controls: [],
            });

            //- myMap.behaviors.disable('scrollZoom');
            //-
            //- //на мобильных устройствах... (проверяем по userAgent браузера)
            //- if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            //-     //... отключаем перетаскивание карты
            //-     myMap.behaviors.disable('drag');
            //- }


            //- Добавляем маленький zoom
            //- const zoomControl = new ymaps.control.ZoomControl({
            //-     options: {
            //-         position: {
            //-             left: 16,
            //-             top: 16
            //-         },
            //-         size: "small",
            //-     }
            //- });
            //- myMap.controls.add(zoomControl);

            // Добавляем свою метку
            const myPlacemark = new ymaps.Placemark(
                [55.747621568985565,37.53507099999993],
                {},
                {
                    //- Опции.
                    //- Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    //- Своё изображение иконки метки.
                    iconImageHref: '/img/map-label.svg',
                    //- Размеры метки.
                    iconImageSize: [106, 138],
                    //- Смещение левого верхнего угла иконки относительно
                    //- её "ножки" (точки привязки).
                    iconImageOffset: [-53, -138]
                }
            );
            myMap.geoObjects.add(myPlacemark);

        }
    }
});