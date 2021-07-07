import $ from "jquery";

$(document).ready(
    function () {
        $('.label-controll_hidden .custom-select__item')
            .toArray()
            .forEach(addHandlerOnHiddenSelectItemClick);

        function addHandlerOnHiddenSelectItemClick (el) {
            $(el).click(handleClickOnHiddenSelectItem);
        }

        function handleClickOnHiddenSelectItem () {
            let prop = $(this).data('calcProperty');
            let val = $(this).data('calcValue');
            let calc = $(getActiveMainCalc()).attr('id');

            MAIN_CALC_STATE[calc][prop] = val;
        }
    }
);