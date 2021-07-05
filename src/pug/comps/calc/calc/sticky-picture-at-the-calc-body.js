import $ from "jquery";

$(document).ready(
    function () {
        $(window).scroll(function () {
            let container = $('.calc__calculator.active .calc__body-picture')[0];
            if (container) toggleStickyImg(container);
        });

        function toggleStickyImg(container) {
            let offsetTop = container.getBoundingClientRect().top;
            let pic = $(container).children('.calc__body-image');
            let stickyLeft = container.getBoundingClientRect().x;

            const STICKY_TOP = 150; // take this prop from css style

            if (offsetTop <= STICKY_TOP) {
                $(pic).addClass('sticky');
                $(pic).css('left', stickyLeft + 'px');
            } else {
                $(pic).removeClass('sticky');
                $(pic).attr('style', '');
            }
        }

        $(window).resize(resetStickyPics);

        function resetStickyPics () {
            let pics = $('.calc__body-image');

            $(pics).removeClass('sticky');
            $(pics).attr('style', '');
        }
    }
);