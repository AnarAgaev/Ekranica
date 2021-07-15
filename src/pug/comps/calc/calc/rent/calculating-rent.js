import $ from 'jquery';

const CABIN_PRICE = 1250,
    CONSTRUCTION_PRICE = {
        floor: 1000,
        suspended: 0
    },

    SYSTEM_CONTROL_PRICE = {
        controller: 3000,
        processor: 5000
    },

    TECHNICIAN_PRICE = 5000;

export default function calculatingRent () {
    let state = MAIN_CALC_STATE[$(getActiveMainCalc()).attr('id')];

    // _R postfix mean rent calculator
    parseWidthAndHeight_R   (state);
    setQCabW_R              (state); // Количество кабинетов в ширину
    setQCabH_R              (state); // Количество кабинетов в высоту
    setQCabSum_R            (state); // Всего кабинетов в экране
    set$CabSum_R            (state); // Стоимость всех кабинетов
    printExecution_R        (state);
    printPixelStep_R        (state);
    printConstruction_R     (state);
    setSupportsNumber_R     (state);
    setConstructionPrice_R  (state);
    setSystemControlPrice_R (state);
    setTechnicianPrice_R    (state);
    printDelivery_R         (state);
    printDateStart_R        (state);
    setCostPerRentDay_R     (state);
    setFinalCost_R          (state);
    printCalcRentResults_R  (state);

    if (isDebugMainCalcResults) {
        console.log('--- --- --- --- --- ---');
    }
}

function parseWidthAndHeight_R (state) {
    state.width = parseInt(state.width, 10);
    state.height = parseInt(state.height, 10);

    if (isDebugMainCalcResults) {
        console.log(
            'Ширина экрана (мм):',
            state.width
        );

        console.log(
            'Высота экрана (мм):',
            state.height
        );
    }
}

function setQCabW_R (state) {
    state.QCabW = state.width / 500;

    if (isDebugMainCalcResults) {
        console.log(
            'Количество кабинетов в ширину:',
            state.QCabW
        );
    }
}

function setQCabH_R (state) {
    state.QCabH = state.height / 500;

    if (isDebugMainCalcResults) {
        console.log(
            'Количество кабинетов в высоту:',
            state.QCabH
        );
    }
}

function setQCabSum_R (state) {
    state.QCabSum = state.QCabW * state.QCabH ;

    if (isDebugMainCalcResults) {
        console.log(
            'Всего кабинетов в экране:',
            state.QCabSum
        );
    }
}

function set$CabSum_R (state) {
    state.$CabSum = state.QCabSum * CABIN_PRICE;

    if (isDebugMainCalcResults) {
        console.log(
            'Стоимость всех кабинетов в экране:',
            state.$CabSum
        );
    }
}

function printExecution_R (state) {
    if (isDebugMainCalcResults) {
        let execution = state.execution === 'inner'
            ? 'Внутренний'
            : 'Внешний';

        console.log( `Исполнение: ${execution}`);
    }
}

function printPixelStep_R (state) {
    if (isDebugMainCalcResults) {
        console.log(`Шаг пикселя: ${state.pixelStep} мм.`);
    }
}

function printConstruction_R (state) {
    if (isDebugMainCalcResults) {
        let construction =
            state.construction === 'floor'
                ? `Напольная`
                : `Подвесная`

        console.log(`Конструкция: ${construction}`);
    }
}

function setSupportsNumber_R (state) {
    if (state.construction === 'floor') {
        let plusCount = (state.width % 1500 === 0) ? 1 : 2,
            roundCount = Math.trunc(state.width / 1500);

        state.supportsNumber = plusCount + roundCount;

        if (isDebugMainCalcResults) {
            console.log(`Количество опор: ${state.supportsNumber}`);
        }
    }
}

function setConstructionPrice_R (state) {
    state.constructionPrice = (state.construction === 'floor')
        ? state.supportsNumber * CONSTRUCTION_PRICE.floor
        : 0;

    if (isDebugMainCalcResults && state.construction === 'floor') {
        console.log(`Стоимость опор: ${state.constructionPrice} руб.`);
    }
}

function setSystemControlPrice_R (state) {
    state.systemControlPrice =
        state.systemControl === 'controller'
            ? SYSTEM_CONTROL_PRICE.controller
            : SYSTEM_CONTROL_PRICE.processor;

    if (isDebugMainCalcResults) {
        let systemControl =
            state.systemControl === 'controller'
                ? `Контроллер`
                : `Процессор`

        console.log(`Система управления: ${systemControl} (плюс ${state.systemControlPrice} руб. к цене)`);
    }
}

function setTechnicianPrice_R (state) {
    state.technicianPrice = state.technician
        ? TECHNICIAN_PRICE
        : 0;

    if (isDebugMainCalcResults) {
        let technician = state.technician
                ? `Нужен (плюс ${state.technicianPrice} руб. к цене)`
                : 'Не нужен';

        console.log(`Техник для управления контентом: ${technician}`);
    }
}

function printDelivery_R (state) {
    if (isDebugMainCalcResults) {
        let delivery = state.delivery
            ? 'Нужна'
            : 'Не нужна';

        console.log(`Доставка за пределы Москвы: ${delivery}`);
    }
}

function printDateStart_R (state) {
    if (isDebugMainCalcResults) {
        let dateStart = state.dateStart !== undefined
            ? state.dateStart
            : 'Не указана';

        console.log(`Дата начала срока аренды: ${dateStart}`);
    }
}

function setCostPerRentDay_R (state) {
    state.costPerDay =
        state.$CabSum // стоимость всех кабинетов
        + state.constructionPrice // стоимость ног (напольный), подвесов (подвесной)
        + state.systemControlPrice // стоимость системы управления (контроллер, процессок)
        + state.technicianPrice; // стоимость техника на управление контентом

    if (isDebugMainCalcResults) {
        console.log(`Стоимость одного дня аренды экрана: ${state.costPerDay} руб.`);
    }
}

function setFinalCost_R (state) {
    let days = state.rentDays,
        percent = 0;

    if (days >= 1)  percent += 1;
    if (days >= 2)  percent += 0.5;
    if (days >= 3)  percent += 0.3;
    if (days >= 4)  percent += 0.15;
    if (days >= 5)  percent += 0.15;
    if (days >= 6)  percent += 0.15;
    if (days >= 7)  percent += 0.15;
    if (days >= 8)  percent += 0.15;
    if (days >= 9)  percent += 0.15;
    if (days >= 10) percent += 0.15;

    if (days > 10) {
        for (let i = 0; i < days - 10; i++) {
            percent += 0.1;
        }
    }

    state.cost = state.costPerDay * percent;

    if (isDebugMainCalcResults) {
        console.log(`Количество дней аренды: ${state.rentDays}`);
        console.log(`Итого стоимость экрана (с учётом скидки за срок аренды): ${state.cost} руб.`);
    }
}

function printCalcRentResults_R (state) {
    let resJSON = JSON.stringify(state);
    let rubSum = state.cost.toLocaleString('ru-RU');
    let calc = $('#' + state.calcType);
    let resForm = calc.find('.calc-results-form');
    let resInput = calc.find('.calc-results-input');
    let resNumber = calc.find('.calc-results-number');

    SPINNER.removeClass('visible');

    $(resInput).val(resJSON);
    $(resNumber).text(rubSum + ' ₽');

    if (getScreenType() === 'sm' || getScreenType() === 'md') {
        $(resForm).css('display', 'flex');

        setTimeout(
            () => scrollToCalcRentResults(resForm),
            100
        );
    }

    setTimeout(
        () => $(resForm).addClass('visible'),
        100
    );
}

function scrollToCalcRentResults(form) {
    let offsetTop = form.offset().top;
    let headerHeight = $('#header').height();
    let targetScroll = offsetTop - headerHeight + 10;

    $('body,html').animate(
        {scrollTop: targetScroll},
        500
    );
}

