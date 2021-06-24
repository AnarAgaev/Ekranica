import $ from "jquery";

$(document).ready(function () {
    const ranges = $('input[type="range"]');

    window.setRange = function (controller, setValue = true) {

        const statusBar = $(controller)
            .closest('.custom-range')
            .find('.status-bar');

        const slider = $(controller)
            .closest('.custom-range')
            .find('.slider');

        let containerWidth,
            partsWidth,
            statusBarWidth,
            partsSliderWidth,
            sliderOffsetLeft,
            stateProp;

        containerWidth = $(controller)[0].offsetWidth + $(controller)[0].offsetLeft - 8;
        partsWidth = containerWidth / ($(controller)[0].max - $(controller)[0].min);
        statusBarWidth = (controller.value - $(controller)[0].min) * partsWidth;
        partsSliderWidth = ($(controller)[0].offsetWidth - $(slider).width()) / ($(controller)[0].max - $(controller)[0].min);
        sliderOffsetLeft = (controller.value - $(controller)[0].min) * partsSliderWidth;
        stateProp = $(controller).data('calcProperty');

        if (setValue) {
            setValueInControllerInput(controller, stateProp);
        }

        if ($('.payment__calc').length > 0) {
            installmentCalcState[$(controller).data('calcProperty')] = controller.value;
        }

        // set value into main calc state
        if ($('#mainCalc')[0]) {
            let calc = $(getActiveMainCalc()).attr('id');
            MAIN_CALC_STATE[calc][stateProp] = controller.value;
        }

        $(statusBar).css('width', statusBarWidth + 'px');
        $(slider).css('left', sliderOffsetLeft + 'px');
    }

    // Handle change value into the input type range
    if (ranges.length > 0) {
        for (let i = 0; i < ranges.length; i++) {
            $(ranges[i]).on('input',function () {
                setRange(this);
            });
        }
    }

    // Set value to the iMask input after the input type range has changed
    function setValueInControllerInput(controller, stateProp) {
        switch(stateProp) {
            case 'installment':
                installmentMask.unmaskedValue = controller.value;
                break;

            case 'firstPayment':
                firstPaymentMask.unmaskedValue = controller.value;
                break;

            case 'quizDistance':
                quizDistanceMask.unmaskedValue = controller.value;
                break;

            case 'quizSizeWidth':
                quizSizeWidthMask.unmaskedValue = controller.value;
                break;

            case 'quizSizeHeight':
                quizSizeHeightMask.unmaskedValue = controller.value;
                break;

            case 'width':
                setRangeValToInputControllerOnMainCalc(controller);
                break;

            case 'height':
                setRangeValToInputControllerOnMainCalc(controller);
                break;
        }
    }

    function setRangeValToInputControllerOnMainCalc(controller) {
        let input = $(controller)
            .closest('.custom-range')
            .children('.custom-input')
            .children('input');

        $(input).val(controller.value);
    }
});