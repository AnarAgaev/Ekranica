import $ from "jquery";

$(document).ready(
    function () {
        $('.hidden-label-controller')
            .toArray()
            .forEach(addHandlerOnHiddenLabelControllerChange)

        function addHandlerOnHiddenLabelControllerChange (el) {
            $(el).change(handleChangeOnHiddenLabelController);
        }

        function handleChangeOnHiddenLabelController () {
            let controller = $(this)
                .closest('.label-controll_checkbox')
                .next('.label-controll_hidden');

            if ($(this).prop("checked")) {
                showCalcHiddenController(controller);
                setValueOfHiddenCheckerToState(this);
            } else {
                hideCalcHiddenController(controller);
                removeValueOfHiddenCheckerToState(this);
            }
        }

        function showCalcHiddenController (controller) {
            let caption = $(controller)
                .find('.label-controll__caption');

            $(controller).removeClass('hide');

            setTimeout(
                () => {
                    $(controller).addClass('visible');
                    $(caption).addClass('visible');
                },
                100
            )
        }

        function setValueOfHiddenCheckerToState (self) {
            let prop = $(self).data('calcProperty');
            let calc = $(getActiveMainCalc()).attr('id');

           MAIN_CALC_STATE[calc][prop] = 1;
        }

        function hideCalcHiddenController (controller) {
            let caption = $(controller)
                .find('.label-controll__caption');

            $(controller).removeClass('visible');
            $(caption).removeClass('visible');

            setTimeout(
                () => {
                    $(controller).addClass('hide');
                },
                500
            );
        }

        function removeValueOfHiddenCheckerToState (self) {
            let prop = $(self).data('calcProperty');
            let calc = $(getActiveMainCalc()).attr('id');

            MAIN_CALC_STATE[calc][prop] = undefined;

            resetValueHiddenController (self);
        }

        function resetValueHiddenController (self) {
            let hiddenController = $(self)
                .closest('.label-controll_checkbox')
                .next('.label-controll_hidden');

            $(hiddenController)
                .find('.custom-select__item.active')
                .removeClass('active');

            $(hiddenController)
                .find('.custom-select__item:first-child')
                .addClass('active');

            setTimeout(
                () => $(hiddenController)
                    .find('.select-suffix__selected-item')
                    .text('1'),
                300
            )
        }
    }
);