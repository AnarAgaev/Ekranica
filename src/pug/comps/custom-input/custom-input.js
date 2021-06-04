import $ from "jquery";

$(document).ready(function () {
    let customInputControllers = $('.custom-input');

    $(function handleClickOnCustomInputController () {
        $(customInputControllers).on(
            'click',
            function () {
                let controller = $(this).children('input');
                $(controller).focus();
            }
        );
    });
});