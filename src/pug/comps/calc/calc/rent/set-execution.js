import $ from "jquery";
import { setRentPixelStepToState } from "./set-pixel-step";
import setRadioMarker from '../../../custom-slider-radio/custom-slider-radio';
import setCalcRentWidthToItsRange from "./set-width";
import setCalcRentHeightToItsRange from "./set-height";

$(document).ready(() => {
    $('.calc-rent-execution label')
        .toArray()
        .forEach(addHandleClickOnRentExecutionToggle)

    function addHandleClickOnRentExecutionToggle (el) {
        $(el).click(
            handleClickOnRentExecutionToggle
        );
    }

    function handleClickOnRentExecutionToggle () {
        setRentExecutionToState(this);
        setRentPixelStep(this);
        setCalcRentWidthToItsRange(this);
        setCalcRentHeightToItsRange(this);

        cleanCalcCurrentResult();
    }

    function setRentPixelStep(controller) {
        let pixelStepFlag = $(controller)
            .data('calcPixelStep'),

            pixelStepController = $('.rent-pixel-step')
                .find(`[data-calc-value="${pixelStepFlag}"]`);

        $(pixelStepController)
            .prev('input')
            .prop({'checked': true});

        setRentPixelStepToState(pixelStepController);
        setRadioMarker(pixelStepController);
    }
});

function setRentExecutionToState (controller) {
    let propName = $(controller).data('calcProperty');
    let propValue = $(controller).data('calcValue');
    let activeCalc = MAIN_CALC_STATE.calcType;

    MAIN_CALC_STATE[activeCalc][propName] = propValue;

    if(isDebugMainCalcState) printMainState();
}

export {
    setRentExecutionToState
};