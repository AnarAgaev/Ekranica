import $ from "jquery";

$(document).ready(
    function () {
        $(() => $('.calc__collapse-controllers .btn')
            .toArray()
            .forEach(addHandleClickToBtnAdditionallyCalcControllers));

        function addHandleClickToBtnAdditionallyCalcControllers(el) {
            $(el).on(
                'click',
                toggleVisibleAdditionallyCalcControllers
            );
        }

        function toggleVisibleAdditionallyCalcControllers () {
            const HIDDEN_TIMEOUT = 500; // take this param from css transition
            let container = $(this).parent();

            if (isHidden(container)) {
                showEl(container);
                addAnimationToCalcCheckers(container);
            } else {
                hideEl(container, HIDDEN_TIMEOUT);
                removeAnimationToCalcCheckers();
            }
        }

        function isHidden(el) {
            return $(el).hasClass('hidden');
        }

        function showEl(el) {
            $(el).removeClass('hidden');
            $(el).addClass('open');
        }

        function hideEl(el, timeout) {
            $(el).removeClass('open');

            setTimeout(
                () => {
                    $(el).addClass('hidden');
                },
                timeout
            )
        }

        function addAnimationToCalcCheckers (container) {
            $(container)
                .find('.label-controll_checkbox')
                .not('.hide')
                .toArray()
                .filter(
                    el => !$(el)
                        .find('input')
                        .prop('checked')
                )
                .forEach(
                    (el, idx) => animateCalcChecker(el, idx)
                );
        }

        function animateCalcChecker(el, idx) {
            let checkmark = $(el)
                .find('.custom-checkbox__checkmark');

            setTimeout(
                () => $(checkmark).addClass('highlight'),
                idx * 400
            );
        }

        function removeAnimationToCalcCheckers() {
            $('.custom-checkbox__checkmark.highlight')
                .removeClass('highlight');
        }
    }
);