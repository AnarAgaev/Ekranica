import $ from "jquery";
import IMask from "imask";

$(document).ready(function () {

    // take this parameter in CSS from .quiz__content class
    const ANIMATION_TIME_TOGGLE_QUIZ_SLIDE = 300;

    let quizProlog    = $('#quizProlog');
    let quizQuestions = $('#quizQuestions');
    let quizEpilogue  = $('#quizEpilogue');
    let btnNextStep   = $('#quizBtnNextStep');
    let btnPrevStep   = $('#quizBtnPrevStep');


    /**
     * QUIZ_STATE - it's save data of the selected parameters and its values
     *
     * @constants {boolean} true if contacts are valid
     * @contactsMessage {string} may not be selected
     * @contactsName {string} may not be selected
     * @contactsPhone {string} required field with validation by iMask
     * @distance {string} string with number from 1 to 50
     * @location {string} like inside or outside
     * @contract {string} rent or buy
     * @size {boolean} is size of screen selected
     * @sizeHeight {number}  from 1 to 100
     * @sizeWidth {number} from 1 to 100
     */
    window.QUIZ_STATE = {
        contacts: undefined,
        contactsMessage: undefined,
        contactsName: undefined,
        contactsPhone: undefined,
        distance: undefined,
        location: undefined,
        contract: undefined,
        size: undefined,
        sizeHeight: undefined,
        sizeWidth: undefined,
    }

    // Show or hide Quiz
    addHandleClickToButtonsQuizToggle();

    // Start quiz questions
    addHandleClickToButtonQuestionsStart();

    // Check progress dots
    checkProgress(filteredProgressDots());

    // Check button preview question
    checkButtonPrev();

    // Check button nex question
    checkButtonNext();

    // Set number of the current question in its container
    setNumberOfQuizSlide();

    // Select location property
    let locationControls = $('#quizSlide_1 .quiz__card');
    addHandleClickToLocationCard(locationControls);

    // Select rent property
    let rentControls = $('#quizSlide_4 .quiz__card');
    addHandleClickToRentCard(rentControls);

    // Select distance property
    const quizDistanceEl = $('#quizDistance')
        .children('input')[0];

    const quizDistanceRange = $('#quizDistance')
        .next('.custom-range__controller')
        .children('input');

    // Masking for quiz Distance controller
    window.quizDistanceMask = IMask(quizDistanceEl, {
        mask: Number,  // enable number mask

        // other options are optional with defaults below
        scale: 0,  // digits after point, 0 for integers
        signed: false,  // disallow negative

        // additional number interval options (e.g.)
        min: 1,
        max: 50
    });

    quizDistanceMask.on(
        "accept",
        function () {

            setQuizStateProp('distance', quizDistanceMask);
            resetErrorRangeValueToMinimum(quizDistanceRange, 'distance');
            setDistanceText();
            setDistanceUnit();
            checkButtonNext();
            setDistanceComment();
            setQuizCommentSmileyFace();
            setRange($(quizDistanceRange)[0], false);
        },
    );

    function setDistanceText() {
        let textContainer = $('#distanceText');
        let text;

        if (QUIZ_STATE.distance === undefined) {
            text = 'Выберите расстояние до экрана!';
            $(distanceText).addClass('text_warning');
        } else {
            text = QUIZ_STATE.distance
                + ' '
                + getMeterWordForm(QUIZ_STATE.distance);
            $(textContainer).removeClass('text_warning');
        }

        $(textContainer).text(text);
    }

    function setDistanceUnit() {
        let distanceUnits = $('#quizDistanceUnits');

        let text = QUIZ_STATE.distance === undefined
            ? 'метры'
            : getMeterWordForm(QUIZ_STATE.distance);

        $(distanceUnits).text(text);
    }

    function setDistanceComment() {
        let comments = $('.quiz__single-slider .comment-item span');
        let currentCommentId = $('[data-quiz-distance-comment].visible').data('quizDistanceComment');

        if (currentCommentId !== undefined
                && currentCommentId !== getDistanceCommentId()) {

            $(comments).removeClass('visible');

            setTimeout(
                () => {
                    let distanceCommentId = getDistanceCommentId();

                    $('[data-quiz-distance-comment="'
                        + distanceCommentId
                        + '"]').addClass('visible');
                },
                300
            );
        }
    }

    function getDistanceCommentId() {
        let distanceCommentId;
        let distance = Number.parseInt(QUIZ_STATE.distance);

        if (distance === 1) {
            distanceCommentId = 1
        } else if (1 < distance && distance <= 4) {
            distanceCommentId = 24
        } else if (4 < distance && distance <= 10) {
            distanceCommentId = 510
        } else if (10 < distance && distance <= 20) {
            distanceCommentId = 1020
        } else if (20 < distance && distance <= 50) {
            distanceCommentId = 2050
        } else {
            distanceCommentId = 0
        }

        return distanceCommentId;
    }

    function setQuizCommentSmileyFace () {
        let like = $('#commentSmiley svg:first-child')
        let unlike = $('#commentSmiley svg:last-child');

        if (getDistanceCommentId() === 0) {
            like.css('opacity', '0');
            unlike.css('opacity', '1');
        } else {
            like.css('opacity', '1');
            unlike.css('opacity', '0');
        }
    }

    // Select Size Width property
    const quizSizeWidthEl = $('#quizSizeWidth')
        .children('input')[0];

    const quizSizeWidthRange = $('#quizSizeWidth')
        .next('.custom-range__controller')
        .children('input');

    // Masking for quiz Size Width controller
    window.quizSizeWidthMask = IMask(quizSizeWidthEl, {
        mask: Number,  // enable number mask

        // other options are optional with defaults below
        scale: 0,  // digits after point, 0 for integers
        signed: false,  // disallow negative

        // additional number interval options (e.g.)
        min: 1,
        max: 100
    });

    quizSizeWidthMask.on(
        "accept",
        function () {

            setQuizStateProp('sizeWidth', quizSizeWidthMask)
            resetErrorRangeValueToMinimum(quizSizeWidthRange, 'sizeWidth');
            checkStateSize();
            setSizeText();
            setSizeWidthUnit();
            checkButtonNext();
            setRange($(quizSizeWidthRange)[0], false);
        },
    );

    function checkStateSize () {
        if (QUIZ_STATE.sizeWidth !== undefined
            && QUIZ_STATE.sizeHeight !== undefined) {
            QUIZ_STATE.size = true;
        } else {
            QUIZ_STATE.size = undefined;
        }
    }

    function setSizeWidthUnit () {
        let sizeWidthUnits = $('#quizSizeWidthUnits');

        let text = QUIZ_STATE.sizeWidth === undefined
            ? 'метры'
            : getMeterWordForm(QUIZ_STATE.sizeWidth);

        $(sizeWidthUnits).text(text);
    }

    // Select Size Height property
    const quizSizeHeightEl = $('#quizSizeHeight')
        .children('input')[0];

    const quizSizeHeightRange = $('#quizSizeHeight')
        .next('.custom-range__controller')
        .children('input');

    // Masking for quiz Size Height controller
    window.quizSizeHeightMask = IMask(quizSizeHeightEl, {
        mask: Number,  // enable number mask

        // other options are optional with defaults below
        scale: 0,  // digits after point, 0 for integers
        signed: false,  // disallow negative

        // additional number interval options (e.g.)
        min: 1,
        max: 100
    });

    quizSizeHeightMask.on(
        "accept",
        function () {

            setQuizStateProp('sizeHeight', quizSizeHeightMask);
            resetErrorRangeValueToMinimum(quizSizeHeightRange, 'sizeHeight');
            checkStateSize();
            setSizeText();
            setSizeHeightUnit();
            checkButtonNext();
            setRange($(quizSizeHeightRange)[0], false);
        },
    );

    function setSizeText () {
        let textContainer = $('#sizeText');
        let text;

        if (!QUIZ_STATE.size) {
            text = 'Выберите размеры экрана!';
            $(textContainer).addClass('text_warning');

            if (!QUIZ_STATE.sizeWidth && QUIZ_STATE.sizeHeight) {
                text = 'Выберите ширину экрана!';
            } else if (QUIZ_STATE.sizeWidth && !QUIZ_STATE.sizeHeight) {
                text = 'Выберите высоту экрана!';
            }

        } else {

            text = QUIZ_STATE.sizeWidth
                + ' на '
                + QUIZ_STATE.sizeHeight
                + ' '
                + getMeterWordForm(QUIZ_STATE.sizeHeight);

            $(textContainer).removeClass('text_warning');
        }

        $(textContainer).text(text);
    }

    function setSizeHeightUnit () {
        let sizeHeightUnits = $('#quizSizeHeightUnits');

        let text = QUIZ_STATE.sizeHeight === undefined
            ? 'метры'
            : getMeterWordForm(QUIZ_STATE.sizeHeight);

        $(sizeHeightUnits).text(text);
    }

    function setQuizStateProp (quizStateProp, iMask) {
        QUIZ_STATE[quizStateProp] = iMask.unmaskedValue === ''
            ? undefined
            : iMask.unmaskedValue;
    }
    
    function resetErrorRangeValueToMinimum (controller, propName) {
        $(controller).val(
            QUIZ_STATE[propName] === undefined
                ? 1
                : QUIZ_STATE[propName]
        );
    }

    // Validate Quiz contacts form
    let quizPhone = $('#quizPhone')[0];
    let quizPhoneController = $(quizPhone).closest('.controller');
    let quizPhoneValidator = $(quizPhoneController).children('.validator__cross');

    window.maskForQuizPhone = IMask(
        quizPhone,
        {
            mask: '+{7} 000 000 00 00',
        }
    );

    // Let's add handler function on quiz phone change
    maskForQuizPhone.on(
        "accept",
        quizPhoneChangeHandler
    );

    function quizPhoneChangeHandler () {
        if ( validPhone(maskForQuizPhone.unmaskedValue) ) {

            $(quizPhoneController).addClass('checked valid');
            $(quizPhoneController).removeClass('invalid');
            QUIZ_STATE.contacts = true;
            checkButtonNext();

        } else {
            if ( $(quizPhoneController).hasClass('checked') ) {
                $(quizPhoneController).addClass('invalid');
                $(quizPhoneController).removeClass('valid');

                QUIZ_STATE.contacts = undefined;
                checkButtonNext();
            }
        }

        if (maskForQuizPhone.unmaskedValue === '') {
            $(quizPhoneController).removeClass('checked');
        }
    }

    // Handle unfocused phone input
    $('#quizPhone').blur(function () {
        checkQuizPhone();
    });

    function checkQuizPhone () {
        let phoneValue = $('#quizPhone').val();

        if (phoneValue !== '') {
            if (!validPhone(phoneValue.replace(/\s+|\+/g, ''))) {

                animationFormError(
                    quizPhoneController,
                    quizPhoneValidator
                );
            }
        }
    }

    // Check the possibility go to the previous slide
    function checkButtonPrev () {
        let prevBtn = $('#quizBtnPrevStep')[0];
        let firstQuestionSlide = $('#quizSlide_1')[0];

        $(firstQuestionSlide).hasClass('active')
            ? $(prevBtn).addClass('inactive')
            : $(prevBtn).removeClass('inactive');
    }

    // Check the possibility go to the next slide
    function checkButtonNext () {
        let nextBtn = $('.quiz__btn-next .btn')[0];
        let activeSlide = $('.quiz__slide.active');
        let activeProp = $(activeSlide).data('quizProperty');

        QUIZ_STATE[activeProp] === undefined
            ? $(nextBtn).addClass('disabled')
            : $(nextBtn).removeClass('disabled');
    }

    function setNumberOfQuizSlide () {
        let numOfSlide = $('#numOfSlide');
        let activeSlideNumber = $('.quiz__slide.active').index() + 1;

        $(numOfSlide).text(activeSlideNumber);
    }

    function addHandleClickToButtonsQuizToggle () {
        let buttonsQuizToggle = $('.btn-quiz-toggle');

        for (let i = 0; i < buttonsQuizToggle.length; i++) {
            $(buttonsQuizToggle[i]).on(
                'click',
                event => {
                    event.preventDefault();
                    toggleVisibleQuiz();
                }
            );
        }
    }

    function toggleVisibleQuiz () {
        let quiz = $('#quiz');
        let body = $('body');
        let scrollWidth = getScrollWidth() + 'px';

        if (isQuizVisible()) {
            $(quiz).removeClass('visible');
            $(body).removeClass('modal-open');
            fixScrollWidth(scrollWidth);
        } else {
            $(quiz).addClass('visible');
            $(body).addClass('modal-open');
            fixScrollWidth(scrollWidth);
        }
    }

    function fixScrollWidth (scrollWidth) {
        if (isQuizVisible() && isLaptop) {
            $('body').css('paddingRight', scrollWidth);

            $('header.header').css({
                'paddingRight': 'calc(5vw + ' + scrollWidth + ')',
                'transition': 'none',
            });
        } else if (isLaptop) {
            $('body').css('paddingRight', '0');
            $('header.header').attr('style', '');
        }
    }

    function isQuizVisible () {
        return $('#quiz').hasClass('visible');
    }

    function addHandleClickToButtonQuestionsStart () {
        $('#btnQuizQuestionsStart').on(
            'click',
            showQuizQuestions
        );
    }

    function showQuizQuestions () {
        hideQuizBody();

        setTimeout(
            () => {
                hideQuizSlide(quizProlog);
                showQuizSlide(quizQuestions);
                showQuizBody();
            },
            ANIMATION_TIME_TOGGLE_QUIZ_SLIDE + 100
        );
    }

    function addHandleClickToLocationCard (controls) {
        for (let i = 0; i < controls.length; i++) {
            $(controls[i]).on(
                'click',
                function () {
                    setQuizLocation(this);
                    checkButtonNext();
                }
            );
        }
    }

    function setQuizLocation (controller) {
        let property = $(controller).data('quizProperty');
        let value = $(controller).data('quizValue');

        QUIZ_STATE[property] = value;
    }

    function addHandleClickToRentCard (controls) {
        for (let i = 0; i < controls.length; i++) {
            $(controls[i]).on(
                'click',
                function () {
                    setQuizRent(this);
                    checkButtonNext();
                }
            );
        }
    }

    function setQuizRent (controller) {
        let property = $(controller).data('quizProperty');
        let value = $(controller).data('quizValue');

        QUIZ_STATE[property] = value;
    }

    function checkProgress (dots) {
        const DOT_PARTS = 5; // Have got this property from design layout

        let dotsInUnit = dots.length / DOT_PARTS;
        let currentSlideNumber = $('.quiz__slide.active').index();
        let fromActiveDotPosition = dotsInUnit * currentSlideNumber;
        let toSelectedDotPosition = fromActiveDotPosition;
        let toActiveDotPosition = fromActiveDotPosition + dotsInUnit;

        cleanProgressDots();
        paintSelectedDots(dots, toSelectedDotPosition);
        paintActiveDots(dots, fromActiveDotPosition, toActiveDotPosition);
    }

    function filteredProgressDots () {
        let progressDots = $('.quiz__progress-point');

        function checkSingleDot () {
            return $(this).css('display') === 'block';
        }

        return $(progressDots).filter(checkSingleDot);
    }

    function cleanProgressDots() {
        $('.quiz__progress-point .dot')
            .removeClass('selected active');
    }

    function paintSelectedDots (dots, finish) {
        for (let i = 0; i < finish; i++) {
            $(dots[i])
                .children('.dot')
                .addClass('selected');
        }
    }

    function paintActiveDots (dots, start, finish) {
        for (let i = start; i < finish; i++) {
            $(dots[i])
                .children('.dot')
                .addClass('active');
        }
    }

    (function addHandleClickBtnNextStep () {
        $(btnNextStep).on(
            'click',
            function () {
                let activeSlide = $('.quiz__slide.active').data('quizProperty');

                if (QUIZ_STATE[activeSlide] !== undefined) {
                    hideQuizBody();

                    // If user is on last quiz question (form user's data)
                    // send quiz data to the server else go to next question.
                    setTimeout(
                        () =>
                            activeSlide === 'contacts'
                                ? handleQuizContacts()
                                : goToNextQuizQuestion(),
                        ANIMATION_TIME_TOGGLE_QUIZ_SLIDE + 100
                    );
                }
            }
        )
    })();

    function goToNextQuizQuestion () {
        let activeSlide = $('.quiz__slide.active');
        let nextSlide = $(activeSlide).next();

        inactivateQuizSlide(activeSlide);
        activateQuizSlide(nextSlide);
        checkButtonPrev();
        checkButtonNext();
        showQuizBody();
        blockUnblockTransition(btnNextStep);
        blockUnblockTransition(btnPrevStep);
        checkProgress(filteredProgressDots());
        setNumberOfQuizSlide();
        renameNextButtonOnLastSlide();
    }

    (function addHandleClickBtnPrevStep () {
        $(btnPrevStep).on(
            'click',
            function () {
                if (!$(btnPrevStep).hasClass('inactive')) {
                    hideQuizBody();

                    setTimeout(
                        goToPrevQuizQuestion,
                        ANIMATION_TIME_TOGGLE_QUIZ_SLIDE + 100
                    );
                }
            }
        )
    })();

    function goToPrevQuizQuestion () {
        let activeSlide = $('.quiz__slide.active');
        let prevSlide = $(activeSlide).prev();

        inactivateQuizSlide(activeSlide);
        activateQuizSlide(prevSlide);
        blockUnblockTransition(btnPrevStep);
        checkButtonPrev();
        checkButtonNext();
        showQuizBody();
        checkProgress(filteredProgressDots());
        setNumberOfQuizSlide();
        renameNextButtonOnLastSlide();
    }

    function renameNextButtonOnLastSlide () {
        let currentSlideNumber = $('.quiz__slide.active').index();

        if (currentSlideNumber === 4) {
            $(btnNextStep).text('Отправить запрос');
        } else {
            $(btnNextStep).text('Следующий вопрос');
        }
    }

    function inactivateQuizSlide (slide) {
        $(slide).removeClass('active');
    }

    function activateQuizSlide (slide) {
        $(slide).addClass('active');
    }

    function blockUnblockTransition (el) {
        let transitionValue = $(el).css('transition');
        $(el).css('transition', 'none');

        setTimeout(
            () => $(el).css('transition', transitionValue),
            ANIMATION_TIME_TOGGLE_QUIZ_SLIDE + 100
        );
    }

    function hideQuizSlide (slide) {
        $(slide).css('display', 'none');
    }

    function showQuizSlide (slide) {
        $(slide).css('display', 'block');
    }

    function hideQuizBody () {
        let quizBody = $('.quiz__content');
        $(quizBody).addClass('hide');
    }

    function showQuizBody () {
        let quizBody = $('.quiz__content');
        $(quizBody).removeClass('hide');
    }

    function handleQuizContacts () {
        setContactsToQuizState();
        sendQuizDataToTheServe();
        showQuizEpilogue();
    }

    function setContactsToQuizState () {
        let quizName = $('#quizName').val();
        let quizPhone = $('#quizPhone').val();
        let quizMessage = $('#quizMessage').val();

        QUIZ_STATE.contactsPhone = quizPhone;

        if (quizName !== '') {
            QUIZ_STATE.contactsName = quizName;
        }

        if (quizMessage !== '') {
            QUIZ_STATE.contactsMessage = quizMessage;
        }
    }

    function showQuizEpilogue () {
        setTimeout(
            () => {
                hideQuizSlide(quizQuestions);
                showQuizSlide(quizEpilogue);
                showQuizBody();
            },
            ANIMATION_TIME_TOGGLE_QUIZ_SLIDE + 100
        );
    }

    (function handleClickOnDistantController () {
        $('#quizDistance').on(
            'click',
            function () {
                let input = $(this).children('input')[0];

                // Set cursor to the end of the input text
                input.setSelectionRange(3, 3);

                $(input).focus();
            });
    })();

    (function handleClickOnSizeWidthController () {
        $('#quizSizeWidth').on(
            'click',
            function () {
                let input = $(this).children('input')[0];

                // Set cursor to the end of the input text
                input.setSelectionRange(3, 3);

                $(input).focus();
            });
    })();

    (function handleClickOnSizeHeightController () {
        $('#quizSizeHeight').on(
            'click',
            function () {
                let input = $(this).children('input')[0];

                // Set cursor to the end of the input text
                input.setSelectionRange(3, 3);

                $(input).focus();
            });
    })();

    // Stopped Send quiz to the server
    $('#quizForm').on(
        'submit',
        e => {
            e.preventDefault();
        }
    );

    (function handleClickOnButtonsResetQuiz () {
        $('.btn-reset-quiz').on(
            'click',
            resetQuizData
        );
    })();

    function resetQuizData () {
        // Reset data only if user is on last slide (epilogue)
        if ($('#quizEpilogue').css('display') === 'block') {
            let firstQuestion = $('#quizSlide_1');
            let lastQuestion = $('#quizSlide_5');

            setTimeout(
                () => {
                    resetQuizState();
                    hideQuizSlide(quizEpilogue);
                    showQuizSlide(quizProlog);
                    inactivateQuizSlide(lastQuestion);
                    activateQuizSlide(firstQuestion);
                    checkButtonPrev();
                    checkButtonNext();
                    checkProgress(filteredProgressDots());
                    resetDataControllers();
                    resetQuizDistance();
                    resetQuizFormData();
                    resetQuizSize();
                    setNumberOfQuizSlide();
                },
                ANIMATION_TIME_TOGGLE_QUIZ_SLIDE + 100
            )
        }
    }

    function resetQuizDistance () {
        quizDistanceMask.unmaskedValue = '';
        setDistanceText();
        setDistanceUnit();
        setDistanceComment();
    }

    function resetQuizSize () {
        quizSizeWidthMask.unmaskedValue = '';
        quizSizeHeightMask.unmaskedValue = '';
        setSizeText();
        setSizeWidthUnit();
        setSizeHeightUnit();
    }

    function resetQuizFormData () {
        $('#quizName').val('');
        $('#quizMessage').val('');
        maskForQuizPhone.unmaskedValue = '';
    }

    function resetDataControllers () {
        let inputControllers = document.querySelectorAll('#quiz input[type="radio"]');

        for (let i = 0; i < inputControllers.length; i++) {
            inputControllers[i].checked = false;
        }
    }

    function resetQuizState () {
        for (let key in QUIZ_STATE) {
            QUIZ_STATE[key] = undefined;
        }
    }

    function sendQuizDataToTheServe () {

        // Sending data to server
        console.log('Sending data to server...')
        console.log(QUIZ_STATE);
    }

    // Update base elements when use resized window
    $(window).resize(function () {
        checkButtonNext();
        checkButtonPrev();
        checkProgress(filteredProgressDots());
    });
});