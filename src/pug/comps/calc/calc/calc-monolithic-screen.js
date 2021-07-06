import $ from "jquery";

export default function calcMonolithicScreen() {
    let state = MAIN_CALC_STATE[$(getActiveMainCalc()).attr('id')];

    // _MD postfix mean monolithic display
    parseWidthAndHeight_MD(state);

    setQModW_MD   (state);   // Количество модулей в ширину
    setQModH_MD   (state);   // Количество модулей в высоту
    setQModSum_MD (state);   // Количество модулей в изделии
    setUsedMod_MD (state);   // Используемый светодиодный модуль
    set$ModSum_MD (state);   // Сумма за модули
    setQBp_MD     (state);   // Количество блоков питания
    setUsedBp_MD  (state);   // Используемый блок питания
    set$BpSum_MD  (state);   // Сумма за блоки питания
    setQRv_MD     (state);   // Количество принимающих карт
    setUsedRv_MD  (state);   // Используемая принимающая карта
    set$RvSum_MD  (state);   // Сумма за принимающие карты
    set$St_MD     (state);   // Сумма за коммутацию (квадратный метр)
    setQMag_MD    (state);   // Количество магнитов
    setUsedMag_MD (state);   // Используемый магнитный держатель
    set$MagSum_MD (state);   // Сумма за магниты
    setUsedPr_MD  (state);   // Используемый профиль
    set$PrSum_MD  (state);   // Сумма за профиль
    setUsedUg_MD  (state);   // Используемый уголок
    set$UgSum_MD  (state);   // Сумма за уголки
    setQNa_MD     (state);   // Количество направляющих
    setUsedNa_MD  (state);   // Используемые направляющие
    set$NaSum_MD  (state);   // Стоимость направляющих
    setQMk_MD     (state);   // Количество металлоконструкции (квадратный метр)
    set$MkSum_MD  (state);   // Стоимость металлоконструкции
    setUsedSU_MD  (state);   // Система управления
    set$SUSum_MD  (state);   // Стоимость системы управления
    set$Sum_MD    (state);   // Стоимость экрана в $

    getExRate_MD(
        state,
        sendCalcResultsToServer
    );

    function sendCalcResultsToServer() {

        // ************************************************************************************
        // Send calc data to Server
        // ************************************************************************************

    }
}

function parseWidthAndHeight_MD(state) {
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

function setQModW_MD(state) {
    state.QModW = state.width / 320;

    if (isDebugMainCalcResults) {
        console.log(
            'QModW - Количество модулей в ширину:',
            state.QModW
        );
    }
}

function setQModH_MD(state) {
    state.QModH = state.height / 160;

    if (isDebugMainCalcResults) {
        console.log(
            'QModH - Количество модулей в высоту:',
            state.QModH
        );
    }
}

function setQModSum_MD(state) {
    state.QModSum = state.QModW * state.QModH;

    if (isDebugMainCalcResults) {
        console.log(
            'QModSum - Количество модулей в изделии:',
            state.QModSum
        );
    }
}

function setUsedMod_MD(state) {
    state.Mod = getMod(state); // should return the object obtained from the CALC_PRICE

    if (isDebugMainCalcResults) {
        console.log(
            'Mod - Используемый светодиодный модуль:',
            state.Mod
        );
    }
}

function getMod(state) {
    let pixels = "Q" + state.pixelStep;
    let location = state.location;
    let size = state.sizeType.join('*');
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

function set$ModSum_MD(state) {
    state.$ModSum = state.QModSum * (
        parseFloat(
            state.Mod.price.replace("," , ".")
        ) + 7); // Plus fix sum as 7$ for build service

    state.$ModSum = parseFloat(state.$ModSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$ModSum - Сумма за модули:',
            state.$ModSum
        );
    }
}

function setQBp_MD(state) {
    state.QBp = Math.ceil(state.QModSum / 6);

    if (isDebugMainCalcResults) {
        console.log(
            'QBp - Количество блоков питания:',
            state.QBp
        );
    }
}

function setUsedBp_MD(state) {
    state.Bp = getBp(); // should return the object obtained from the CALC_PRICE

    if (isDebugMainCalcResults) {
        console.log(
            'Bp - Используемый блок питания:',
            state.Bp
        );
    }
}

function getBp() {
    return CALC_PRICE.powerSupplies[0];
}

function set$BpSum_MD(state) {
    state.$BpSum = state.QBp * state.Bp.price;
    state.$BpSum = parseFloat(state.$BpSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$BpSum - Сумма за блоки питания:',
            state.$BpSum
        );
    }
}

function setQRv_MD(state) {

    let pixelStep = typeof state.pixelStep === 'string'
        ? parseFloat(state.pixelStep.replace("," , "."))
        : state.pixelStep;

    if ( pixelStep <= 1.66) {
        state.QRv = state.QModSum;

        if (isDebugMainCalcResults) {
            console.log('*** Для экрана используются модули с шагом пикселя 1,66 и менее! ' +
                'Используемый шаг пикселя: Q' + pixelStep + ' ***');
            console.log('QRv - Количество принимающих карт:', state.QRv);
        }

        return;
    }

    state.QRv = Math.ceil(state.QModSum / 6);

    if (isDebugMainCalcResults) {
        console.log(
            'QRv - Количество принимающих карт:',
            state.QRv
        );
    }
}

function setUsedRv_MD(state) {
    state.Rv = getRv(); // should return the object obtained from the CALC_PRICE

    if (isDebugMainCalcResults) {
        console.log(
            'Rv - Используемая принимающая карта:',
            state.Rv
        );
    }
}

function getRv() {
    return CALC_PRICE.controllers[0];
}

function set$RvSum_MD(state) {
    state.$RvSum = state.QRv * parseFloat(state.Rv.price.replace("," , "."));
    state.$RvSum = parseFloat(state.$RvSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$RvSum - Сумма за принимающие карты:',
            state.$RvSum
        );
    }
}

function set$St_MD(state) {
    state.$St = (state.width * state.height) / 1000000 * 7; // Fix price is 7 dollars
    state.$St = parseFloat(state.$St.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$St - Сумма за коммутацию (квадратный метр):',
            state.$St
        );
    }
}

function setQMag_MD(state) {
    state.QMag = state.QModSum * 4;

    if (isDebugMainCalcResults) {
        console.log(
            'QMag - Количество магнитов:',
            state.QMag
        );
    }
}

function setUsedMag_MD(state) {
    state.Mag = getMag();

    if (isDebugMainCalcResults) {
        console.log(
            'Mag - Используемый магнитный держатель:', state.Mag
        );
    }
}

function getMag() {
    return CALC_PRICE.magnets[0];
}

function set$MagSum_MD(state) {
    state.$MagSum = state.QMag * parseFloat(state.Mag.price.replace("," , "."));
    state.$MagSum = parseFloat(state.$MagSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$MagSum - Сумма за магниты:',
            state.$MagSum
        );
    }
}

function setUsedPr_MD(state) {
    state.Pr = getPr();

    if (isDebugMainCalcResults) {
        console.log(
            'Pr - Используемый профиль:',
            state.Pr
        );
    }
}

function getPr() {
    return CALC_PRICE.profiles[0];
}

function set$PrSum_MD(state) {
    state.$PrSum = (state.height + state.width) * 2 / 1000 * parseFloat(state.Pr.price.replace("," , "."));
    state.$PrSum = parseFloat(state.$PrSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$PrSum - Сумма за профиль:',
            state.$PrSum
        );
    }
}

function setUsedUg_MD(state) {
    state.Ug = getUg();
    if (isDebugMainCalcResults) {
        console.log(
            'Ug - Используемый уголок:',
            state.Ug
        );
    }
}

function getUg() {
    return CALC_PRICE.corners[0];
}

function set$UgSum_MD(state) {
    state.$UgSum = 4 * parseFloat(state.Ug.price.replace("," , "."));

    if (isDebugMainCalcResults) {
        console.log(
            '$UgSum - Сумма за уголки:',
            state.$UgSum
        );
    }
}

function setQNa_MD(state) {
    state.QNa = (state.QModW + 1) * (state.height / 1000);

    if (isDebugMainCalcResults) {
        console.log(
            'QNa - Количество направляющих (в метрах):',
            state.QNa
        );
    }
}

function setUsedNa_MD(state) {
    state.Na = getNa();

    if (isDebugMainCalcResults) {
        console.log(
            'Na - Используемые направляющие:',
            state.Na
        );
    }
}

function getNa() {
    return CALC_PRICE.guides[0];
}

function set$NaSum_MD(state) {
    state.$NaSum = state.QNa * parseFloat(state.Na.price.replace("," , "."));

    if (isDebugMainCalcResults) {
        console.log(
            '$NaSum - Стоимость направляющих:',
            state.$NaSum
        );
    }
}

function setQMk_MD(state) {
    state.QMk = (state.width * state.height) / 1000000;

    if (isDebugMainCalcResults) {
        console.log(
            'QMk - Количество металлоконструкции (квадратный метр):',
            state.QMk
        );
    }
}

function set$MkSum_MD(state) {
    state.$MkSum = state.QMk * 70; // The fixed price is 70$ per square meter
    state.$MkSum = parseFloat(state.$MkSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$MkSum - Стоимость металлоконструкции (70$ за 1 кв.м.):',
            state.$MkSum
        );
    }
}

function setUsedSU_MD(state) {
    state.SU = getControllerSystem(state); // should return the object obtained from the CALC_PRICE

    if (isDebugMainCalcResults) {
        console.log(
            'SU - Используемая система управления:',
            state.SU
        );
    }
}

function getControllerSystem(state) {
    let type = state.SUType;
    let systems = CALC_PRICE.controlSystems;

    return systems.filter(
        el => el.type === type
    )[0];
}

function set$SUSum_MD(state) {
    state.$SUSum = parseFloat(state.SU.price.replace("," , ".")) * 1.2;
    state.$SUSum = parseFloat(state.$SUSum.toFixed(2));

    if (isDebugMainCalcResults) {
        console.log(
            '$SUSum - Стоимость системы управлнеия = стоимость по прайсу (' + state.SU.price + ') + 20%:',
            state.$SUSum
        );
    }
}

function set$Sum_MD(state) {
    state.$Sum = state.$ModSum
        + state.$BpSum
        + state.$RvSum
        + state.$St
        + state.$MagSum
        + state.$PrSum
        + state.$UgSum
        + state.$NaSum
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
            '+ $PrSum ' +
            '+ $UgSum ' +
            '+ $NaSum ' +
            '+ $MkSum' +
            '+ $SUSum'
        );

        console.log(
            '$Sum - Итого сумма:',
            state.$Sum
        );
    }
}

function getExRate_MD(state, sendDataFunc) {
    let request = $.ajax({
        // Exchange rates from the website of the Central Bank
        url: "https://www.cbr-xml-daily.ru/daily_json.js",
    });

    request.done(
        response => setRubSum_MD(
            state,
            response,
            sendDataFunc)
    );

    request.fail(
        (jqXHR, textStatus) => handleErrorOnRequestExRate(
            jqXHR,
            textStatus)
    );
}

function setRubSum_MD(state, response, sendDataFunc) {
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

    sendDataFunc(); // Send data to server
}

function handleErrorOnRequestExRate(jqXHR, textStatus) {
    console.log('Произошла ошибка при попытке запросить курс доллара!');
    console.log('URL: https://ntart.ru/tempius/dollar/get.php');
    console.log(jqXHR);
    console.log(textStatus);

    alert('Произошла ошибка при попытке запросить курс доллара! Попробуйте немного позже.');
}
