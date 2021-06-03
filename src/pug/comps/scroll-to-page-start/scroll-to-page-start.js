import $ from "jquery";

$(document).ready(function () {
    let btnScrollToPageStart = $('#scrollToPageStart');

    (function handlerClickOnBtnScrollToPageStart () {
        $(btnScrollToPageStart).on(
            'click',
            () => $('body, html').animate(
                {
                    scrollTop: 0
                },
                800
            )
        );
    })();

    $(window).scroll(function () {
        let windowHeight = $(window).height();
        let bodyHeight = $('body').height();

        if (bodyHeight > windowHeight * 2) {
            toggleVisibleBtnScrollToTop();
            fixBtnScrollToTopPositionForFooterVisible();
        }
    });

    function toggleVisibleBtnScrollToTop () {
        let windowHeight = $(window).height();
        let windowScrollTop = $(window).scrollTop();

        windowScrollTop > windowHeight
            ? $(btnScrollToPageStart).addClass('visible')
            : $(btnScrollToPageStart).removeClass('visible');
    }

    function fixBtnScrollToTopPositionForFooterVisible () {
        let footer = $('#footer');
        let windowHeight = $(window).height();
        let windowScrollTop = $(window).scrollTop();
        let footerOffsetTop = $(footer).offset().top;

        let fixedPosition = footerOffsetTop
            - windowHeight
            + getBtnScrollToTopPositionRatio();

        fixedPosition <= windowScrollTop
            ? $(btnScrollToPageStart).addClass('fixed-position')
            : $(btnScrollToPageStart).removeClass('fixed-position');
    }

    function getBtnScrollToTopPositionRatio() {
        switch(getScreenType()) {
            case 'md':
                return 17;

            case 'lg':
                return 38;

            case 'xl':
            case 'xxl':
                return 58;
        }
    }
});