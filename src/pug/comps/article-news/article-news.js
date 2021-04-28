import $ from "jquery";

$(document).ready(function () {
    const copyUrlLinks = $('.copy-url-link');

    // Copy URL to the clipboard
    if (copyUrlLinks.length > 0) {
        for (let i = 0; i < copyUrlLinks.length; i++) {
            $(copyUrlLinks[i]).on('click', function () {
                const tmp = $('<textarea>');

                $('body').append(tmp);
                tmp.val(window.location.href).select();
                document.execCommand("copy");
                tmp.remove();
            });
        }
    }
});