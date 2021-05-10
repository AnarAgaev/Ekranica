import $ from "jquery";
import IMask from 'imask';

$(document).ready(function () {
    const el = $('#cost').children('input')[0];

    const installmentEl = $('#installment').children('input')[0];
    const installmentRange = $('#installment + .custom-range__controller input');

    const firstPaymentEl = $('#firstPayment').children('input')[0];
    const firstPaymentRange = $('#firstPayment + .custom-range__controller input');
    const firstPaymentStatusBar = $('#firstPayment + .custom-range__controller .status-bar');
    const firstPaymentSlider = $('#firstPayment + .custom-range__controller .slider');

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

            // Scrolling to required field
            if (!isLaptop) {
                setTimeout(function () {
                    const winHeight = $(window).height();
                    const resTargetOffset = $('.installment-calc__controlls').offset().top;
                    const resTop = (resTargetOffset - winHeight / 2) + 170;
                    $('body,html').animate({ scrollTop: resTop }, 500);
                    $('#cost input').focus();
                }, 700);
            }

            // If it has error, block calculating.
            return false;
        }

        return true;
    }

    // Show controllers for touchebble devices
    function showControllers() {
        $('.installment-calc')
            .find('.label-controll__caption')
            .addClass('visible');
    }

    // Calculate Installment
    // calculation methodology taken from
    // the site https://www.raiffeisen.ru/wiki/kak-rasschitat-annuitetnyj-platezh/
    function calculateInstallmentCalc() {

        if (checkInstallmentCalc()) {

            if ($('#firstPayment input').val() === '') {
                firstPaymentMask.unmaskedValue = installmentCalcState.firstPayment;
            }

            if ($('#installment input').val() === '') {
                installmentMask.unmaskedValue = installmentCalcState.installment;
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
            $('#calcResultFirstPayment').html('Первоначальный взнос: <span>' + firstPayment.toLocaleString('ru-RU') + ' ₽</span>');
            $('#calcResultMonthlyPayment').html('Ежемесячный платёж: <span>' + truncated(monthlyPayment).toLocaleString('ru-RU') + ' ₽</span>');
            $('#calcResultPaymentTerm').html('Срок выплаты: <span>' + prettyMonth(creditTerm) + '</span>');

            $('.installment-calc__delimiter').addClass('show');
            $('.installment-calc__result').addClass('show');

            // Scrolling to results for touch devices
            if (!isLaptop) {
                setTimeout(function () {
                    const winHeight = $(window).height();
                    const resTargetOffset = $('.installment-calc__delimiter').offset().top;
                    const resTop = (resTargetOffset - winHeight / 2) + 150;
                    $('body,html').animate({ scrollTop: resTop }, 500);
                }, 700);
            }

            //- console.log('*** *** *** *** *** *** ***')
            //- console.log('годовая процентная ставка:', creditPercentYear);
            //- console.log('процентная ставка на 1 месяц:', creditPercentMonth);
            //- console.log('стоимость оборудования:', cost);
            //- console.log('первоначасльный взнос в процентах:', installmentCalcState.firstPayment);
            //- console.log('первоначасльный взнос в рублях:', firstPayment);
            //- console.log('сумма кредита:', creditAmount);
            //- console.log('срок кредита в месяцах:', creditTerm);
            //- console.log('ануитентный ежёмесячный платёж:', truncated(monthlyPayment));
            //- console.log('переплата:', overpayment);
        }
    }

    if (el) {
        $('#cost').on('click', () => el.focus());

        $('#installment').on('click', function () {
            const input = $(this).children('input')[0];
            input.setSelectionRange(2, 2);

            $(input).focus();
        });

        $('#firstPayment').on('click', function () {
            if (installmentCalcState.cost !== '') {
                $(this).children('input').focus();
            } else {
                checkInstallmentCalc();
                showControllers();
            }
        });

        $(firstPaymentRange).on('touchstart mousedown', function () {
            if (installmentCalcState.cost === '') {
                checkInstallmentCalc();
                showControllers();
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

                $(firstPaymentStatusBar).css('width', '0');
                $(firstPaymentSlider).css('left', '0');

                firstPaymentMask.updateOptions({
                    min: min,
                    max: max
                });
            },
        );

        // Masking for installment controller
        window.installmentMask = IMask(installmentEl, {
            mask: Number,  // enable number mask

            // other options are optional with defaults below
            scale: 0,  // digits after point, 0 for integers
            signed: false,  // disallow negative
            thousandsSeparator: ' ',  // any single char
            radix: ',',  // fractional delimiter
            mapToRadix: ['.'], // symbols to process as radix

            // additional number interval options (e.g.)
            min: 12,
            max: 36
        });

        installmentMask.on(
            "accept",
            function () {

                installmentCalcState.installment = installmentMask.unmaskedValue === ''
                    ? 12
                    : installmentMask.unmaskedValue;

                $(installmentRange).val(installmentCalcState.installment);

                setRange($(installmentRange)[0], false);
            },
        );

        // Masking for firstPayment controller
        window.firstPaymentMask = IMask(firstPaymentEl, {
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

        firstPaymentMask.on(
            "accept",
            function () {

                installmentCalcState.firstPayment = firstPaymentMask.unmaskedValue === ''
                    ? Math.floor(installmentCalcState.cost * 0.3)
                    : firstPaymentMask.unmaskedValue;

                $(firstPaymentRange).val(installmentCalcState.firstPayment);

                setRange($(firstPaymentRange)[0], false);
            },
        );

        $('#calculateInstallment').on('click', function () {
            showControllers();
            calculateInstallmentCalc();
        });
    }
});