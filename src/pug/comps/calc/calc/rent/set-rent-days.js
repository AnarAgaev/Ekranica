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

        setTimeout(
            () => setRentDaysMaskToState(mask),
            1000
        );

        $(el).on(
            'input',
            handleChangeRentDaysController
        );

        $(el).on(
            'blur',
            setDaysWordFormToRentDaysController
        )
    }

    function setRentDaysMaskToState (mask) {
        if (MAIN_CALC_STATE.rentScreen.mask === undefined)
            MAIN_CALC_STATE.rentScreen.mask = mask;
    }

    function handleChangeRentDaysController () {
        let calc = MAIN_CALC_STATE.calcType,
            prop = $(this).data('calcProperty'),
            mask = MAIN_CALC_STATE[calc].mask;

        MAIN_CALC_STATE[calc][prop] = mask.value === ''
            ? undefined
            : mask.value === '0'
                ? 1
                : Number.parseInt(mask.value);

        setDaysWordFormToRentDaysController();

        cleanCalcCurrentResult();

        if(isDebugMainCalcState) printMainState();
    }
});

export default function setDaysWordFormToRentDaysController () {
    let days = MAIN_CALC_STATE.rentScreen.rentDays,
        wordForm = getDaysWordForm(days),
        controller = $(getActiveMainCalc())
            .find('.calc-rent-days-controller')
            .find('.input-suffix__units');

    wordForm = days === undefined
        ? 'дни'
        : MAIN_CALC_STATE.rentScreen.mask.unmaskedValue === '0'
            ? 'дней'
            : wordForm;

    $(controller).text(wordForm);
}