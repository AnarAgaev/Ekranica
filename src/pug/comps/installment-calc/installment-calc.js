import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {
    const el = $('#cost').children('input')[0];
    const firstPaymentEl = $('#firstPayment').children('input')[0];
    const firstPaymentRange = $('#firstPayment + .custom-range__controller input');
    const statusBar = $('#firstPayment + .custom-range__controller .status-bar');
    const slider = $('#firstPayment + .custom-range__controller .slider');

    window.installmentCalcState = {
        cost: '',
        installment: '12', // default value for installment
        firstPayment: '',
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

            console.log(installmentCalcState);


            if ($('#firstPayment input').val() === '') {
                $('#firstPayment input').val(installmentCalcState.firstPayment);
            }

            let monthlyPayment; // ануитентный ежёмесячный платёж (одинаковый каждый месяц кредита)
            let creditPercentMonth; // процентная ставка в месяц
            let toEextent; // 1 + процентная ставка в месяц в степени количества месяцев
            let overpayment; // переплата за пользование кредитом

            const creditPercentYear = 19.8; // процентная ставка, % годовых
            const cost =  parseInt(installmentCalcState.cost, 10); // стоимость оборудования
            const firstPayment = parseInt(installmentCalcState.firstPayment, 10); // первоначасльный взнос в рублях
            const creditAmount = cost - firstPayment; // сумма кредита
            const creditTerm = parseInt(installmentCalcState.installment, 10); // срок кредита в месяцах

            // Calculating
            creditPercentMonth = creditPercentYear / 100 / 12; // процентная ставка в месяц
            toEextent = Math.pow(1 + creditPercentMonth, creditTerm); // возведение в степень согласно формуле
            monthlyPayment = creditAmount * ((creditPercentMonth * toEextent) / (toEextent - 1)); // ежёмесячный платёж
            overpayment = truncated((monthlyPayment * creditTerm) - creditAmount); // переплата

            // Print results of calculating
            $('#calcResultFirstPayment').text('Первоначальный взнос: ' + firstPayment.toLocaleString('ru-RU') + ' ₽.');
            $('#calcResultMonthlyPayment').text('Ежемесячный платёж: ' + truncated(monthlyPayment).toLocaleString('ru-RU') + ' ₽.');
            $('#calcResultPaymentTerm').text('Срок выплаты: ' + prettyMonth(creditTerm) + '.');

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
            console.log('ануитентный ежёмесячный платёж:', truncated(monthlyPayment));
            console.log('переплата:', overpayment);
        }
    }

    if (el) {
        $('#cost').on('click', () => el.focus());

        $('#firstPayment').on('click', function () {
            if (installmentCalcState.cost !== '') {
                $(this).children('input').focus();
            } else {
                checkInstallmentCalc();
            }
        });

        $(firstPaymentRange).on('mousedown', function () {
            if (installmentCalcState.cost === '') {
                checkInstallmentCalc();
            }
        });

        $(firstPaymentRange).on('click', function () {
            if (installmentCalcState.cost === '') {
                checkInstallmentCalc();
            }
        });

        // Masking for cost controller
        window.costMask = IMask(el, {
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
        costMask.on(
            "accept",
            function () {
                installmentCalcState.cost = costMask.unmaskedValue;
                $(el).closest('.label-controll').removeClass('invalid');
                const val = Number.parseInt(costMask.unmaskedValue);
                const min = Math.floor(val * 0.3);
                const max = Math.floor(val * 0.95);

                if (costMask.unmaskedValue === 0 || costMask.unmaskedValue === '') {
                    $('.payment__calc .label-controll:last-child').addClass('blocked');
                    $(firstPaymentRange).prop({ 'min': 0, 'max': 0, 'value': 0 });
                    installmentCalcState.firstPayment = '';
                    $('#firstPayment input').attr("disabled", true);
                    firstPaymentMask.unmaskedValue = '';
                } else {
                    $('.payment__calc .label-controll:last-child').removeClass('blocked');
                    $(firstPaymentRange).prop({ 'min': min, 'max': max, 'value': min });
                    installmentCalcState.firstPayment = (min).toString();
                    $('#firstPayment input').attr("disabled", false);
                    firstPaymentMask.unmaskedValue = (min).toString();
                }

                $(statusBar).css('width', '0');
                $(slider).css('left', '0');

                firstPaymentMask.updateOptions({
                    min: min,
                    max: max
                });
            },
        );

        // Masking for firstPayment controller
        window.firstPaymentMask = IMask(firstPaymentEl, {
            mask: Number,  // enable number mask

            // other options are optional with defaults below
            scale: 1,  // digits after point, 0 for integers
            signed: false,  // disallow negative
            thousandsSeparator: ' ',  // any single char
            radix: ',',  // fractional delimiter
            mapToRadix: ['.'], // symbols to process as radix

            // additional number interval options (e.g.)
            min: 1,
            max: 9999999
        });

        firstPaymentMask.on(
            "accept",
            function () {

                const input = $('#firstPayment + .custom-range__controller input');

                if (firstPaymentMask.unmaskedValue === '') {
                    const firstPayVal = Math.floor(installmentCalcState.cost * 0.3)
                    installmentCalcState.firstPayment = firstPayVal;
                    //firstPaymentMask.unmaskedValue = (firstPayVal).toString();
                } else {
                    installmentCalcState.firstPayment = firstPaymentMask.unmaskedValue;
                }

                $(input).val(installmentCalcState.firstPayment);

                setRange($(input)[0], false);
            },
        );

        $('#calculateInstallment').on('click', function () {

            // Show controllers for touchebble devices
            $('.installment-calc').find('.label-controll__caption').addClass('visible');

            calculateInstallmentCalc();
        });
    }
});