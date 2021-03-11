import $ from "jquery";

$(document).ready(function () {
    window.actionStopper = true;

    /* It's the valid email function */
    window.validMail = function(mail) {
        let regular = /.+@.+\..+/i;
        return regular.test(mail);
    }

    /* It's the valid phone function */
    window.validPhone = function(phone) {
        let regular = /^(\+7)?(\d{3}?)?[\d]{11}$/;
        return regular.test(phone);
    }

    /* It's the valid date function */
    window.validDate = function(date) {
        let regular = /^\d{2}\.\d{2}\.\d{4}$/
        return regular.test(date);
    }

    function getScreenType () {
        window.isDesctop = window.innerWidth > 1859;
    }
    getScreenType();

    $(window).resize(function () {
        getScreenType();
    });

    // Animation items when user has scrolled screen to place of item
    const els = $('.animation-element');

    if (els.length > 0) {

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