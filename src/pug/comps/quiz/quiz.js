import $ from "jquery";
import IMask from "imask";

$(document).ready(function () {

    // take this parameter in CSS from .quiz__content class
    const ANIMATION_TIME_TOGGLE_QUIZ_SLIDE = 300;

    /**
     * QUIZ_STATE - it's save data of the selected parameters and its values
     *
     * @constants {boolean} true if contacts are valid
     * @contactsComment {string} may not be selected
     * @contactsName {string} may not be selected
     * @contactsPhone {string} required field with validation by iMask
     * @distance {string} string with number from 1 to 50
     * @location {string} like inside or outside
     * @rent {boolean} TRUE if rent is need or FALSE else
     * @size {boolean} is size of screen selected
     * @sizeHeight {number}  from 1 to 100
     * @sizeWidth {number} from 1 to 100
     */
    window.QUIZ_STATE = {
        contacts: undefined,
        contactsComment: undefined,
        contactsName: undefined,
        contactsPhone: undefined,
        distance: undefined,
        location: undefined,
        rent: undefined,
        size: undefined,
        sizeHeight: undefined,
        sizeWidth: undefined,
    }

    // Show or hide Quiz
    let buttonsQuizToggle = $('.btn-quiz-toggle');
    addHandleClickToButtonsQuizToggle(buttonsQuizToggle);

    // Start quiz questions
    let btnQuizQuestionsStart = $('#btnQuizQuestionsStart')[0];
    addHandleClickToButtonQuestionsStart(btnQuizQuestionsStart);

    // Check progress dots
    checkProgress(filteredProgressDots());

    // Check button preview question
    checkButtonPrev();

    // Check button nex question
    checkButtonNext();

    // Set number of the current question in its container
    setNumberOfQuizSlide();

    // Go to the next question
    let btnNextStep = $('#quizBtnNextStep')[0];
    addHandleClickBtnNextStep(btnNextStep);

    // Go to the preview question
    let btnPrevStep = $('#quizBtnPrevStep')[0];
    addHandleClickBtnPrevStep(btnPrevStep);

    // Select location property
    let locationControls = $('#quizSlide_1 .quiz__card');
    addHandleClickToLocationCard(locationControls);


    // Select distance property
    const quizDistanceEl = $('#quizDistance').children('input')[0];
    const quizDistanceRange = $('#quizDistance + .custom-range__controller input');

    // Masking for quiz Distance controller
    window.quizDistanceMask = IMask(quizDistanceEl, {
        mask: Number,  // enable number mask

        // other options are optional with defaults below
        scale: 0,  // digits after point, 0 for integers
        signed: false,  // disallow negative
        thousandsSeparator: ' ',  // any single char
        radix: ',',  // fractional delimiter
        mapToRadix: ['.'], // symbols to process as radix

        // additional number interval options (e.g.)
        min: 1,
        max: 50
    });

    quizDistanceMask.on(
        "accept",
        function () {

            QUIZ_STATE.distance = quizDistanceMask.unmaskedValue === ''
                ? undefined
                : quizDistanceMask.unmaskedValue;

            setDistanceText();
            setDistanceUnit();
            checkButtonNext();
            setDistanceComment();

            $(quizDistanceRange).val(
                QUIZ_STATE.distance === undefined
                    ? 1
                    : QUIZ_STATE.distance
                );

            setRange($(quizDistanceRange)[0], false);

            console.log(QUIZ_STATE)
        },
    );
    
    function setDistanceText() {
        let distanceText = $('#distanceText');
        let text;

        if (QUIZ_STATE.distance === undefined) {
            text = 'Выберите расстояние до экрана!';
            $(distanceText).addClass('text_warning');
        } else {
            text = QUIZ_STATE.distance
                + ' '
                + getMeterWordForm(QUIZ_STATE.distance);
            $(distanceText).removeClass('text_warning');
        }

        $(distanceText).text(text);
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

    function addHandleClickToButtonsQuizToggle (buttons) {
        for (let i = 0; i < buttons.length; i++) {
            $(buttons[i]).on(
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

    function addHandleClickToButtonQuestionsStart (button) {
        $(button).on(
            'click',
            showQuizQuestions
        );
    }

    function showQuizQuestions () {

        let quizProlog = $('.quiz__prolog')[0];
        let quizQuestions = $('.quiz__questions')[0];

        hideQuizBody();

        setTimeout(
            () => {
                hidePrologSlide(quizProlog);
                showQuestionsSlide(quizQuestions);
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

    function addHandleClickBtnNextStep (button) {
        $(button).on(
            'click',
            function () {
                let activeSlide = $('.quiz__slide.active');
                let nextSlide = $(activeSlide).next();
                let activeProp = $(activeSlide).data('quizProperty');
                let nextBtn = $('#quizBtnNextStep');
                let prevBtn = $('#quizBtnPrevStep');

                if (QUIZ_STATE[activeProp] !== undefined) {
                    hideQuizBody();

                    setTimeout(
                        () => {
                            hideQuizSlide(activeSlide);
                            showQuizSlide(nextSlide);
                            checkButtonPrev();
                            checkButtonNext();
                            showQuizBody();
                            blockUnblockTransition(nextBtn);
                            blockUnblockTransition(prevBtn);
                            checkProgress(filteredProgressDots());
                        },
                        ANIMATION_TIME_TOGGLE_QUIZ_SLIDE + 100
                    );
                }
            }
        )
    }

    function addHandleClickBtnPrevStep (button) {
        $(button).on(
            'click',
            function () {
                let activeSlide = $('.quiz__slide.active');
                let prevSlide = $(activeSlide).prev();

                if (!$(button).hasClass('inactive')) {
                    hideQuizBody();

                    setTimeout(
                        () => {
                            hideQuizSlide(activeSlide);
                            showQuizSlide(prevSlide);
                            blockUnblockTransition(button);
                            checkButtonPrev();
                            checkButtonNext();
                            showQuizBody();
                            checkProgress(filteredProgressDots());
                        },
                        ANIMATION_TIME_TOGGLE_QUIZ_SLIDE + 100
                    );
                }
            }
        )
    }

    function hideQuizSlide (slide) {
        $(slide).removeClass('active');
    }

    function showQuizSlide (slide) {
        $(slide).addClass('active');
    }

    function blockUnblockTransition(el) {
        let transitionValue = $(el).css('transition');
        $(el).css('transition', 'none');

        setTimeout(
            () => $(el).css('transition', transitionValue),
            ANIMATION_TIME_TOGGLE_QUIZ_SLIDE + 100
        );
    }

    function hidePrologSlide (prolog) {
        $(prolog).css('display', 'none');
    }

    function showQuestionsSlide (questions) {
        $(questions).css('display', 'block');
    }

    function hideQuizBody () {
        let quizBody = $('.quiz__content');
        $(quizBody).addClass('hide');
    }

    function showQuizBody () {
        let quizBody = $('.quiz__content');
        $(quizBody).removeClass('hide');
    }

    function handleClickOnDistantController () {
        $('#quizDistance').on(
            'click',
            function () {
                let input = $(this).children('input')[0];

                // Set cursor to the end of the input text
                input.setSelectionRange(3, 3);

                $(input).focus();
            });
    }
    handleClickOnDistantController();











    // Send quiz from to the server
    $('#quizForm').on(
        'submit',
        function (event) {
            event.preventDefault();
        }
    );

    // Update base elements when use resized window
    $(window).resize(function () {
        checkButtonNext();
        checkButtonPrev();
        checkProgress(filteredProgressDots());
    });
});