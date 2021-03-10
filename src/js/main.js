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

    function getScreenType () {
        window.isDesctop = window.innerWidth > 1859;

        console.log('window.isDesctop: ', isDesctop);
        console.log('window.innerWidth: ', window.innerWidth);

    }
    getScreenType();

    $(window).resize(function () {
        getScreenType();
    });
});