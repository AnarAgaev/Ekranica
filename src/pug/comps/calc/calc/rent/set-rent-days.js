import $ from "jquery";
import IMask from "imask";

$(document).ready(() => {
    $('.calc-rent-days-controller input')
        .toArray()
        .forEach(addHandleChangeToRentDaysController)

    function addHandleChangeToRentDaysController (el) {
        let mask = IMask(el, {
            mask: Number,
            scale: 0,  // digits after point, 0 for integers
            signed: false,  // disallow negative
            min: 1,
            max: 365
        });

        $(el).on(
            'input',
            { mask },
            handleChangeRentDaysController
        );
    }

    function handleChangeRentDaysController (event) {
        let calc = MAIN_CALC_STATE.calcType,
            prop = $(this).data('calcProperty'),
            mask = event.data.mask;

        MAIN_CALC_STATE[calc][prop] = mask.value === ''
            ? undefined
            : Number.parseInt(mask.value);

        if (MAIN_CALC_STATE[calc].mask === undefined)
            MAIN_CALC_STATE[calc].mask = mask;

        if(isDebugMainCalcState) printMainState();
    }
});