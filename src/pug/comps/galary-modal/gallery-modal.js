import $ from "jquery";

$(document).ready(function () {
    const pics = $('.gallery-picture');
    const modal = $('#galleryPicModal');
    const btnClose = $('#galleryBtnClose');
    const paddingRightWidth = getScrollWidth() + 'px';

    function closeModal() {
        $(modal).removeClass('visible');

        if (isDesctop) {
            $('body')
                .removeClass('modal-open')
                .css('paddingRight', '0px');

            $('header.header').css({
                'paddingRight': '5vw',
            });
        }
    }

    function openModal(src) {
        const img = document.getElementById('galleryPic');
        img.src = src;
        img.onload = function() {

            if (isDesctop) {
                $('body')
                    .addClass('modal-open')
                    .css('paddingRight', paddingRightWidth);

                $('header.header').css({
                    'paddingRight': 'calc(5vw + ' + paddingRightWidth + ')',
                    'transition': 'none',
                });
            }

            $(modal).addClass('visible');
        };
    }

    // Open gallery modal after click on picture
    if (pics.length > 0) {
        for (let i = 0; i < pics.length; i++) {
            $(pics[i]).on('click', function () {
                const src = $(this).data('galleryImgSource');

                openModal(src);
            });
        }
    }

    // Close gallery modal after click button close
    $(btnClose).on('click', closeModal);

    // Close gallery modal after click on modal
    $(modal).on('click', e => {
        if ($(e.target).hasClass('gallery-modal')) {
            closeModal();
        }
    });
});