import $ from "jquery";
import 'jquery-ui/ui/widgets/datepicker'
import 'jquery-ui/themes/base/datepicker.css'
import 'jquery-ui/themes/base/theme.css'

$(document).ready(function () {
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $(function initDatepicker () {
        $('#datepickerRentInstallment').datepicker({
            minDate: 0,
            onSelect: handleSelectOnDate
        });
    });

    function handleSelectOnDate (dateText, inst) {
        let dateArr = dateText.split('.');
        let day = dateArr[0];
        let month = dateArr[1];
        let year = dateArr[2];

        setDateToController(this, day, month, year);
    }

    function setDateToController (controller, day, month, year) {
        let parentContainer = $(controller).parent();
        let dayContainer = $(parentContainer).children('.day');
        let monthContainer = $(parentContainer).children('.month');
        let yearContainer = $(parentContainer).children('.year');

        $(parentContainer).removeClass('not-selected');
        $(dayContainer).text(day);
        $(monthContainer).text(month);
        $(yearContainer).text(year);
    }
});