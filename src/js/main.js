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


    // Handle click on buttons at the radio group
    const radioBtns = $('.radio-group label');

    function setRadioMarker(label) {
        const marker = $(label).parent().children('.marker');
        const width = $(label).innerWidth();
        const left = $(label).position().left;

        $(marker).css({
            'width': width,
            'left': left + 'px',
        });
    }

    function initRadioMarker() {
        const btns = $("input[type='radio']:checked + label");

        if (btns.length > 0) {
            for (let i = 0; i < btns.length; i++) {
                setRadioMarker(btns[i]);
            }
        }
    }
    setTimeout(initRadioMarker, 300);

    $(window).resize(function () {
        initRadioMarker();
    });

    if (radioBtns.length > 0) {
       for (let i = 0; i < radioBtns.length; i++) {
           $(radioBtns[i]).on('click', function () {
               setRadioMarker(this);
           });
       }
    }


    // Handle click on buttons at the simple select
    const selects = $('.select-simple');

    if (selects.length > 0) {
        for (let i = 0; i < selects.length; i++) {
            $(selects[i]).on('click', function () {
                $(this).toggleClass('open')
            });
        }
    }

});