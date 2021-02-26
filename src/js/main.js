$(document).ready(function () {
    window.actionStopper = true;


    function getScreenType () {
        window.isDesctop = $(document).width() > 1919;
    }
    getScreenType();

    // HEADER
    // Listening hover for desktop viewport size
    $('header .dropdown').each(function (i, el) {
        function handlerIn () {
            if (isDesctop) {
                $('#navLine').addClass('visible');
                $('#header').addClass('is-background');
            }
        }

        function handlerOut () {
            if (isDesctop) {
                $('#navLine').removeClass('visible');
                $('#header').removeClass('is-background');
            }
        }

        $(el).hover(handlerIn, handlerOut);
    });

    $('#navToggler').on('click', function () {
        $('#header').toggleClass('nav-visible');
        $('.nav__item.dropdown').removeClass('drop-visible');
    });

    $('.nav__item.dropdown').on('click', function (e) {
        const el = e.target

        if (!isDesctop) {
            $(el).toggleClass('drop-visible');
        }
    });

    $('.nav__item.dropdown a').on('click', function (e) {
        if (!isDesctop) {
            e.preventDefault();

            const el = e.target;
            const parent = $(el).parent();
            parent.click();
        }
    });






    // FOOTER
    // Replace phone at the footer to the socials section for desktop viewport
    function replaceFooterPhone () {
        if (isDesctop) {
            $('#footerPhone').prependTo("#footerSocials");
        } else {
            $('#footerPhone').prependTo("#footer");
        }
    }
    replaceFooterPhone();














    $(window).resize(function () {
        getScreenType();
        replaceFooterPhone();
    });



});