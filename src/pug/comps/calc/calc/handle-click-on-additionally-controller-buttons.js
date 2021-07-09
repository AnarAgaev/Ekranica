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
                    (el, idx, arr) => animateCalcChecker(el, idx, arr)
                );
        }

        function animateCalcChecker(el, idx, arr) {
            let checkmark = $(el)
                .find('.custom-checkbox__checkmark');

            console.log()

            setTimeout(
                () => {
                    $(checkmark).addClass('highlight');

                    setTimeout(
                        () => $(checkmark).removeClass('highlight'),
                        arr.length * 70
                    );
                },
                idx * 70
            );
        }

        function removeAnimationToCalcCheckers() {
            $('.custom-checkbox__checkmark.highlight')
                .removeClass('highlight');
        }
    }
);