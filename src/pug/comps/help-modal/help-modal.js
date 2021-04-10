import $ from "jquery";

$(document).ready(function () {
    const btnsOpen = $('.help-button');
    const btnsClose = $('.help-modal__close');
    const constrols = $('.label-controll');

    function responsiveOpen() {
        if (!isDesctop) {
            $('body').addClass('modal-open');
            $('.typical-solutions .filter').css('zIndex', 'initial');

            for (let j = 0; j < btnsOpen.length; j++) {
                $(btnsOpen[j]).css('zIndex', 'initial');
            }

            for (let k = 0; k < constrols.length; k++) {
                $(constrols[k]).css('zIndex', 'initial');
            }
        }
    }

    function responsiveClose() {
        if (!isDesctop) {
            $('body').removeClass('modal-open');
            $('.typical-solutions .filter').css('zIndex', '2');

            for (let j = 0; j < btnsOpen.length; j++) {
                $(btnsOpen[j]).css('zIndex', '4');
            }

            for (let k = 0; k < constrols.length; k++) {
                $(constrols[k]).css('zIndex', '');
            }
        }
    }

    // Open help modal
    if (btnsOpen.length > 0) {
        for (let i = 0; i < btnsOpen.length; i++) {
            $(btnsOpen[i]).on('click', function (e) {
                const modalId = $(this).data('helpModalId');
                const modal = $('#' + modalId);
                const modalVisible = $(modal).hasClass('visible');

                $('.help-modal').removeClass('visible');
                $(modal).addClass('visible');

                responsiveOpen();
            });
        }
    }

    // Close help modal
    if (btnsClose.length > 0) {
        for (let i = 0; i < btnsClose.length; i++) {

            $(btnsClose[i]).on('click', function (e) {
                e.stopPropagation();
                const modal = $(this).closest('.help-modal');

                $(modal).removeClass('visible');

                responsiveClose();
            });
        }
    }
});