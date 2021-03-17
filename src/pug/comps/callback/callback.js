import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {
    $('#callbackForm').on('submit', function(e) {
        e.preventDefault();

        let phone = $('#callbackPhone').val();
        let callbackFormValid = true;

        function animationError() {
            const controller = $('#callbackPhone').closest('.controller');
            const validator = $('#callbackForm .validator__cross');

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



            // !!!!!!!!!!!!!!!!!!!!!!!   Send data to server


            modalOpen(this);
        }

    });

    // It's the handler of the phone value
    const el = document.getElementById('callbackPhone');

    if (el) {
        const maskOptions = {
            mask: '+{7} 000 000 00 00',
        };
        const mask = IMask(el, maskOptions);

        // Let's add handler function on phone change
        mask.on("accept", phoneHandler);
        // mask.on("complete", phoneHandler);

        function phoneHandler() {
            const controller = $('#callbackPhone').closest('.controller');

            if (validPhone(mask.unmaskedValue)) {
                $(controller).addClass('valid');
                $(controller).removeClass('invalid');
            } else {
                $(controller).addClass('invalid');
                $(controller).removeClass('valid');
            }
        }
    }

});