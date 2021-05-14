import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {

    let maskCallback;
    const controller = $('#phone').closest('.controller');
    const validator = $('#callbackForm .validator__cross');

    function checkPhone () {
        let phone = $('#phone').val();

        if (phone !== '') {
            if (!validPhone(phone.replace(/\s+|\+/g, ''))) {
                animationFormError(controller, validator);
            }
        }
    }

    // It's the handler of the phone value
    const el = document.getElementById('phone');

    if (el) {
        const maskOptions = {
            mask: '+{7} 000 000 00 00',
        };
        maskCallback = IMask(el, maskOptions);

        // Let's add handler function on phone change
        maskCallback.on("accept", phoneHandler);

        function phoneHandler() {
            if (validPhone(maskCallback.unmaskedValue)) {
                $(controller).addClass('valid');
                $(controller).removeClass('invalid');
                $(controller).addClass('checked');
            } else {
                if ($(controller).hasClass('checked')) {
                    $(controller).addClass('invalid');
                    $(controller).removeClass('valid');
                }
            }

            if(maskCallback.unmaskedValue === '') {
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

        let phoneValue = $('#phone').val();
        let callbackFormValid = true;

        if (phoneValue !== '') {
            if (!validPhone(phoneValue.replace(/\s+|\+/g, ''))) {
                callbackFormValid = false;
                animationFormError(controller, validator);
            }

        } else {
            callbackFormValid = false;
            animationFormError(controller, validator);
        }

        if (callbackFormValid) {
            // Reset form
            $(controller).removeClass('valid input checked');
            maskCallback.unmaskedValue = '';
            $('#calbackModal .modal__close').focus();


            // !!!!!!!!!!!!!!!!!!!!!!!   Send data to server


            modalOpen(this);
        }

    });
});