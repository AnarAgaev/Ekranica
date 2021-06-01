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
        toggleVisibleBtnScrollToTop();
    });

    function toggleVisibleBtnScrollToTop () {
        let windowHeight = $(window).height();
        let windowScrollTop = $(window).scrollTop();

        windowScrollTop > windowHeight
            ? $(btnScrollToPageStart).addClass('visible')
            : $(btnScrollToPageStart).removeClass('visible');
    }
});