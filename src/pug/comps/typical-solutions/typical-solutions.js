import $ from "jquery";

$(document).ready(function () {
    const dots = $('.typical-solutions__dots .dot');

    if (dots.length > 0) {
        for (let i = 0; i < dots.length; i++) {
            $(dots[i]).on('click', function () {
                const numEl = $(this).index();
                const imgs = $(this).closest('.typical-solutions__gallary').find('.image');

                $('.typical-solutions__dots .dot').removeClass('active');
                $(this).addClass('active');

                $(imgs).removeClass('active');
                $(imgs[numEl]).addClass('active');
            });
        }
    }
});