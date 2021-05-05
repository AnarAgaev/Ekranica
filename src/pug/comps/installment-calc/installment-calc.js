import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {
    const el = $('#cost').children('input')[0];
    const ranges = $('input[type="range"]');

    const installmentCalcState = {
        cost: '',
        installment: '12', // default value for installment
        firstPayment: '30', // default value for first payment
    };

    function checkInstallmentCalc() {
        const controller = $('#cost').closest('.label-controll');
        const validator = $('#cost + .validator');

        if (installmentCalcState.cost === '') {
            $(controller).addClass('invalid');

            // Show error message (red cross) if it hasn't visible
            if (!$(validator).hasClass('bounce-top')) {
                $(validator).addClass('bounce-top');

                setTimeout(function () {
                    $(validator).removeClass('bounce-top');
                }, 1000);
            }

            // If it has error, block calculating.
            return false;
        }

        return true;
    }

    // Calculate Installment
    // calculation methodology taken from
    // the site https://www.raiffeisen.ru/wiki/kak-rasschitat-annuitetnyj-platezh/
    function calculateInstallmentCalc() {

        if (checkInstallmentCalc()) {
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
            $('#calcResultFirstPayment').text('Первоначальный взнос: ' + firstPayment.toLocaleString('ru-RU') + ' ₽.');
            $('#calcResultMonthlyPayment').text('Ежемесячный платёж: ' + truncated(monthlyPayment).toLocaleString('ru-RU') + ' ₽.');
            $('#calcResultPaymentTerm').text('Срок выплаты: ' + prettyMonth(creditTerm) + '.');

            $('.installment-calc__delimiter').addClass('show');
            $('.installment-calc__result').addClass('show');

            //- console.log('*** *** *** *** *** *** ***')
            //- console.log('годовая процентная ставка:', creditPercentYear);
            //- console.log('процентная ставка на 1 месяц:', creditPercentMonth);
            //- console.log('стоимость оборудования:', cost);
            //- console.log('первоначасльный взнос в процентах:', installmentCalcState.firstPayment);
            //- console.log('первоначасльный взнос в рублях:', firstPayment);
            //- console.log('сумма кредита:', creditAmount);
            //- console.log('срок кредита в месяцах:', creditTerm);
            //- console.log('ануитентный ежёмесячный платёж:', monthlyPayment);
            //- console.log('переплата:', overpayment);
        }

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
            max: 9999999
        });

        // Handle change value of the input cost
        mask.on(
            "accept",
            function () {
                installmentCalcState.cost = mask.unmaskedValue;
                $(el).closest('.label-controll').removeClass('invalid');
            },
        );

        for (let i = 0; i < ranges.length; i++) {
            $(ranges[i]).on('input', function () {
                const property = $(this).data('calcProperty');
                installmentCalcState[property] = this.value;

                if ($('.installment-calc__delimiter').hasClass('show')) {
                    setInterval(calculateInstallmentCalc, 100);

                }
            });
        }

        $('#calculateInstallment').on('click', function () {

            // Show controllers for touchebble devices
            $('.installment-calc').find('.label-controll__caption').addClass('visible');

            calculateInstallmentCalc();
        });
    }
});