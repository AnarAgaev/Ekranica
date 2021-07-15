import $ from "jquery";
import calcMonolithicScreen from './calc-monolithic-screen';
import calcCabinetScreen from './calc-cabinet-screen';
import checkCalcRentParameters from "./rent/check-calc-rent-parameters";
import calculatingRent from "./rent/calculating-rent";

$(document).ready(
    function () {
        $('.calculating')
            .toArray()
            .forEach(addHandleOnCalculatingBtnClick)

        function addHandleOnCalculatingBtnClick(el) {
            $(el).click(handleClickOnCalculatingBtn)
        }

        function handleClickOnCalculatingBtn() {
            SPINNER.addClass('visible');

            let calcType = MAIN_CALC_STATE.calcType;

            if (calcType === 'rentScreen') {
                checkCalcRentParameters();
                calculatingRent();
            } else {
                let executionType = MAIN_CALC_STATE[calcType]
                    .executionType;

                checkCalcPixelStep(executionType);
                checkCalcWidth();
                checkCalcHeight();

                switch (executionType) {
                    case 'monolithic':
                        calcMonolithicScreen();
                        break;
                    case 'cabinet':
                        calcCabinetScreen();
                        break;
                }
            }
        }

        function checkCalcPixelStep(executionType) {
            let calc = $(getActiveMainCalc()).attr('id')
            let pixelStep = MAIN_CALC_STATE[calc].pixelStep;

            if (pixelStep === undefined) {
                $(getClickableEl(calc, executionType)).click();
            }
        }
        
        function getClickableEl(calcType, executionType) {
            let items = $(getActiveMainCalc())
                .find('.calc-pixel-step')
                .find('.scroller')
                .children('.filter-controller');

            switch (calcType) {
                case 'outsideScreen':
                    return items[0];

                case 'insideScreen':
                    if (executionType === 'monolithic')
                        return items[7];
                    else
                        return items[0];
            }
        }

        function checkCalcWidth() {
            let calc = $(getActiveMainCalc()).attr('id')
            let width = MAIN_CALC_STATE[calc].width;

            if (width === undefined) {
                $(getActiveMainCalc())
                    .find('.label-controll__size-type-width')
                    .find('.custom-input input')
                    .focusout();
            }
        }

        function checkCalcHeight() {
            let calc = $(getActiveMainCalc()).attr('id')
            let height = MAIN_CALC_STATE[calc].height;

            if (height === undefined) {
                $(getActiveMainCalc())
                    .find('.label-controll__size-type-height')
                    .find('.custom-input input')
                    .focusout();
            }
        }
    }
);