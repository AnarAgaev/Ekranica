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
                resetStickyPics();
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
    });

    function resetStickyPics() {
        let pics = $('.calc__body-image');

        $(pics).removeClass('sticky');
        $(pics).attr('style', '');
    }





//     // Calculating result of entered data
//     $(() => $('.btn_show-result')
//         .toArray()
//         .forEach(addHandleClickOnButtonGetCalcResult));
//
//         function addHandleClickOnButtonGetCalcResult(el) {
//             $(el).on(
//                 'click',
//                 getCalcResults
//             );
//         }
//
//         function getCalcResults() {
//             // HERE SHOULD BE THE RESULTS OF CALCULATIONS !!!!!!!!!!!!!!!!!!!!
//             let tempSumForWork = 1320000; // deleted after calc real results
//
//             showCalcResults(tempSumForWork, this)
//         }
//
//         function showCalcResults(sum, btnGetResult) {
//             let body = $(btnGetResult).closest('.calc__body');
//             let specification = $(body).next('.calc__specification');
//             let order = $(specification).next('.calc__order');
//
//             let sumContainers = []
//                 .concat($(body).find('.sum-container').toArray())
//                 .concat($(specification).find('.sum-container').toArray())
//                 .concat($(order).find('.sum-container').toArray());
//
//             addSumToContainers(sum, sumContainers);
//
//             if (isLargeScreen()) {
//                 showSumInCalcBody(body);
//             } else {
//                 showCalcSection(specification);
//             }
//         }
//
//         function isLargeScreen() {
//             return getScreenType() === 'lg'
//                 || getScreenType() === 'xl'
//                 || getScreenType() === 'xxl';
//         }
//
//         function addSumToContainers(sum, containers) {
//             containers.forEach(
//                 el => {
//                     $(el).html(sum.toLocaleString('ru-RU') + '&nbsp;₽');
//                 }
//             );
//         }
//
//         function showSumInCalcBody(body) {
//             // Take 144 from css style. It's a height of header plus 30px.
//             let scrollTo = $(body).offset().top - 144;
//
//             $('body,html').animate({ scrollTop: scrollTo }, 500);
//
//             $(body)
//                 .find('.calc__body-result-sum')
//                 .removeClass('hidden');
//
//             setTimeout(() => {
//                 $(body)
//                     .find('.show-specification')
//                     .removeClass('hidden');
//             }, 500);
//         }
//
//
//     // Show specification
//     $(() => $('.show-specification')
//         .toArray()
//         .forEach(addHandleClickToBtnShowSpecification));
//
//         function addHandleClickToBtnShowSpecification(el) {
//             $(el).on(
//                 'click',
//                 handleClickOnButtonShowSpecification
//             );
//         }
//
//         function handleClickOnButtonShowSpecification() {
//             let specificationSection = $(this)
//                 .closest('.calc__body')
//                 .next('.calc__specification');
//
//             showCalcSection(specificationSection);
//         }
//
//
//     // Show order form
//     $(() => $('.show-order-form')
//         .toArray()
//         .forEach(addHandlerClickToBtnShowOrderForm));
//
//         function addHandlerClickToBtnShowOrderForm(el) {
//             $(el).on(
//                 'click',
//                 handleClickToBtnShowOrderForm
//             );
//         }
//
//         function handleClickToBtnShowOrderForm() {
//             let formOrderSection = $(this)
//                 .closest('.calc__specification')
//                 .next('.calc__order');
//
//             showCalcSection(formOrderSection);
//         }
//
//         function showCalcSection(section) {
//             let offsetTop = $(section).prev().offset().top;
//             let sectionHeight = $(section).prev().innerHeight();
//             let offsetIdx = getScreenType() === 'sm' ? 50 : 0; // fix for mobile screens
//             let scrollTo = offsetTop + sectionHeight + offsetIdx;
//
//             $('body,html').animate({ scrollTop: scrollTo }, 500);
//             $(section).removeClass('invisible');
//
//             setTimeout(
//                 () => $(section).removeClass('hidden'),
//                 100
//             )
//         }
//
//
//     // Reset calc section and inner form
//     $(() => $('.reset-calc-section')
//         .toArray()
//         .forEach(addHandlerClickToBtnRecalc));
//
//         function addHandlerClickToBtnRecalc(el) {
//             $(el).on(
//                 'click',
//                 resetCalcSection
//             );
//         }
//
//         function resetCalcSection() {
//             scrollToPageStart();
//             resetBodyControllers();
//             hideCalcSections();
//         }
//
//         function resetBodyControllers() {
//             let calc = $('.calc__calculator.active');
//             let body = $(calc).find('.calc__body');
//             let bodySum = $(body).find('.calc__body-result-sum');
//             let btnShowSpecification = $(body).find('.show-specification');
//
//             $(bodySum).addClass('hidden');
//             $(btnShowSpecification).addClass('hidden');
//         }
//
//         function hideCalcSections() {
//             let calc = $('.calc__calculator.active');
//             let specification = $(calc).find('.calc__specification');
//             let order = $(calc).find('.calc__order');
//
//             $(specification).addClass('hidden');
//             $(order).addClass('hidden');
//             setTimeout(
//                 () => {
//                     $(specification).addClass('invisible');
//                     $(order).addClass('invisible');
//                 },
//                 300
//             );
//         }
//
//
//     // Submit calc order form
//     $(() => $('.form-order__submit')
//         .toArray()
//         .forEach(addHandlerClickOnBtnOrderForm));
//
//         function addHandlerClickOnBtnOrderForm(el) {
//             $(el).on(
//                 'click',
//                 handleClickOnBtnOrderForm
//             );
//         }
//
//         function handleClickOnBtnOrderForm() {
//             let form = $(this)
//                 .closest('.calc__order-result')
//                 .prev('.calc__order-form')
//                 .children('.form-order');
//
//
//             // Валидация и обработка данных форма
//             // Отправка данных на сервер
//
//
//             scrollToPageStart();
//             resetBodyControllers();
//             hideCalcSections();
//             modalOpen(form);
//             setFocusOnCalcModalClose();
//         }
//
//         function setFocusOnCalcModalClose() {
//             $('#calcModal .modal__close').focus();
//         }
});