import $ from "jquery";

$(document).ready(function () {
    $('.feedback__pic').each(function (i, el) {

        const msg = $(el).parent().children('.feedback__msg');

        function handlerIn () {
            if (isLaptop) {
                $(msg).addClass('hover');
            }
        }

        function handlerOut () {
            if (isLaptop) {
                $(msg).removeClass('hover');
            }
        }

        $(el).hover(handlerIn, handlerOut);
    });
});