$(document).ready( evt => {
    // Сушаем ховер только на десктопах
    $('header .dropdown').each((i, el) => {
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

    $('#navToggler').on('click', () => {
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
});