import $ from "jquery";

// Удалить полсе переноса на сервер
// На сервере цены будут бартся из прайса хранящегося в БД
import { calcPrice } from '../../../js/temp';

window.isDebugMainCalc = false;
window.isDebugMainCalcResults = true;

const VARIABLE_COMMENTS = {
    $: 'цена',
    H: 'высота экрана',
    W: 'ширина экрана',
    Q: 'количество',
    HCab: 'высота кабинета',
    WCab: 'ширина кабинета',
};

const LEGEND_COMMENTS = {
    Sum: 'общее',
    Mod: 'модуль',
    Rv: 'приним карта',
    Bp: 'блок питания',
    Mag: 'магнит',
    Pr: 'профиль ',
    Ug: 'уголок',
    Na: 'направляющие',
    Cab: 'кабинет',
    St: 'коммутация',
}

// if (isDebugMainCalc && $('#mainCalc')[0]) console.log('Переменные: ', VARIABLE_COMMENTS);
// if (isDebugMainCalc && $('#mainCalc')[0]) console.log('Условные обозначения: ', LEGEND_COMMENTS);

window.MAIN_CALC_STATE = {
    calcType: 'outsideScreen', // outsideScreen, insideScreen, mediaFaced, rentScreen
    outsideScreen: {
        location: "outdoor",
        executionType: 'monolithic', // monolithic, cabinet
        sizeType: [320, 160], // [320,160], [640,480], [640,640], [960,960]
        pixelStep: undefined,
        width: undefined,
        height: undefined,
        controllerParams: {
            width: {
                min: 320,
                max: 48000,
                step: 320
            },
            height: {
                min: 160,
                max: 48000,
                step: 160
            }
        },
        QModH: undefined,
        QModW: undefined,
        QModSum: undefined,
        usedDisplay: undefined,
        $ModSum: undefined,

    },
    insideScreen: {
        location: "indoor",
        executionType: 'monolithic', // monolithic, cabinet
        sizeType: [320, 160], // [320,160], [640,480], [640,640], [960,960]
        pixelStep: undefined,
        width: undefined,
        height: undefined,
        controllerParams: {
            width: {
                min: 320,
                max: 16000,
                step: 320
            },
            height: {
                min: 160,
                max: 12000,
                step: 160
            }
        },
        QModH: undefined,
        QModW: undefined,
        QModSum: undefined,
        usedDisplay: undefined,
        $ModSum: undefined,
    },
    mediaFaced: {
        executionType: 'monolithic', // monolithic, cabinet
        sizeType: [320, 160], // [320,160], [640,480], [640,640], [960,960]
        pixelStep: undefined,
        width: undefined,
        height: undefined,
        controllerParams: {
            width: {
                min: undefined,
                max: undefined,
                step: undefined
            },
            height: {
                min: undefined,
                max: undefined,
                step: undefined
            }
        }
    },
    rentScreen: {
        rentConstruction: 'monolithic', // outdoor, Подвесная
        sizeType: [320, 160], // [320,160], [640,480], [640,640], [960,960]
        pixelStep: undefined,
        width: undefined,
        height: undefined,
        controllerParams: {
            width: {
                min: undefined,
                max: undefined,
                step: undefined
            },
            height: {
                min: undefined,
                max: undefined,
                step: undefined
            }
        }
    },
}

function printMainState() {
    if ($('#mainCalc')[0]) {
        console.log('Выбранные значения: ', MAIN_CALC_STATE);
    }
}

window.getActiveMainCalc = function() {
    return $('.calc__calculator.active')[0];
}

$(document).ready(function () {
    // Handle click on additionally controller buttons
    $(() => $('.calc__collapse-controllers .btn')
        .toArray()
        .forEach(addHandleClickToBtnAdditionallyCalcControllers));

        function addHandleClickToBtnAdditionallyCalcControllers(el) {
            $(el).on(
                'click',
                toggleVisibleAdditionallyCalcControllers
            );
        }

        function toggleVisibleAdditionallyCalcControllers () {
            const HIDDEN_TIMEOUT = 500; // take this param from css transition
            let container = $(this).parent();

            if (isHidden(container)) {
                showEl(container);
            } else {
                hideEl(container, HIDDEN_TIMEOUT);
            }
        }

        function isHidden(el) {
            return $(el).hasClass('hidden');
        }

        function showEl(el) {
            $(el).removeClass('hidden');
            $(el).addClass('open');
        }

        function hideEl(el, timeout) {
            $(el).removeClass('open');

            setTimeout(
                () => {
                    $(el).addClass('hidden');
                },
                timeout
            )
        }


    // Handle click on calc tab buttons
    $(() => $('.calc__tab-list__button')
        .toArray()
        .forEach(addHandleClickToCalcTabs));

        function addHandleClickToCalcTabs(el) {
            $(el).on(
                'click',
                handleClickOnCalcTab
            );
        }

        function handleClickOnCalcTab() {
            let activeTabIndex = $(this).parent().index();
            let newActiveTabId = $(this).data('targetTabId');
            let newActiveCalcState = $(this).data('calcType');
            let isButtonInactive = isCalcTabInactive(this);

            if (isButtonInactive ) {
                deactivateCalcTabs();
                activateCalcTabs(activeTabIndex);
                deactivateCalcPicture();
                activateCalcPicture(newActiveTabId);
                toggleActiveCalc(newActiveTabId);
                setCalcTypeToState(newActiveCalcState);
                setExecutionTypeMarker();

                if (isDebugMainCalc) printMainState();
            }
        }

        function isCalcTabInactive(tab) {
            return !$(tab).hasClass('active');
        }

        function deactivateCalcTabs() {
            let buttons = $('.calc__tab-list__button');
            $(buttons).removeClass('active');
        }

        function activateCalcTabs(idx) {
            let wrappers = $('.calc__tab-list-wrap').toArray();

            wrappers.forEach(
                el => $(el)
                    .find('.calc__tab-list__slide:eq(' + idx + ')')
                    .children()
                    .addClass('active')
            );
        }

        function deactivateCalcPicture() {
            $('.calc__title-picture .image').removeClass('active');
        }

        function activateCalcPicture(id) {
            $('[data-calc-type-pic="' + id + '"]').addClass('active');
        }

        function toggleActiveCalc(id) {
            let calculators = $('.calc__calculator');
            const TIMEOUT_ANIMATION = 400; // take this parameter from css styles

            scrollToPageStart();

            $(calculators).addClass('hidden');

            setTimeout(
                () => {
                    $(calculators).removeClass('active');
                    $(id).addClass('active');
                },
                TIMEOUT_ANIMATION + 100
            );

            setTimeout(
                () => $(id).removeClass('hidden'),
                TIMEOUT_ANIMATION + 200
            );
        }

        function setCalcTypeToState(type) {
            MAIN_CALC_STATE.calcType = type;
        }

        function setExecutionTypeMarker() {
            setTimeout(setMarker, 700);

            function setMarker() {
                let radio = $(getActiveMainCalc()).find('.calc-execution-type');
                let marker = $(radio).children('.marker');
                let label = $(radio).find('input:checked + label');
                let width = $(label).innerWidth();
                let left = $(label).position().left;

                $(marker).css({
                    'width': width,
                    'left': left + 'px',
                    'opacity': '1',
                });
            }
        }

    // Sticky picture at the calc body
    $(window).scroll(function () {
        let container = $('.calc__calculator.active .calc__body-picture')[0];
        if (container) toggleStickyImg(container);
    });

        function toggleStickyImg(container) {
            let offsetTop = container.getBoundingClientRect().top;
            let pic = $(container).children('.calc__body-image');
            let stickyLeft = container.getBoundingClientRect().x;

            const STICKY_TOP = 150; // take this prop from css style

            if (offsetTop <= STICKY_TOP) {
                $(pic).addClass('sticky');
                $(pic).css('left', stickyLeft + 'px');
            } else {
                $(pic).removeClass('sticky');
                $(pic).attr('style', '');
            }
        }

        $(window).resize(resetStickyPics);

        function resetStickyPics() {
            let pics = $('.calc__body-image');

            $(pics).removeClass('sticky');
            $(pics).attr('style', '');
        }

    // Setting execution type
    $('.calc-execution-type label')
        .toArray()
        .forEach(addHandleClickOnExecutionTypeToggle)

        function addHandleClickOnExecutionTypeToggle(el) {
            $(el).click(
                handleClickOnExecutionTypeToggle
            );
        }

        function handleClickOnExecutionTypeToggle() {
            setExecutionTypeToState(this);
            toggleTypeOfCabin(this);
            setSizeTypeToState(this);
            setSizeTypeToInputsRange(this);
            correctInputRangesAfterUpdateState();
        }

        function setExecutionTypeToState(controller) {
            let propName = $(controller).data('calcProperty');
            let propValue = $(controller).data('calcValue');
            let activeCalc = MAIN_CALC_STATE.calcType;

            MAIN_CALC_STATE[activeCalc][propName] = propValue;

            if(isDebugMainCalc) printMainState();
        }

        function toggleTypeOfCabin(controller) {
            let type = $(controller).data('calcValue');
            let cabinTypeContainer = $(controller)
                .closest('.label-controll')
                .next('.cabin-type');

            type === 'cabinet'
                ? showCabinTypeContainer(cabinTypeContainer)
                : hideCabinTypeContainer(cabinTypeContainer);
        }

        function setSizeTypeToState(controller) {
            let calcType = getActiveMainCalc().attr('id');
            let calcProp = $(controller).data('calcProperty');

            MAIN_CALC_STATE[calcType].sizeType = (calcProp === 'executionType')
                ? getActiveCabinSizeType(controller)
                : getSizeTypeFromString($(controller).data('calcValue'));
        }

        function getActiveCabinSizeType(controller) {
            let screenType = $(controller).data('calcValue');

            if (screenType === 'monolithic') {
                return [320, 160];
            }

            let value = $(getActiveMainCalc())
                .find('.calc-cabin-type')
                .find('input:checked')
                .next('label')
                .data('calcValue');

            return getSizeTypeFromString(value);
        }

        function setSizeTypeToInputsRange(controller) {
            let from = $(controller).data('calcProperty');
            let value = $(controller).data('calcValue');
            let typeSize;

            if (from === 'executionType') {
                typeSize = getActiveCabinSizeType(controller);
            } else if (from === 'cabinType') {
                typeSize = getSizeTypeFromString(value);
            }

            setWidthToInputRange(typeSize[0]);
            setHeightToInputRange(typeSize[1]);

            setWidthParamsToCalcState(typeSize[0]);
            setHeightParamsToCalcState(typeSize[1]);
        }

        function setWidthToInputRange(width) {
            let container = $(getActiveMainCalc())
                .find('.label-controll__size-type-width');

            let controller = $(container)
                .find('.custom-input')
                .children('input');

            let slider = $(container)
                .find('.custom-range__slide');

            let newParams = getNewSizeTypeWidthParams(width);

            $(controller).data('min', newParams.min);
            $(controller).data('max', newParams.max);

            $(slider).prop('min', newParams.min);
            $(slider).prop('max', newParams.max);
            $(slider).prop('step', newParams.step);
        }

        function setWidthParamsToCalcState(width) {
            let calcType = $(getActiveMainCalc()).attr('id');
            let newParams = getNewSizeTypeWidthParams(width);

            MAIN_CALC_STATE[calcType].controllerParams.width.min = newParams.min;
            MAIN_CALC_STATE[calcType].controllerParams.width.max = newParams.max;
            MAIN_CALC_STATE[calcType].controllerParams.width.step = newParams.step;
        }

        function getNewSizeTypeWidthParams(value) {
            let screenType = $(getActiveMainCalc()).attr('id');
            let newParams = {};

            switch(screenType) {
                case 'outsideScreen':
                    newParams.min = newParams.step = value;
                    newParams.max = value * 150; // For outside screen maximum width is 150 modules.
                    break;

                case 'insideScreen':
                    newParams.min = newParams.step = value;
                    newParams.max = value * 50; // For inside screen maximum width is 50 modules.
                    break;

                default:
                    console.log('Unknown type of calculator!');
                    break;
            }

            return newParams;
        }

        function setHeightParamsToCalcState(height) {
            let calcType = $(getActiveMainCalc()).attr('id');
            let newParams = getNewSizeTypeHeightParams(height);

            MAIN_CALC_STATE[calcType].controllerParams.height.min = newParams.min;
            MAIN_CALC_STATE[calcType].controllerParams.height.max = newParams.max;
            MAIN_CALC_STATE[calcType].controllerParams.height.step = newParams.step;
        }

        function setHeightToInputRange(height) {
            let container = $(getActiveMainCalc())
                .find('.label-controll__size-type-height');

            let controller = $(container)
                .find('.custom-input')
                .children('input');

            let slider = $(container)
                .find('.custom-range__slide');

            let newParams = getNewSizeTypeHeightParams(height);

            $(controller).data('min', newParams.min);
            $(controller).data('max', newParams.max);

            $(slider).prop('min', newParams.min);
            $(slider).prop('max', newParams.max);
            $(slider).prop('step', newParams.step);
        }

        function getNewSizeTypeHeightParams(value) {
            let screenType = $(getActiveMainCalc()).attr('id');
            let newParams = {};

            switch(screenType) {
                case 'outsideScreen':
                    newParams.min = newParams.step = value;
                    newParams.max = value * 300; // For outside screen maximum height is 300 modules.
                    break;

                case 'insideScreen':
                    newParams.min = newParams.step = value;
                    newParams.max = value * 75; // For inside screen maximum height is 75 modules.
                    break;

                default:
                    console.log('Unknown type of calculator!');
                    break;
            }

            return newParams;
        }

        function correctInputRangesAfterUpdateState() {
            correctCalcInputRanges('width');
            correctCalcInputRanges('height');
        }

        function correctCalcInputRanges(stateProperty) {
            let activeCalc = $(getActiveMainCalc()).attr('id');
            let valInState = MAIN_CALC_STATE[activeCalc][stateProperty];

            if (valInState === undefined) return; // Work only if values was set

            let min = MAIN_CALC_STATE[activeCalc].controllerParams[stateProperty].min;
            let max = MAIN_CALC_STATE[activeCalc].controllerParams[stateProperty].max;
            let step = MAIN_CALC_STATE[activeCalc].controllerParams[stateProperty].step;
            let newValue;

            if (valInState < min) newValue = min;
            else if (valInState > max) newValue = max;
            else if (valInState % step === 0) newValue = valInState;
            else {
                let wholeNumber = Math.trunc(valInState / step) + 1;
                let roundVal = step * wholeNumber;

                newValue = roundVal > max
                    ? max
                    : roundVal;
            }

            let container = $(getActiveMainCalc())
                .find('.label-controll__size-type-' + stateProperty);

            let controller = $(container)
                .find('.custom-input')
                .children('input');

            let slider = $(container)
                .find('.custom-range__slide');

            $(controller).val(newValue);
            $(slider).val(newValue);

            setRange(slider[0], false);
        }

        function showCabinTypeContainer(container) {
            let caption = $(container).children('.label-controll__caption');
            $(container).removeClass('hidden');

            setTimeout(
                () => {
                    $(container).addClass('visible');
                    $(caption).addClass('visible');
                    setCabinTypeMarker();
                },
                100
            );
        }

        function setCabinTypeMarker() {
            setTimeout(setMarker, 200);

            function setMarker() {
                let radio = $(getActiveMainCalc()).find('.calc-cabin-type');
                let marker = $(radio).children('.marker');
                let label = $(radio).find('input:checked + label');
                let width = $(label).innerWidth();
                let left = $(label).position().left;

                $(marker).css({
                    'width': width,
                    'left': left + 'px',
                    'opacity': '1',
                });
            }
        }

        function hideCabinTypeContainer(container) {
            let caption = $(container).children('.label-controll__caption');
            $(container).removeClass('visible');
            $(caption).removeClass('visible');

            setTimeout(
                () => {
                    $(container).addClass('hidden');
                },
                500
            );
        }

        function getSizeTypeFromString(sizeTypeStr) {
            return sizeTypeStr
                .split(',')
                .map(el => parseInt(el, 10));
        }

    // Settings type size
    $('.calc-cabin-type label')
        .toArray()
        .forEach(addHandlerClickOnTypeSizeToggle);

        function addHandlerClickOnTypeSizeToggle(el) {
            $(el).click(
                handlerClickOnTypeSizeToggle
            );
        }

        function handlerClickOnTypeSizeToggle() {
            setSizeTypeToState(this);
            setSizeTypeToInputsRange(this);
            correctInputRangesAfterUpdateState();

            if(isDebugMainCalc) printMainState();
        }

    // Setting pixel step
    $('.calc-pixel-step .filter-controller')
        .toArray()
        .forEach(addHandleClickToPixelStepController)

        function addHandleClickToPixelStepController(el) {
            $(el).on(
                'click',
                handleClickToPixelStepController
            );
        }

        function handleClickToPixelStepController () {
            let propName = $(this).data('calcProperty');
            let propValue = $(this).data('calcValue');
            let activeCalc = MAIN_CALC_STATE.calcType;

            MAIN_CALC_STATE[activeCalc][propName] = propValue;

            if(isDebugMainCalc) printMainState();
        }

    // Setting the width and height of the screen to its state and the range controller
    $('#mainCalc .custom-range .custom-input input')
        .toArray()
        .forEach(addHandleOnFocusoutRangeInput);

        function addHandleOnFocusoutRangeInput(el) {
            $(el).focusout(
                handleOnFocusoutRangeInput
            );
        }

        function handleOnFocusoutRangeInput() {
            let value = getRoundRangeVal(this);

            pushValToInputValue(value, this);
            pushValToRange(value, this);
        }

        function getRoundRangeVal(input) {
            let val = parseInt($(input).val(), 10);
            let min = parseInt($(input).data('min'), 10);
            let max = parseInt($(input).data('max'), 10);

            if (Number.isNaN(val)) return min; // for blank strings
            else if (val < min) return min;
            else if (val > max) return max;
            else if (val % min === 0) return val;

            let wholeNumber = Math.trunc(val / min) + 1;
            let roundVal = min * wholeNumber;

            return roundVal > max
                ? max
                : roundVal;
        }

        function pushValToInputValue(value, input) {
            $(input).val(value);
        }

        function pushValToRange(value, input) {
            let range = $(input)
                .closest('.custom-input')
                .next('.custom-range__controller')
                .find('.custom-range__slide')[0];

            $(range).val(value);
            setRange(range, false);
        }

    // Submit calc forms
    $('#mainCalc form')
        .toArray()
        .forEach(addHandleOnCalcFormSubmit)

        function addHandleOnCalcFormSubmit(el) {
            $(el).submit(handleOnCalcFormSubmit)
        }

        function handleOnCalcFormSubmit(evt) {
            evt.preventDefault();
            // SPINNER.addClass('visible');

            checkCalcPixelStep();
            checkCalcWidth();
            checkCalcHeight();

            let calcType = MAIN_CALC_STATE.calcType;
            let executionType = MAIN_CALC_STATE[calcType].executionType;

            switch (executionType) {
                case 'monolithic':
                    calcMonolithicScreen();
                    break;
                case 'cabinet':
                    calcCabinetScreen();
                    break;
            }
        }

        function checkCalcPixelStep() {
            let calc = $(getActiveMainCalc()).attr('id')
            let pixelStep = MAIN_CALC_STATE[calc].pixelStep;

            if (pixelStep === undefined) {
                $(getActiveMainCalc())
                    .find('.calc-pixel-step')
                    .find('.scroller')
                    .children('.filter-controller:first-child')
                    .click();
            }
        }

        function checkCalcWidth() {
            let calc = $(getActiveMainCalc()).attr('id')
            let width = MAIN_CALC_STATE[calc].width;

            if (width === undefined) {
                $(getActiveMainCalc())
                    .find('.label-controll__size-type-width')
                    .find('.custom-input input')
                    .focusout();
            }
        }

        function checkCalcHeight() {
            let calc = $(getActiveMainCalc()).attr('id')
            let height = MAIN_CALC_STATE[calc].height;

            if (height === undefined) {
                $(getActiveMainCalc())
                    .find('.label-controll__size-type-height')
                    .find('.custom-input input')
                    .focusout();
            }
        }

        function calcMonolithicScreen() {
            let state = MAIN_CALC_STATE[$(getActiveMainCalc()).attr('id')];

            state.QModW = state.width / 320;
            if (isDebugMainCalcResults) console.log('QModW - Количество модулей в ширину: ', state.QModW);

            state.QModH = state.height / 160;
            if (isDebugMainCalcResults) console.log('QModH - Количество модулей в высоту: ', state.QModH);

            state.QModSum = state.QModW * state.QModH;
            if (isDebugMainCalcResults) console.log('QModSum - Количество модулей в изделии: ', state.QModSum);

            state.usedDisplay = getUsedDisplayUnit(state);
            if (isDebugMainCalcResults) console.log('Используемый светодиодный модуль: ', state.usedDisplay);

            state.$ModSum = state.QModSum * (
                parseFloat(
                    state.usedDisplay.price.replace(",",".")
                ) + 6);
            if (isDebugMainCalcResults) console.log('$ModSum - Сумма за модули: ', state.$ModSum);








            console.log('--- --- --- --- --- --- ---');
        }

        function calcCabinetScreen() {
            console.log('calcCabinetScreen')
        }

        function getUsedDisplayUnit(state) {
            let pixels = "Q" + state.pixelStep;
            let location = state.location;
            let size = state.sizeType.join('*');

            return calcPrice.filter(
                display => display.pixels === pixels
                    && display.location === location
                    && display.size === size
            )[0];
        }

});