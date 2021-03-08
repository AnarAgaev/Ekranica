import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {
    let callbackFormValid = true;

    $('#callbackForm').on('submit', function(e) {
        e.preventDefault();
    });

    // It's the handler of the phone value
    const el = document.getElementById('formOrderPhone');

    if (el) {
        const maskOptions = {
            mask: '+{7} 000 000 00 00',
        };
        const mask = IMask(el, maskOptions);
    }

});