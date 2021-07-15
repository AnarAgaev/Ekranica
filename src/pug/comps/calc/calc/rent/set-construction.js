import $ from "jquery";

$(document).ready(() => {
    $('.calc-rent-construction label')
        .toArray()
        .forEach(addHandleClickOnRentConstructionToggle)

    function addHandleClickOnRentConstructionToggle (el) {
        $(el).click(
            handleClickOnRentConstructionToggle
        );
    }

    function handleClickOnRentConstructionToggle () {
        let propName = $(this).data('calcProperty'),
            propValue = $(this).data('calcValue'),
            activeCalc = MAIN_CALC_STATE.calcType;

        MAIN_CALC_STATE[activeCalc][propName] = propValue;

        if(isDebugMainCalcState) printMainState();
    }
});