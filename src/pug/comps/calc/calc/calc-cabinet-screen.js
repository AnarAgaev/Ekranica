import $ from "jquery";

export default function calcCabinetScreen() {
    let state = MAIN_CALC_STATE[$(getActiveMainCalc()).attr('id')];

    // _CD postfix mean Cabinet display
    parseWidthAndHeight_CD(state);

    setQCabW_CD   (state);   // Количество кабинетов в ширину
    setQCabH_CD   (state);   // Количество кабинетов в высоту
    setQCab_CD    (state);   // Количество кабинетов в изделии
    setQModCab_CD (state);   // Количество модулей в одном кабинете
    setQModSum_CD (state);   // Количество модулей в изделии
    setUsedMod_CD (state);   // Используемый светодиодный модуль
    set$ModSum_CD (state);   // Сумма за модули
    setQBp_CD     (state);   // Количество блоков питания
    setUsedBp_CD  (state);   // Используемый блок питания
    set$BpSum_CD  (state);   // Сумма за блоки питания
    setQRv_CD     (state);   // Количество принимающих карт
    setUsedRv_CD  (state);   // Используемая принимающая карта
    set$RvSum_CD  (state);   // Сумма за принимающие карты
    set$St_CD     (state);   // Сумма за коммутацию (квадратный метр)
    setQMag_CD    (state);   // Количество магнитов
    setUsedMag_CD (state);   // Используемый магнитный держатель
    set$MagSum_CD (state);   // Сумма за магниты
    setUsedCab_CD (state);   // Используемый кабинет
    set$CabSum_CD (state);   // Сумма за кабинеты
    setQMk_CD     (state);   // Количество металлоконструкции (квадратный метр)
    set$MkSum_CD  (state);   // Стоимость металлоконструкции
    setUsedSU_CD  (state);   // Система управления
    set$SUSum_CD  (state);   // Стоимость системы управления
    set$Sum_CD    (state);   // Стоимость экрана в $ без учёта доп. параметров
    set$RG_CD     (state);   // Стоимость с учётом расширенной гарантии
    set$RS_CD     (state);   // Стоимость с учётом расширенного сервиса
    set$SumDop_CD (state);   // Стоимость экрана в $ с учётом доп. параметров
    printDop_CD   (state);   // Печатем в консоль доп. параметры не входящие в рассчёт

    getExRate_CD( state, printResults ); // Получаем курс валют на завтра и выводим сумму

    function printResults(finalState) {
        let resJSON = JSON.stringify(finalState);
        let rubSum = finalState.RubSum.toLocaleString('ru-RU'); //   new Intl.NumberFormat('ru-RU').format(finalState.RubSum);
        let calc = $('#' + finalState.calcType);
        let resForm = calc.find('.calc-results-form');
        let resInput = calc.find('.calc-results-input');
        let resNumber = calc.find('.calc-results-number');

        $(resInput).val(resJSON);
        $(resNumber).text(rubSum + ' ₽');

        if (getScreenType() === 'sm' || getScreenType() === 'md') {
            $(resForm).css('display', 'flex');

            setTimeout(
                () => scrollToCalcResults(resForm),
                100
            );
        }

        setTimeout(
            () => $(resForm).addClass('visible'),
            100
        );
    }

    function scrollToCalcResults(form) {
        let offsetTop = form.offset().top;
        let headerHeight = $('#header').height();
        let targetScroll = offsetTop - headerHeight + 10;

        $('body,html').animate(
            {scrollTop: targetScroll},
            500
        );
    }
}

function parseWidthAndHeight_CD(state) {
    state.width = parseInt(state.width, 10);
    state.height = parseInt(state.height, 10);

    if (isDebugMainCalcResults) {
        console.log(
            'W - Ширина экрана (мм):',
            state.width
        );

        console.log(
            'H - Высота экрана (мм):',
            state.height
        );
    }
}

function setQCabW_CD (state) {
    state.QCabW = state.width / state.sizeType[0];

    if (isDebugMainCalcResults) {
        console.log(
            'QCabW - Количество кабинетов в ширину:',
            state.QCabW
        );
    }
}

function setQCabH_CD (state) {
    state.QCabH = state.height / state.sizeType[1];

    if (isDebugMainCalcResults) {
        console.log(
            'QCabH - Количество кабинетов в высоту:',
            state.QCabH
        );
    }
}

function setQCab_CD (state) {
    state.QCab = state.QCabW * state.QCabH;

    if (isDebugMainCalcResults) {
        console.log(
            'QCab - Количество кабинетов в изделии:',
            state.QCab
        );
    }
}

function setQModCab_CD (state) {
    let cabinType = state.sizeType[0] + 'x' + state.sizeType[1];
    let modWidth = 320;
    let modHeight = 160;
    let modInWidth = state.sizeType[0] / modWidth;
    let modInHeight = state.sizeType[1] / modHeight;

    state.QModCab = modInWidth * modInHeight;

    if (isDebugMainCalcResults) {
        console.log(
            'QModCab - Количество модулей (320x160) в кабинете ' + cabinType + ':',
            state.QModCab
        );
    }
}

function setQModSum_CD(state) {
    state.QModSum = state.QCab * state.QModCab;

    if (isDebugMainCalcResults) {
        console.log(
            'QModSum - Количество модулей в изделии (QCab * QModCab):',
            state.QModSum
        );
    }
}

function setUsedMod_CD(state) {
    state.Mod = getMod_CD(state); // should return the object obtained from the CALC_PRICE

    if (isDebugMainCalcResults) {
        console.log(
            'Mod - Используемый светодиодный модуль:',
            state.Mod
        );
    }
}

function getMod_CD(state) {
    let pixels = "Q" + state.pixelStep;
    let location = state.location;
    let size = '320*160'; // use modules only size 320*160
    let unit = CALC_PRICE.modules.filter(
        module => module.pixels === pixels
            && module.location === location
            && module.size === size
    );

    if (unit.length > 1) unit = unit.filter(
        module => module.type === "ECO" // Changed to the PRO this parameter if its need customer
    );

    return unit[0];
}

function set$ModSum_CD(state) {
    state.$ModSum = state.QModSum * (
        parseFloat(
            state.Mod.price.replace("," , ".")
        ) + 2.7); // Plus fix sum as 2.7$ for build service

    state.$ModSum = parseFloat(state.$ModSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$ModSum - Сумма за модули:',
            state.$ModSum
        );
    }
}

function setQBp_CD(state) {
    state.QBp = Math.ceil(state.QModSum / 6);

    if (isDebugMainCalcResults) {
        console.log(
            'QBp - Количество блоков питания:',
            state.QBp
        );
    }
}

function setUsedBp_CD(state) {
    state.Bp = getBp_CD(); // should return the object obtained from the CALC_PRICE

    if (isDebugMainCalcResults) {
        console.log(
            'Bp - Используемый блок питания:',
            state.Bp
        );
    }
}

function getBp_CD() {
    return CALC_PRICE.powerSupplies[0];
}

function set$BpSum_CD(state) {
    state.$BpSum = state.QBp * state.Bp.price;
    state.$BpSum = parseFloat(state.$BpSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$BpSum - Сумма за блоки питания:',
            state.$BpSum
        );
    }
}

function setQRv_CD(state) {

    let pixelStep = typeof state.pixelStep === 'string'
        ? parseFloat(state.pixelStep.replace("," , "."))
        : state.pixelStep;

    if ( pixelStep <= 1.66) {
        state.QRv = state.QModSum;

        if (isDebugMainCalcResults) {
            console.log(
                '*** Для экрана используются модули с шагом пикселя 1,66 и менее! ' +
                'Для данных экранов количество принимающих карт ' +
                'равно количестову модулей (' + state.QModSum + ' модулей). ' +
                'Используемый шаг пикселя: Q' + pixelStep);
            console.log('QRv - Количество принимающих карт:', state.QRv);
        }

        return;
    }

    state.QRv = state.QCab;

    if (isDebugMainCalcResults) {
        console.log(
            'QRv - Количество принимающих карт (равно количеству Кабинетов):',
            state.QRv
        );
    }
}

function setUsedRv_CD(state) {
    state.Rv = getRv_CD(); // should return the object obtained from the CALC_PRICE

    if (isDebugMainCalcResults) {
        console.log(
            'Rv - Используемая принимающая карта:',
            state.Rv
        );
    }
}

function getRv_CD() {
    return CALC_PRICE.controllers[0];
}

function set$RvSum_CD(state) {
    state.$RvSum = state.QRv * parseFloat(state.Rv.price.replace("," , "."));
    state.$RvSum = parseFloat(state.$RvSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$RvSum - Сумма за принимающие карты:',
            state.$RvSum
        );
    }
}

function set$St_CD(state) {
    state.$St = (state.width * state.height) / 1000000 * 7; // Fix price is 7 dollars
    state.$St = parseFloat(state.$St.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$St - Сумма за коммутацию (квадратный метр):',
            state.$St
        );
    }
}

function setQMag_CD(state) {
    state.QMag = state.QModSum * 4;

    if (isDebugMainCalcResults) {
        console.log(
            'QMag - Количество магнитов:',
            state.QMag
        );
    }
}

function setUsedMag_CD(state) {
    state.Mag = getMag_CD();

    if (isDebugMainCalcResults) {
        console.log(
            'Mag - Используемый магнитный держатель:', state.Mag
        );
    }
}

function getMag_CD() {
    return CALC_PRICE.magnets[0];
}

function set$MagSum_CD(state) {
    state.$MagSum = state.QMag * parseFloat(state.Mag.price.replace("," , "."));
    state.$MagSum = parseFloat(state.$MagSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$MagSum - Сумма за магниты:',
            state.$MagSum
        );
    }
}

function setUsedCab_CD(state) {
    state.Cab = getCab_CD(state); // should return the object obtained from the CALC_PRICE

    if (isDebugMainCalcResults) {
        console.log(
            'Cab - Используемый кабинет:', state.Cab
        );
    }
}

function getCab_CD(state) {
    let location = state.location;
    let type = state.sizeType.join('');
    let unit = CALC_PRICE.cabinets.filter(
        cabinet => cabinet.location === location && cabinet.type === type
    );

    return unit[0];
}

function set$CabSum_CD(state) {
    state.$CabSum = state.QCab * parseFloat(state.Cab.price.replace("," , "."));
    state.$CabSum = parseFloat(state.$CabSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$CabSum - Сумма за кабинеты:',
            state.$CabSum
        );
    }
}

function setQMk_CD(state) {
    state.QMk = (state.width * state.height) / 1000000;

    if (isDebugMainCalcResults) {
        console.log(
            'QMk - Количество металлоконструкции (квадратный метр):',
            state.QMk
        );
    }
}

function set$MkSum_CD(state) {
    state.$MkSum = state.QMk * 70; // The fixed price is 70$ per square meter
    state.$MkSum = parseFloat(state.$MkSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$MkSum - Стоимость металлоконструкции (70$ за 1 кв.м.):',
            state.$MkSum
        );
    }
}

function setUsedSU_CD(state) {
    state.SU = getControllerSystem_CD(state); // should return the object obtained from the CALC_PRICE

    if (isDebugMainCalcResults) {
        console.log(
            'SU - Используемая система управления:',
            state.SU
        );
    }
}

function getControllerSystem_CD(state) {
    let type = state.SUType;
    let systems = CALC_PRICE.controlSystems;

    return systems.filter(
        el => el.type === type
    )[0];
}

function set$SUSum_CD(state) {
    state.$SUSum = parseFloat(state.SU.price.replace("," , ".")) * 1.2;
    state.$SUSum = parseFloat(state.$SUSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$SUSum - Стоимость системы управлнеия = стоимость по прайсу (' + state.SU.price + ') + 20%:',
            state.$SUSum
        );
    }
}

function set$Sum_CD(state) {
    state.$Sum = state.$ModSum
        + state.$BpSum
        + state.$RvSum
        + state.$St
        + state.$MagSum
        + state.$CabSum
        + state.$MkSum
        + state.$SUSum;

    state.$Sum = parseFloat(state.$Sum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$Sum = $ModSum ' +
            '+ $BpSum ' +
            '+ $RvSum ' +
            '+ $St ' +
            '+ $MagSum ' +
            '+ $CabSum ' +
            '+ $MkSum ' +
            '+ $SUSum'
        );

        console.log(
            '$Sum - Итого сумма ($) без учёта доп. параметров:',
            state.$Sum
        );
    }
}

function set$RG_CD(state) {
    if (state.RG !== undefined) {
        let percent = 20;
        let $RG;

        for (let i = 1; i <= state.RG; i++) {
            percent += 10;
        }

        $RG = (state.$Sum / 100) * percent;
        state.$RG = parseFloat($RG.toFixed(2));

        if (isDebugMainCalcResults) {
            console.log(
                'Расширенная гарантия (' + percent + '%):',
                state.$RG
            );
        }

        return;
    }

    if (isDebugMainCalcResults)
        console.log('Расширенная гарантия: НЕТ');
}

function set$RS_CD(state) {
    if (state.RS !== undefined) {
        let percent = 0;
        let $RS;

        for (let i = 1; i <= state.RS; i++) {
            percent += 10;
        }

        $RS = (state.$Sum / 100) * percent;
        state.$RS = parseFloat($RS.toFixed(2));

        if (isDebugMainCalcResults) {
            console.log(
                'Расширенный сервис (' + percent + '%):',
                state.$RS
            );
        }

        return;
    }

    if (isDebugMainCalcResults)
        console.log('Расширенный сервис: НЕТ');
}

function set$SumDop_CD (state) {
    let $RG = state.$RG === undefined
        ? 0
        : state.$RG;

    let $RS = state.$RS === undefined
        ? 0
        : state.$RS;

    state.$Sum = state.$Sum + $RG + $RS;
    state.$Sum = parseFloat(state.$Sum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$Sum - Итого сумма ($) с учётом доп. параметров ' +
            '(Расширенная гарантия, Рассширенный сервис ' +
            '$Sum = $Sum + $RG + $RS):',
            state.$Sum
        );
    }
}

function printDop_CD (state) {
    if (isDebugMainCalcResults) {
        console.log('Управление контентом:',
            state.UK === 'place'
                ? 'На месте'
                : state.UK === 'remotely'
                ? 'Удалённо'
                : 'НЕТ'
        );

        console.log('Датчик яркости:', state.DY === undefined ? 'НЕТ' : 'ДА');
        console.log('Электротехнический проект:', state.EP === undefined ? 'НЕТ' : 'ДА');
        console.log('Электрощитовая:', state.ESH === undefined ? 'НЕТ' : 'ДА');
        console.log('Проект металлоконструкции:', state.PM === undefined ? 'НЕТ' : 'ДА');
        console.log('Комплект запасных частей:', state.ZCH === undefined ? 'НЕТ' : 'ДА');
    }
}

function getExRate_CD(state, fPrintResults) {
    let request = $.ajax({
        // Exchange rates from the website of the Central Bank
        url: "https://www.cbr-xml-daily.ru/daily_json.js",
    });

    request.done(
        response => setRubSum_CD(
            state,
            response,
            fPrintResults)
    );

    request.fail(
        (jqXHR, textStatus) => handleErrorOnRequestExRate(
            jqXHR,
            textStatus)
    );
}

function setRubSum_CD(state, response, fPrintResult) {
    let rates = JSON.parse(response);

    state.ExchangeRate = parseFloat(rates.Valute.USD.Value);

    if (isDebugMainCalcResults) {
        console.log('ExchangeRate - Обменный курс на момент рассчёта:', state.ExchangeRate);
        console.log('ExchangeRate + 1% - Обменный курс + 1%:', state.ExchangeRate * 1.01);
    }

    state.RubSum = state.$Sum * (state.ExchangeRate * 1.01);
    state.RubSum = parseFloat(state.RubSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log('RubSum - Итого сумма в рублях:', state.RubSum);
        console.log('--- --- --- --- --- --- ---');
    }

    SPINNER.removeClass('visible');

    fPrintResult(state);
}

function handleErrorOnRequestExRate(jqXHR, textStatus) {
    console.log('Произошла ошибка при попытке запросить курс доллара!');
    console.log('URL: https://ntart.ru/tempius/dollar/get.php');
    console.log(jqXHR);
    console.log(textStatus);

    alert('Произошла ошибка при попытке запросить курс доллара! Попробуйте немного позже.');
}