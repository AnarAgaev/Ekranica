import $ from "jquery";
import IMask from "imask";

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
        let isButtonInactive = isCalcTabInactive(this);

        if (isButtonInactive ) {
            deactivateCalcTabs();
            activateCalcTabs(activeTabIndex);
            deactivateCalcPicture();
            activateCalcPicture(newActiveTabId);
            toggleActiveCalc(newActiveTabId);
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
});