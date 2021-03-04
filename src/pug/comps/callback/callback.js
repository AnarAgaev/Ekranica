import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {
    let callbackFormValid = true;

    $('#callbackForm').on('submit', function(e) {
        e.preventDefault();
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