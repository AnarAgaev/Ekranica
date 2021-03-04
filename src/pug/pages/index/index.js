import $ from "jquery";

$(document).ready(function () {

    if ( $('body').hasClass('page-index') ) {

        // Loading bar on Index page
        const bar = new ldBar(".ldBar");
        bar.set(
            100, // target value
            true, // enable animation. default is true
        );

        $('body').addClass('loading');

        setTimeout(function () {
            $('.loading-container').addClass('hide');
        }, 1200);

        setTimeout(function () {
            $('body')
                .addClass('loaded')
                .css('overflow-y', 'auto');

            $('.loading-container').css('left', '-99999px');
        }, 2000);

        setTimeout(function () {
            $('body').removeClass('loading loaded');
            $('.loading-container').remove();

        }, 3500);


        // Animation items on index page when user is scrolling screen
        const els = $('.animation-element');

        function showAnimElements (els) {
            let scrollTop = $(window).scrollTop();
            let windowHeight = $(window).height();
            let pointOfDisplay = windowHeight / 1.2;

            $(els).each(function () {
                let offsetTopElement = $(this).offset().top;

                if ( offsetTopElement - pointOfDisplay < scrollTop ) {
                    $(this).removeClass('animation-element');
                }
            });
        }

        showAnimElements(els);

        // Show items on the page after scroll
        $(window).scroll(function () {
            showAnimElements(els);
        });
    }
});
