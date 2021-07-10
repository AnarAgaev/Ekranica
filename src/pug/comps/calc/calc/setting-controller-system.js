import $ from "jquery";

$(document).ready(
    function () {
        $('.calc-system-controll label')
            .toArray()
            .forEach(addHandlerOnSystemControllBtnClick);

        function addHandlerOnSystemControllBtnClick (el) {
            $(el).click(handleClickOnSystemControllBtn);
        }

        function handleClickOnSystemControllBtn () {
            let prop = $(this).data('calcProperty');
            let val = $(this).data('calcValue');
            let calc = $(getActiveMainCalc()).attr('id');

            MAIN_CALC_STATE[calc][prop] = val;

            cleanCalcCurrentResult();
        }
    }
);