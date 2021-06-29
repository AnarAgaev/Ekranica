import $ from "jquery";

$(document).ready(function () {
    $('.custom-input')
        .toArray()
        .forEach(addHandlerClickOnCustomInput);

        function addHandlerClickOnCustomInput(el) {
            $(el).on(
                'click',
                handlerClickOnCustomInput
            );
        }

        function handlerClickOnCustomInput() {
            $(this).children('input').focus();
        }
});