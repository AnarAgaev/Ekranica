import $ from "jquery";

$(document).ready(function () {

    // It's listening hover for desktop viewport size
    $('header .dropdown').each(function (i, el) {
        function handlerIn () {
            if (isLaptop) {
                $('#navLine').addClass('visible');
            }
        }

        function handlerOut () {
            if (isLaptop) {
                $('#navLine').removeClass('visible');
            }
        }

        $(el).hover(handlerIn, handlerOut);
    });

    $('#navToggler').on('click', function () {
        $('#header').toggleClass('nav-visible');
        $('.nav__item.dropdown').removeClass('drop-visible');
        $('.nav__item.dropdown > a').removeClass('drop-visible');
    });

    $('.nav__item.dropdown').on('click', function (e) {
        const el = e.target

        if (!isLaptop) {
            $(el).toggleClass('drop-visible');
        }
    });

    $('.nav__item.dropdown a').on('click', function (e) {
        if (!isLaptop) {
            e.preventDefault();

            const el = e.target;
            const parent = $(el).parent();
            parent.click();
        }
    });


    $('.nav__points-btn').on('click', function (e) {
        e.preventDefault();
    });
});
