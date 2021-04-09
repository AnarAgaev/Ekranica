import $ from "jquery";

$(document).ready(function () {
    const btns = $('.typical-solutions__controll-caption');

    if (btns.length > 0) {
        for (let i = 0; i < btns.length; i++) {
            $(btns[i]).on('click', function () {
                $(this).toggleClass('visible');
            });
        }
    }
});