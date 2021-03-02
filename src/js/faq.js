import $ from "jquery";

$(document).ready(function () {

    let faqUnLock = true;

    function showFaqEl (el) {
        $(el).parent().addClass('visible');

        $(el).css('max-height', 9999 + 'px');

        const height = $(el).outerHeight();
        const transition = height > 500
            ? 'max-height .7s linear 0s, opacity .2s linear .5s'
            : 'max-height .3s linear 0s, opacity .2s linear .1s'

        $(el).css('max-height', '0');

        setTimeout(function () {
            $(el).css({
                'max-height': height + 'px',
                'transition': transition,
            });
        }, 10);

        setTimeout(function () {
            $(el).css({
                'overflow-y': 'initial',
            });
        }, 700);
    }

    function hideFaqEl (el) {

        $(el).parent().removeClass('visible');

        const timeout = $(el).outerHeight() > 500
            ? 700
            : 300;

        $(el).css({
            'max-height': '0',
            'overflow-y': 'hidden',
        });

        setTimeout(function () {
            $(el).css({
                'transition': 'none',
            });
        }, timeout);
    }

    // FAQ toggle
    $('.faq__caption').on('click', function (e) {
        if (faqUnLock) {
            faqUnLock = false;

            setTimeout(function () {
                faqUnLock = true;
            }, 300);

            const desc = $(e.target).next();

            if ( $(e.target).closest('.faq__item').hasClass('visible') ) {
                hideFaqEl(desc);
            } else {
                showFaqEl(desc);
            }
        }
    });

    $('.faq__toggler').on('click', function (e) {
        e.stopPropagation();

        if (faqUnLock) {
            faqUnLock = false;

            setTimeout(function () {
                faqUnLock = true;
            }, 300);

            const desc =  $(e.target)
                .closest('.faq__caption')
                .next();

            if ( $(e.target).closest('.faq__item').hasClass('visible') ) {
                hideFaqEl(desc);

            } else {
                showFaqEl(desc);
            }
        }
    });

});
