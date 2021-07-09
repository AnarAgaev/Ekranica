import $ from "jquery";

$(document).ready(
    function () {
        $('.calc-content-controller label')
            .toArray()
            .forEach(addHandlerOnContentControllerBtnClick);

        function addHandlerOnContentControllerBtnClick (el) {
            $(el).click(handleClickOnContentControllerBtn);
        }

        function handleClickOnContentControllerBtn () {
            let prop = $(this).data('calcProperty');
            let val = $(this).data('calcValue');
            let calc = $(getActiveMainCalc()).attr('id');

            MAIN_CALC_STATE[calc][prop] = val;
        }
    }
);