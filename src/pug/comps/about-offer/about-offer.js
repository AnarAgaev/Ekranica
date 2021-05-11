import $ from "jquery";

$(document).ready(function () {
    let aboutBtns = $('.about-offer__title');
    let aboutItems = $('.about-offer__items');

    if (aboutBtns.length > 0) {
        for (let i = 0; i < aboutBtns.length; i++) {
            $(aboutBtns[i]).on('click', function () {

                if ($(window).width() < 768) {
                    let list = $(this).next();
                    let isOpen = $(this).hasClass('open');

                    $(aboutBtns).removeClass('open');
                    $(aboutItems).removeClass('visible');

                    if (!isOpen) {
                        $(this).addClass('open');
                        $(list).addClass('visible');
                    } else {
                        $(this).removeClass('open');
                        $(list).removeClass('visible');
                    }
                }
            });
        }
    }
});