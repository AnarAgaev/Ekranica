import $ from "jquery";

/*
 * These scripts for setting the width
 * and height of the screen to its state
 * and the range controllers.

 * Setting value of width and height controllers
 * location in src/pug/comps/custom-range/custom-range.js
 *
 */

$(document).ready(
    function () {
        $('#mainCalc .custom-range .custom-input input')
            .toArray()
            .forEach(addHandlersOnCalcRangeInput);

        function addHandlersOnCalcRangeInput(el) {
            $(el).focusout(
                handleOnFocusoutCalcRangeInput
            );

            $(el).focusout(
                hideCalcRangeInputErrors
            );

            $(el).on(
                'input',
                handleOnChangeCalcRangeInput
            );
        }

        function handleOnChangeCalcRangeInput() {
            let msg = getErrorRangeInputMessage(this);
            let error = $(this)
                .closest('.custom-range')
                .find('.custom-range__value-error');

            if (msg === undefined) {
                hideCalcRangeInputErrors();
            } else {
                $(error).html(msg);
                $(error).addClass('visible');
            }

            cleanCalcCurrentResult();
        }

        function getErrorRangeInputMessage(input) {
            console.log($(input))

            let val = parseInt($(input).val(), 10);
            let min = parseInt($(input).data('min'), 10);
            let max = parseInt($(input).data('max'), 10);
            let whole = Math.trunc(val / min);
            let defaultTxt = $(input)
                .closest('.custom-range')
                .find('.custom-range__value-error')
                .data('defaultTxt');

            let less = (min * whole) < min
                ? min
                : min * whole;

            let more = (min * (whole + 1)) > max
                ? max
                : min * (whole + 1);

            if (Number.isNaN(val)) return undefined; // for blank strings
            if (val % min === 0) return undefined; // for correct value
            if (val < min) return defaultTxt + '<br>Ближайшее допустимое значение ' + min + '.'
            if (val > max) return defaultTxt + '<br>Ближайшее допустимое значение ' + max + '.'

            return defaultTxt + '<br>Ближайшие допустимые значения ' + less + ' и ' + more + '.';
        }

        function hideCalcRangeInputErrors() {
            $('#mainCalc .custom-range__value-error')
                .removeClass('visible');
        }

        function handleOnFocusoutCalcRangeInput() {
            let value = getRoundRangeVal(this);

            pushValToInputValue(value, this);
            pushValToRange(value, this);
        }

        function pushValToInputValue(value, input) {
            $(input).val(value);
        }

        function pushValToRange(value, input) {
            let range = $(input)
                .closest('.custom-input')
                .next('.custom-range__controller')
                .find('.custom-range__slide')[0];

            $(range).val(value);
            setRange(range, false);

            cleanCalcCurrentResult();
        }

        function getRoundRangeVal(input) {
            let val = parseInt($(input).val(), 10);
            let min = parseInt($(input).data('min'), 10);
            let max = parseInt($(input).data('max'), 10);

            if (Number.isNaN(val)) return min; // for blank strings
            else if (val < min) return min;
            else if (val > max) return max;
            else if (val % min === 0) return val;

            let wholeNumber = Math.trunc(val / min) + 1;
            let roundVal = min * wholeNumber;

            return roundVal > max
                ? max
                : roundVal;
        }
    }
);