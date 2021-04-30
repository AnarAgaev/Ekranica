import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {
    const el = $('#cost').children('input')[0];
    const controllers = $('.installment-calc-controller');

    const installmentCalcState = {
        'cost': '',
        'installment': '',
        'firstPayment': '',
    };

    function checkInstallmentCalc(obj) {
        let isValid = true;

        for (let key in obj) {
            const controll = $('#' + key).closest('.label-controll');
            const validator = $('#' + key + ' + .validator');

            if (obj[key] === '') {
                $(controll).addClass('invalid');

                $(controll).children('.label-controll__caption').addClass('visible');

                if (!$(validator).hasClass('bounce-top')) {
                    $(validator).addClass('bounce-top');

                    setTimeout(function () {
                        $(validator).removeClass('bounce-top');
                    }, 1000);
                }

                if (isValid) isValid = false;

            } else {
                $(controll).removeClass('invalid');
            }
        }

        return isValid;
    }

    if (el) {
        $('#cost').on('click', () => el.focus());

        let mask = IMask(el, {
            mask: Number,  // enable number mask

            // other options are optional with defaults below
            scale: 2,  // digits after point, 0 for integers
            signed: false,  // disallow negative
            thousandsSeparator: ' ',  // any single char
            radix: ',',  // fractional delimiter
            mapToRadix: ['.'], // symbols to process as radix

            // additional number interval options (e.g.)
            min: 0,
            max: 10000000
        });

        // Handle change value of the input cost
        mask.on(
            "accept",
            function () {
                installmentCalcState.cost = mask.unmaskedValue;
                $(el).closest('.label-controll').removeClass('invalid');
            },
        );

        // Handle change value of the selects cost
        $(controllers).on('click', function () {
            const property = $(this).data('calcProperty');
            const value = $(this).data('calcValue');

            installmentCalcState[property] = value;

            $(this).closest('.label-controll').removeClass('invalid');
        });

        // Calculate Installment
        $('#calculateInstallment').on('click', function () {
            if (checkInstallmentCalc(installmentCalcState)) {
                $('.installment-calc__delimiter').addClass('show');
                $('.installment-calc__result').addClass('show');
            }
        });
    }
});