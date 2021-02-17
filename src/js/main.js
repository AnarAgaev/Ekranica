$(document).ready(evt => {
    function getScreen () {
        window.isDesctop = $(document).width() > 1700;
    }

    getScreen();

    $(window).resize(function () {
        getScreen();
    });
});