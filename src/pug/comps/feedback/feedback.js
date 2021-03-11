import $ from "jquery";

$(document).ready(function () {
    $('.feedback__pic').each(function (i, el) {

        const msg = $(el).parent().children('.feedback__msg');

        function handlerIn () {
            if (isDesctop) {
                $(msg).addClass('hover');
            }
        }

        function handlerOut () {
            if (isDesctop) {
                $(msg).removeClass('hover');
            }
        }

        $(el).hover(handlerIn, handlerOut);
    });
});