import $ from "jquery";
import IMask from "imask";

window.isDebugMainCalc = true;

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

if (isDebugMainCalc && $('#mainCalc')[0]) console.log('Переменные: ', VARIABLE_COMMENTS);
if (isDebugMainCalc && $('#mainCalc')[0]) console.log('Условные обозначения: ', LEGEND_COMMENTS);

window.MAIN_CALC_STATE = {
    calcType: 'outsideScreen', // outsideScreen, insideScreen, mediaFaced, rentScreen

    outsideScreen: {
        executionType: 'monolithic', // monolithic, cabinet
        pixelStep: undefined,
        width: undefined,
        height: undefined,
    },
    insideScreen: {
        executionType: 'monolithic', // monolithic, cabinet
        pixelStep: undefined,
        width: undefined,
        height: undefined,
    },
    mediaFaced: {
        executionType: 'monolithic', // monolithic, cabinet
        pixelStep: undefined,
        width: undefined,
        height: undefined,
    },
    rentScreen: {
        rentConstruction: 'monolithic', // outdoor, Подвесная
        pixelStep: undefined,
        width: undefined,
        height: undefined,
    },
}

window.printMainState = function() {
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
        .forEach(addHandleClickToExecutionTypeController)

        function addHandleClickToExecutionTypeController(el) {
            $(el).on(
                'click',
                handleClickToExecutionTypeController
            );
        }

        function handleClickToExecutionTypeController () {
            let propName = $(this).data('calcProperty');
            let propValue = $(this).data('calcValue');
            let activeCalc = MAIN_CALC_STATE.calcType;

            MAIN_CALC_STATE[activeCalc][propName] = propValue;

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
            let min = parseInt($(input).attr('min'), 10);
            let max = parseInt($(input).attr('max'), 10);

            if (val < min) return min;
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
});