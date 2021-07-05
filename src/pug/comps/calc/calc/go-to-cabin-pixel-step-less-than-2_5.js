import $ from "jquery";

$(document).ready(
    function () {
        $('#mainCalc .calc-pixel-step .custom-select__item')
            .toArray()
            .forEach(addHandlerOnPixelStepClick);

        function addHandlerOnPixelStepClick(el) {
            $(el).click(
                handleOnPixelStepClick
            );
        }

        function handleOnPixelStepClick() {
            let val = $(this).data('calcValue');

            let pixelStep = typeof val === 'string'
                ? parseFloat(val.replace("," , "."))
                : val;

            let warning = $(this)
                .closest('.label-controll')
                .find('.label-controll__warning');

            let cabinBtn = $(this)
                .closest('.calc__body-controllers')
                .find('.calc-execution-type')
                .find('[data-calc-value="cabinet"]');

            let calcType = MAIN_CALC_STATE.calcType;
            let executionType = MAIN_CALC_STATE[calcType].executionType;

            if (pixelStep <= 2 && executionType === 'monolithic') {
                $(warning).text(
                    'Мы переключили Вас на кабинеты, ' +
                    'так как для экранов с шагом пикселя менее 2,5, ' +
                    'реализация возможна только на кабинетах.'
                );

                $(cabinBtn).click()

                setTimeout(
                    () => $(warning).addClass('visible'),
                    100
                );

                executionTypeTimer.pixelStep = setTimeout(
                    () => {
                        $(warning).removeClass('visible');
                        executionTypeTimer.pixelStep = undefined;
                    },
                    15000
                );

                MAIN_CALC_STATE.insideScreen.executionType = 'cabinet';
            }
        }
    }
);