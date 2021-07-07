import $ from "jquery";

import calcMonolithicScreen from './calc-monolithic-screen';
import calcCabinetScreen from './calc-cabinet-screen';

$(document).ready(
    function () {
        $('.calculating')
            .toArray()
            .forEach(addHandleOnCalculatingBtnClick)

        function addHandleOnCalculatingBtnClick(el) {
            $(el).click(handleClickOnCalculatingBtn)
        }

        function handleClickOnCalculatingBtn(evt) {
            SPINNER.addClass('visible');

            checkCalcPixelStep();
            checkCalcWidth();
            checkCalcHeight();

            let calcType = MAIN_CALC_STATE.calcType;
            let executionType = MAIN_CALC_STATE[calcType].executionType;

            switch (executionType) {
                case 'monolithic':
                    calcMonolithicScreen();
                    break;
                case 'cabinet':
                    calcCabinetScreen();
                    break;
            }
        }

        function checkCalcPixelStep() {
            let calc = $(getActiveMainCalc()).attr('id')
            let pixelStep = MAIN_CALC_STATE[calc].pixelStep;

            if (pixelStep === undefined) {
                $(getActiveMainCalc())
                    .find('.calc-pixel-step')
                    .find('.scroller')
                    .children('.filter-controller:first-child')
                    .click();
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