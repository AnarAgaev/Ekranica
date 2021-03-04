import $ from "jquery";

$(document).ready(function () {
    $('#callbackForm').on('submit', function(e) {
        e.preventDefault();
    });

    // It's the handler of a phone value
    $('#callbackForm #callbackPhone')[0].addEventListener('input', function (e) {
        phoneMask(e.target);
    });



    function phoneMask(input) {
        const regEx = /[^\d]/g;
        const number = $(input).val().replace(regEx, '');


        console.log(number.split(''));




    }


});