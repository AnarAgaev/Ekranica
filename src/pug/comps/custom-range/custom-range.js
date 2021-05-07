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
            switch(stateProp) {
                case 'installment':
                    installmentMask.unmaskedValue = controller.value;
                    break;

                case 'firstPayment':
                    firstPaymentMask.unmaskedValue = controller.value;
                    break;
            }
        }

        installmentCalcState[$(controller).data('calcProperty')] = controller.value;

        $(statusBar).css('width', statusBarWidth + 'px');
        $(slider).css('left', sliderOffsetLeft + 'px');
    }

    if (ranges.length > 0) {
        for (let i = 0; i < ranges.length; i++) {
            $(ranges[i]).on('input',function () {
                setRange(this);
            });
        }
    }
});