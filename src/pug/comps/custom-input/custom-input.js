import $ from "jquery";

$(document).ready(function () {
    let customInputControllers = $('.custom-input');

    $(function handleClickOnCustomInputController () {
        $(customInputControllers).on(
            'click',
            function () {
                let controller = $(this).children('input');

                $(controller).attr('type', 'text');
                $(controller)[0].setSelectionRange(100,100);
                $(controller).attr('type', 'number');
                $(controller).focus();
            }
        );
    });
});