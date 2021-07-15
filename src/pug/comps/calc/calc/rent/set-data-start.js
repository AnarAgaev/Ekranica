import $ from "jquery";

export default function setCalcRentDataStartToState(...date) {
    let activeCalc = MAIN_CALC_STATE.calcType,

        prop = $('#datepickerRentDateStart')
            .data('calcProperty');

    MAIN_CALC_STATE[activeCalc][prop] = date.join('.');

    cleanCalcCurrentResult();

    if(isDebugMainCalcState) printMainState();
}