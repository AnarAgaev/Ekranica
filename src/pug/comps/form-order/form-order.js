import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {

    let maskFormOrder;
    const controller = $('#phone').closest('.controller');
    const validator = $('#orderForm .validator__cross');

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
        maskFormOrder = IMask(el, maskOptions);

        // Let's add handler function on phone change
        maskFormOrder.on("accept", phoneHandler);

        function phoneHandler() {
            if (validPhone(maskFormOrder.unmaskedValue)) {
                $(controller).addClass('checked valid');
                $(controller).removeClass('invalid');
            } else {
                if ($(controller).hasClass('checked')) {
                    $(controller).addClass('invalid');
                    $(controller).removeClass('valid');
                }
            }

            if (maskFormOrder.unmaskedValue === '') {
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

    $('#orderForm').on('submit', function(e) {
        e.preventDefault();

        let phone = $('#phone').val();
        let isFormValid = true;

        if (phone !== '') {
            if (!validPhone(phone.replace(/\s+|\+/g, ''))) {
                isFormValid = false;
                animationFormError(controller, validator);
            }

        } else {
            isFormValid = false;
            animationFormError(controller, validator);
        }

        if (isFormValid) {
            const name = $('#name').val();
            const phone = $('#phone').val();
            const message = $('#message').val();

            // Reset form
            $(controller).removeClass('valid input checked');
            maskFormOrder.unmaskedValue = '';
            $('#orderModal .modal__close').focus();


            // !!!!!!!!!!!!!!!!!!!!!!!   Send data to server


            modalOpen(this);
        }

    });
});