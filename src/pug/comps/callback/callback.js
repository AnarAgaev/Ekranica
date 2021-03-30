import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {

    let mask;
    const form = $('#phone').closest('form');
    const controller = $('#phone').closest('.controller');
    const validator = $('#callbackForm .validator__cross');

    function animationError() {
        // Add checked class if controller haven't it
        if (!$(controller).hasClass('checked')) {
            $(controller).addClass('checked');
        }

        // Add invalid class if controller haven't it
        if (!$(controller).hasClass('invalid')) {
            $(controller).addClass('invalid');
        }

        // Add error animation class if controller haven't it
        if (!$(validator).hasClass('bounce-top')) {
            $(validator).addClass('bounce-top');

            setTimeout(function () {
                $(validator).removeClass('bounce-top');
            }, 1000);
        }
    }

    function checkPhone () {
        let phone = $('#phone').val();

        if (phone !== '') {
            if (!validPhone(phone.replace(/\s+|\+/g, ''))) {
                animationError();
            }
        }
    }

    // It's the handler of the phone value
    const el = document.getElementById('phone');

    if (el) {
        const maskOptions = {
            mask: '+{7} 000 000 00 00',
        };
        mask = IMask(el, maskOptions);

        // Let's add handler function on phone change
        mask.on("accept", phoneHandler);
        // mask.on("complete", phoneHandler);

        function phoneHandler() {
            mask.updateValue();

            if (validPhone(mask.unmaskedValue)) {
                $(controller).addClass('valid');
                $(controller).removeClass('invalid');
                $(controller).addClass('checked');
            } else {
                if ($(controller).hasClass('checked')) {
                    $(controller).addClass('invalid');
                    $(controller).removeClass('valid');
                }
            }

            if(mask.unmaskedValue === '') {
                $(controller).removeClass('checked');
            }
        }
    }

    // Handle unfocused phone input
    $('#phone').blur(function () {
        checkPhone();
    });

    // Show error on input when user scroll on it focused
    $(window).scroll(function () {
        if ($('#phone').is(':focus')) {
            checkPhone();
        }
    });

    $('#callbackForm').on('submit', function(e) {
        e.preventDefault();

        let phone = $('#phone').val();
        let callbackFormValid = true;

        if (phone !== '') {
            if (!validPhone(phone.replace(/\s+|\+/g, ''))) {
                callbackFormValid = false;
                animationError();
            }

        } else {
            callbackFormValid = false;
            animationError();
        }

        if (callbackFormValid) {
            // Reset form
            $(form)[0].reset();
            $(controller).removeClass('valid input checked');
            mask.updateValue();


            // !!!!!!!!!!!!!!!!!!!!!!!   Send data to server


            modalOpen(this);
        }

    });
});