import $ from "jquery";

$(document).ready(function () {
    const typesBtns = $('.types__btn');

    $(typesBtns).each( function(i, el) {
        const card = $(el).closest('.types__card');

        $(el).on('click', function () {
            if ( $(card).hasClass('open') ) {
                $(card).removeClass('open');
            } else {
                $('.types__card').removeClass('open');
                $(card).addClass('open');
            }
        });
    });
});