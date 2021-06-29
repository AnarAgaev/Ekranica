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

    $('.custom-range .custom-input input')
        .toArray()
        .forEach(addHandlerChangeOnCustomInputRange);

        function addHandlerChangeOnCustomInputRange(el) {
            $(el).focusout(handlerChangeOnCustomInputRange);
        }

        function handlerChangeOnCustomInputRange() {
            if ($(this).attr('type') === 'text') {
                $(this)[0].setSelectionRange(100,100);
            } else if ($(this).attr('type') === 'number') {
                $(this).attr('type', 'text');
                $(this)[0].setSelectionRange(100,100);
                $(this).attr('type', 'number');
            }
        }
});