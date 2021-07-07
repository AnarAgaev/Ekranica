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

            $(this).prop("checked")
                ? showCalcHiddenController(controller)
                : hideCalcHiddenController(controller);
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
    }
);