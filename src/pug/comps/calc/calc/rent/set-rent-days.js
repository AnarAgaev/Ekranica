import $ from "jquery";

$(document).ready(() => {
    $('.calc-rent-days-controller input')
        .toArray()
        .forEach(addHandleChangeToRentDaysController)

    function addHandleChangeToRentDaysController (el) {
        $(el).on(
            'input',
            handleChangeRentDaysController
        );

        $(el).on(
            'blur',
            setDaysWordFormToRentDaysController
        )
    }

    function handleChangeRentDaysController () {
         let controller = !$(this).hasClass('custom-range__slide')
            ? this
            : $(this)
                .closest('.custom-range')
                .find('.custom-input')
                .find('input');

         let val = $(controller).val();

        if (val !== '') {
            if (val < 1) {
                $(controller).val('1');
                MAIN_CALC_STATE.rentScreen.rentDays = '1';
            } else if (val > 30) {
                $(controller).val('30');
                MAIN_CALC_STATE.rentScreen.rentDays = '30';
            } else MAIN_CALC_STATE.rentScreen.rentDays = val.toString();
        } else {
            MAIN_CALC_STATE.rentScreen.rentDays = undefined;
        }

        setDaysWordFormToRentDaysController();
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
        : wordForm

    $(controller).text(wordForm);
}