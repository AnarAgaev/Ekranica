import $ from "jquery";
import IMask from "imask";

const isDebug = true;

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

if (isDebug) console.log('Переменные: ', VARIABLE_COMMENTS);
if (isDebug) console.log('Условные обозначения: ', LEGEND_COMMENTS);

window.MAIN_CALC_STATE = {
    calcType: 'outsideScreen', // outsideScreen, insideScreen, mediaFaced, rentScreen

    outsideScreen: {
        executionType: undefined, // monolithic, cabinet
        pixelStep: undefined,
    },
    insideScreen: {
        executionType: undefined, // monolithic, cabinet
        pixelStep: undefined,
    },
    mediaFaced: {
        executionType: undefined, // monolithic, cabinet
        pixelStep: undefined,
    },
    rentScreen: {
        rentConstruction: undefined, // outdoor, Подвесная
        pixelStep: undefined,
    },



}

function printMainState() {
    console.log('Выбранные значения: ', MAIN_CALC_STATE);
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

                if (isDebug) printMainState();
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

    // Set execution type
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

            if(isDebug) printMainState();
        }

    // Set pixel step
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

            if(isDebug) printMainState();
        }

});