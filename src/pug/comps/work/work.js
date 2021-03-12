import $ from "jquery";

$(document).ready(function () {
    // Animation items when user has scrolled screen to place of item
    const nums = $('.work__num');

    if (nums.length > 0) {

        function showNumLines () {
            $(nums).each(function () {
                let scrollTop = $(window).scrollTop();
                let windowHeight = $(window).height();
                let pointOfDisplay = windowHeight / 1.2;
                let offsetTopElement = $(this).offset().top;

                if ( offsetTopElement - pointOfDisplay < scrollTop ) {
                    if (!$(this).hasClass('animation')) {
                        $(this).addClass('animation');
                    }
                }
            });
        }

        showNumLines();

        // Show items on the page after scroll
        $(window).scroll(function () {
            showNumLines();
        });
    }
});
