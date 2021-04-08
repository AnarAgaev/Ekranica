import $ from "jquery";

$(document).ready(function () {
    const helpBtnsOpen = $('.help-button');
    const helpBtnsClose = $('.help-modal__close');

    if (helpBtnsOpen.length > 0) {
        for (let i = 0; i < helpBtnsOpen.length; i++) {
            $(helpBtnsOpen[i]).on('click', function (e) {
                const modalId = $(this).data('helpModalId');

                $(modalId).addClass('visible');

                if (!isDesctop) $('body').addClass('modal-open');
            });
        }
    }

    if (helpBtnsClose.length > 0) {
        for (let i = 0; i < helpBtnsClose.length; i++) {

            $(helpBtnsClose[i]).on('click', function (e) {
                e.stopPropagation();
                const modal = $(this).closest('.help-modal');

                $(modal).removeClass('visible');

                if (!isDesctop) $('body').removeClass('modal-open');
            });
        }
    }
});