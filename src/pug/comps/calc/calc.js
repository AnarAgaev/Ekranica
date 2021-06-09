import $ from "jquery";
import IMask from "imask";

$(document).ready(function () {
    $(function handleClickOnAdditionallyControllersButtons() {
        let btns = $('.calc__collapse-controllers .btn');

        for ( let i = 0; i < btns.length; i++) {
            $(btns[i]).on(
                'click',
                () => toggleVisibleAdditionallyCalcControllers(btns[i]),
            );
        }
    });

    function toggleVisibleAdditionallyCalcControllers (btn) {
        const HIDDEN_TIMEOUT = 500; // take this param from css transition
        let container = $(btn).parent();

        if (isHidden(container)) {
            showEl(container);
        } else {
            hideEl(container, HIDDEN_TIMEOUT);
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

});