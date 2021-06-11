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

        function addHandleClickToCalcTabs (el) {
            $(el).on(
                'click',
                handleClickOnCalcTab
            );
        }

        function handleClickOnCalcTab () {
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

        function deactivateCalcTabs () {
            let buttons = $('.calc__tab-list__button');
            $(buttons).removeClass('active');
        }

        function activateCalcTabs (idx) {
            let wrappers = $('.calc__tab-list-wrap').toArray();

            wrappers.forEach(
                el => $(el)
                    .find('.calc__tab-list__slide:eq(' + idx + ')')
                    .children()
                    .addClass('active')
            );
        }

        function deactivateCalcPicture () {
            $('.calc__title-picture .image').removeClass('active');
        }

        function activateCalcPicture (id) {
            $('[data-calc-type-pic="' + id + '"]').addClass('active');
        }

        function toggleActiveCalc (id) {
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

    // Calculating result of entered data
    $(() => $('.btn_show-result')
        .toArray()
        .forEach(addHandleClickOnButtonGetCalcResult));

        function addHandleClickOnButtonGetCalcResult (el) {
            $(el).on(
                'click',
                getCalcResults
            );
        }

        function getCalcResults () {
            // HERE SHOULD BE THE RESULTS OF CALCULATIONS !!!!!!!!!!!!!!!!!!!!
            let tempSumForWork = 1320000; // deleted after calc real results

            showCalcResults(tempSumForWork, this)
        }

        function showCalcResults (sum, btnGetResult) {
            let body = $(btnGetResult).closest('.calc__body');
            let specification = $(body).next('.calc__specification');
            let order = $(specification).next('.calc__order');

            let sumContainers = []
                .concat($(body).find('.sum-container').toArray())
                .concat($(specification).find('.sum-container').toArray())
                .concat($(order).find('.sum-container').toArray());

            addSumToContainers(sum, sumContainers);

            if (getScreenType() === 'lg' || getScreenType() === 'xl') {
                showSumInCalcBody(body);
            } else {
                showSpecification(specification);
            }
        }

        function addSumToContainers (sum, containers) {
            containers.forEach(
                el => {
                    $(el).html(sum.toLocaleString('ru-RU') + '&nbsp;₽');
                }
            );
        }

        function showSumInCalcBody (body) {
            // Take 144 from css style. It's a height of header plus 30px.
            let scrollTo = $(body).offset().top - 144;

            $('body,html').animate({ scrollTop: scrollTo }, 500);

            $(body)
                .find('.calc__body-result-sum')
                .removeClass('hidden');

            setTimeout(() => {
                $(body)
                    .find('.show-specification')
                    .removeClass('hidden');
            }, 500);
        }

        function showSpecification (specification) {
            let offsetIdx = getScreenType() === 'sm' ? 30 : -20;
            let scrollTo = $(specification).offset().top + offsetIdx;
            $('body,html').animate({ scrollTop: scrollTo }, 500);

            $(specification).removeClass('invisible');

            setTimeout(
                () => $(specification).removeClass('hidden'),
                100
            )
        }

    // Show specification
    $(() => $('.show-specification')
        .toArray()
        .forEach(addHandleClickToBtnShowSpecification));

        function addHandleClickToBtnShowSpecification (el) {
            $(el).on(
                'click',
                handleClickOnButtonShowSpecification
            );
        }

        function handleClickOnButtonShowSpecification () {
            let specification = $(this)
                .closest('.calc__body')
                .next('.calc__specification');

            showSpecification(specification);
        }

    // Show order form

});