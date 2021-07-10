import $ from "jquery";

$(document).ready(
    function () {
        $('.calc-pixel-step .filter-controller')
            .toArray()
            .forEach(addHandleClickToPixelStepController)

        function addHandleClickToPixelStepController(el) {
            $(el).on(
                'click',
                handleClickToPixelStepController
            );
        }

        function handleClickToPixelStepController () {
            let propName = $(this).data('calcProperty');
            let propValue = $(this).data('calcValue'); // DON'T PARSE TO THE NUMBER TYPE! MAST BE TYPE STRING!
            let activeCalc = MAIN_CALC_STATE.calcType;

            MAIN_CALC_STATE[activeCalc][propName] = propValue;

            cleanCalcCurrentResult();

            if(isDebugMainCalcState) printMainState();
        }
    }
);