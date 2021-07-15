import $ from "jquery";

$(document).ready(() => {
    $('.calc-rent-system-controll label')
        .toArray()
        .forEach(addHandleClickOnRentSystemControlToggle)

    function addHandleClickOnRentSystemControlToggle (el) {
        $(el).click(
            handleClickOnRentSystemControlToggle
        );
    }

    function handleClickOnRentSystemControlToggle () {
        let propName = $(this).data('calcProperty'),
            propValue = $(this).data('calcValue'),
            activeCalc = MAIN_CALC_STATE.calcType;

        MAIN_CALC_STATE[activeCalc][propName] = propValue;

        cleanCalcCurrentResult();

        if(isDebugMainCalcState) printMainState();
    }
});