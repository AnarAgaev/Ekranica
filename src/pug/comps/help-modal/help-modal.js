import $ from "jquery";

$(document).ready(function () {
    const btnsOpen = $('.help-button');
    const btnsClose = $('.help-modal__close');
    const btnsToggle = $('.label-controll__help > svg');
    const constrols = $('.label-controll');
    const helpModals = $('.help-modal');

    function responsiveOpen() {
        if (!isLaptop) {
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
        if (!isLaptop) {
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

    // Toggle help modal
    if (btnsToggle.length > 0) {
        for (let i = 0; i < btnsToggle.length; i++) {
            $(btnsToggle[i]).on('click', function (e) {
                const modalId = $(this).closest('.label-controll__help').data('helpModalId');
                const modal = $('#' + modalId);
                const isModalVisible = $(modal).hasClass('visible');

                $('.help-modal').removeClass('visible');
                $('.help-modal').css('left', '');


                if (!isModalVisible) {

                    // Remove modal to the left side if there isn't
                    // space for it on the right fro icon
                    if (isLaptop) {
                        const modalWidth = $(modal).width();
                        const offsetLeft = $(modal).closest('.label-controll__help').offset().left;
                        const offsetRight = $(window).width() - offsetLeft - 24; // 24px is offset from left side of container

                        if (modalWidth > offsetRight) {
                            $(modal).css('left', '-' + modalWidth + 'px');
                        }
                    }

                    $(modal).addClass('visible');
                }

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
                $(modal).css('left', '');

                responsiveClose();
            });
        }
    }

    // Close help modal after click on help modal body and out of content
    if (helpModals.length > 0) {
        for (let i = 0; i < helpModals.length; i++) {
            $(helpModals[i]).on('click', function (e) {
                if ($(e.target).hasClass('visible')) {
                    $(this).removeClass('visible');
                    responsiveClose();
                }
            });
        }
    }
});