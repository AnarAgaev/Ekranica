import $ from 'jquery';

export default function checkCalcRentParameters () {
    let calc = MAIN_CALC_STATE.calcType,
        state = MAIN_CALC_STATE[calc];

    checkCalcRentExecution(state);
    checkCalcRentWidth(state);
    checkCalcRentHeight(state);
    checkCalcRentConstruction(state);
    checkCalcRentSystemControl(state);
    checkCalcRentDays(state);
}

function checkCalcRentExecution (state) {
    if (state.execution === undefined) {
        $(getActiveMainCalc())
            .find('.calc-rent-execution')
            .find('[data-calc-value="inner"]')
            .click();
    }
}

function checkCalcRentWidth (state) {
    if (state.width === undefined) {
        $(getActiveMainCalc())
            .find('.label-controll__size-type-width')
            .find('.custom-input')
            .find('input')
            .blur();
    }
}

function checkCalcRentHeight (state) {
    if (state.height === undefined) {
        $(getActiveMainCalc())
            .find('.label-controll__size-type-height')
            .find('.custom-input')
            .find('input')
            .blur();
    }
}

function checkCalcRentConstruction (state) {
    if (state.construction === undefined) {
        $(getActiveMainCalc())
            .find('.calc-rent-construction')
            .find('[data-calc-value="floor"]')
            .click();
    }
}

function checkCalcRentSystemControl (state) {
    if (state.systemControl === undefined) {
        $(getActiveMainCalc())
            .find('.calc-rent-system-controll')
            .find('[data-calc-value="controller"]')
            .click();
    }
}

function checkCalcRentDays (state) {
    if (state.rentDays === undefined) {
        state.rentDays = 1;
        state.mask.unmaskedValue = '1';
    }
}
