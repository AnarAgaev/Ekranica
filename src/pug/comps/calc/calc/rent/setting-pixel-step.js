import $ from "jquery";
import { setRentExecutionToState } from "./setting-execution";
import setRadioMarker from '../../../custom-slider-radio/custom-slider-radio';

$(document).ready(() => {
    $('.rent-pixel-step label')
        .toArray()
        .forEach(addHandleClickOnRentPixelStepToggle)

    function addHandleClickOnRentPixelStepToggle (el) {
        $(el).click(
            handleClickOnRentPixelStepToggle
        );
    }

    function handleClickOnRentPixelStepToggle () {
        setRentPixelStepToState(this);
        setRentExecution(this);
    }

    function setRentExecution(controller) {
        let executionFlag = $(controller)
            .data('calcExecution'),

            executionController = $('.calc-rent-execution')
                .find(`[data-calc-value="${executionFlag}"]`);

        $(executionController)
            .prev('input')
            .prop({'checked': true});

        setRentExecutionToState(executionController);
        setRadioMarker(executionController);
    }
});

function setRentPixelStepToState (controller) {
    let propName = $(controller).data('calcProperty');
    let propValue = $(controller).data('calcValue');
    let activeCalc = MAIN_CALC_STATE.calcType;

    MAIN_CALC_STATE[activeCalc][propName] = propValue;

    if(isDebugMainCalcState) printMainState();
}

export {
    setRentPixelStepToState
};