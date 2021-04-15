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

    /* Get window scroll width */
    window.getScrollWidth = function () {
        let documentWidth = parseInt(document.documentElement.clientWidth);
        let windowsWidth = parseInt(window.innerWidth);

        return windowsWidth - documentWidth;
    }

    /* Get screen type, desktop or not */
    function getScreenType () {
        window.isDesctop = window.innerWidth > 1365;
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
            // let pointOfDisplay = windowHeight / 1.2;
            let pointOfDisplay = windowHeight - 100; // 100px from bottom of the screen

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

    window.modalOpen = function (el) {
        const modalId = $(el).data('target');
        const paddingRightWidth = getScrollWidth() + 'px';

        $('body')
            .addClass('modal-open')
            .css('paddingRight', paddingRightWidth);

        $('header.header').css({
            'paddingRight': 'calc(5vw + ' + paddingRightWidth + ')',
            'transition': 'none',
        });

        $(modalId).addClass('visible');
    }

    window.modalClose = function (el) {

        if ( $(el).hasClass('modal') ) {
            $(el).removeClass('visible');
        } else {
            $(el).closest('.modal').removeClass('visible');
        }

        $('body')
            .removeClass('modal-open')
            .css('paddingRight', '0px');

        $('header.header').css({
            'paddingRight': '5vw',
        });
    }

    // Handler click on btns close modal
    const btnsCloseModal = $('.modal__close');

    if (btnsCloseModal.length > 0) {
        $(btnsCloseModal).each(function () {
            $(this).on('click', () => modalClose(this));
        });
    }

    // Handler click on body modal
    const modals = $('.modal');

    if (modals.length > 0) {
        $(modals).each(function () {
            $(this).on('click', function (e) {
                if ( $(e.target).hasClass('modal') ) {
                    modalClose(this);
                }
            });
        });
    }

    // Handle click on controllers with label
    const btnsControll = $('.label-controll__caption');

    if (btnsControll.length > 0) {
        for (let i = 0; i < btnsControll.length; i++) {
            $(btnsControll[i]).on('click', function () {
                $(this).toggleClass('visible');
            });
        }
    }


    // Gallery animation into the cards on all slider with filter
    const dots = $('.dot');

    if (dots.length > 0) {
        for (let i = 0; i < dots.length; i++) {
            $(dots[i]).on('click', function () {
                const numEl = $(this).index();
                const imgs = $(this).closest('.gallery').find('.image');
                const dots = $(this).closest('.gallery').find('.dot');

                $(dots).removeClass('active');
                $(this).addClass('active');

                $(imgs).removeClass('active');
                $(imgs[numEl]).addClass('active');
            });
        }
    }

    // Handle click on controlls at the gallery in slider
    const btnGalleryControll = $('.slider-gallery-controller');

    if (btnGalleryControll.length > 0)  {
        for (let i = 0; i < btnGalleryControll.length; i++) {
            $(btnGalleryControll[i]).on('click', function () {
                const direction = $(this).data('direction');

                const activeIndex = $(this).closest('.gallery').find('.dot.active').index();
                const dots = $(this).closest('.gallery').find('.dot');
                const imgs = $(this).closest('.gallery').find('.image');
                let nextIndex;

                $(dots).removeClass('active');
                $(imgs).removeClass('active');

                if (direction === 'prev') {
                    nextIndex = activeIndex === 0
                        ? dots.length - 1
                        : activeIndex - 1;
                }

                if (direction === 'next') {
                    nextIndex = activeIndex + 1 === dots.length
                        ? 0 :
                        activeIndex + 1;
                }

                $(dots).eq(nextIndex).addClass('active');
                $(imgs).eq(nextIndex).addClass('active');
            });
        }
    }
});
