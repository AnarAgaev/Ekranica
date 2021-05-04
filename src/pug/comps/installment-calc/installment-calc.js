import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {
    const el = $('#cost').children('input')[0];
    const selects = $('.installment-calc-controller');

    const installmentCalcState = {
        cost: '',
        installment: '',
        firstPayment: '',
    };

    function checkInstallmentCalc(store) {
        let controllerIsValid = true;

        for (let key in store) {
            const controller = $('#' + key).closest('.label-controll');
            const validator = $('#' + key + ' + .validator');

            if (store[key] === '') {
                $(controller).addClass('invalid');

                // Show controllers for touchebble devices
                $(controller).children('.label-controll__caption').addClass('visible');

                // Show error message (red cross) if it hasn't visible
                if (!$(validator).hasClass('bounce-top')) {
                    $(validator).addClass('bounce-top');

                    setTimeout(function () {
                        $(validator).removeClass('bounce-top');
                    }, 1000);
                }

                // If it has error, block calculating.
                if (controllerIsValid) controllerIsValid = false;

            } else {
                $(controller).removeClass('invalid');
            }
        }

        return controllerIsValid;
    }

    if (el) {
        $('#cost').on('click', () => el.focus());

        // Masking for cost controller
        let mask = IMask(el, {
            mask: Number,  // enable number mask

            // other options are optional with defaults below
            scale: 2,  // digits after point, 0 for integers
            signed: false,  // disallow negative
            thousandsSeparator: ' ',  // any single char
            radix: ',',  // fractional delimiter
            mapToRadix: ['.'], // symbols to process as radix

            // additional number interval options (e.g.)
            min: 1,
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

        // Handling change of the selects value
        $(selects).on('click', function () {
            const property = $(this).data('calcProperty');
            const value = $(this).data('calcValue');

            installmentCalcState[property] = value;

            $(this)
                .closest('.label-controll')
                .removeClass('invalid');
        });

        // Calculate Installment
        // calculation methodology taken from
        // the site https://www.raiffeisen.ru/wiki/kak-rasschitat-annuitetnyj-platezh/
        $('#calculateInstallment').on('click', function () {
            if ( checkInstallmentCalc(installmentCalcState) ) {

                let monthlyPayment; // ануитентный ежёмесячный платёж (одинаковый каждый месяц кредита)
                let creditPercentMonth; // процентная ставка в месяц
                let toEextent; // 1 + процентная ставка в месяц в степени количества месяцев
                let overpayment; // переплата за пользование кредитом
                let total; // итоговая цена

                const creditPercentYear = 19.8; // процентная ставка, % годовых
                const cost =  parseInt(installmentCalcState.cost, 10); // стоимость оборудования
                const firstPayment = cost / 100 * parseInt(installmentCalcState.firstPayment, 10); // первоначасльный взнос в рублях
                const creditAmount = cost - firstPayment; // сумма кредита
                const creditTerm = parseInt(installmentCalcState.installment, 10); // срок кредита в месяцах

                // Calculating
                creditPercentMonth = creditPercentYear / 100 / 12; // процентная ставка в месяц
                toEextent = Math.pow(1 + creditPercentMonth, creditTerm);
                monthlyPayment = creditAmount * ((creditPercentMonth * toEextent) / (toEextent - 1)); // ежёмесячный платёж
                overpayment = truncated((monthlyPayment * creditTerm) - creditAmount); // переплата
                total = firstPayment + creditAmount + overpayment;

                // Print results of calculating
                $('#calcResultTotal').text(total.toLocaleString('ru-RU') + ' ₽');
                $('#calcResultOverPayment').text('Переплата за ' + prettyMonth(creditTerm) + ' - ' + overpayment.toLocaleString('ru-RU') + ' ₽.');
                $('#calcResultFirstPayment').text('Первый платёж - ' + installmentCalcState.firstPayment + '% от стоимости экрана, (' + firstPayment.toLocaleString('ru-RU') + ' ₽).')

                $('.installment-calc__delimiter').addClass('show');
                $('.installment-calc__result').addClass('show');


                console.log('*** *** *** *** *** *** ***')
                console.log('годовая процентная ставка:', creditPercentYear);
                console.log('процентная ставка на 1 месяц:', creditPercentMonth);
                console.log('стоимость оборудования:', cost);
                console.log('первоначасльный взнос в процентах:', installmentCalcState.firstPayment);
                console.log('первоначасльный взнос в рублях:', firstPayment);
                console.log('сумма кредита:', creditAmount);
                console.log('срок кредита в месяцах:', creditTerm);
                console.log('ануитентный ежёмесячный платёж:', monthlyPayment);
                console.log('переплата:', overpayment);
            }
        });
    }
});