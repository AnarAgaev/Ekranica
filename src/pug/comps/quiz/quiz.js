import $ from "jquery";

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
     * @distance {number} from 1 to 50
     * @location {string} like inside or outside
     * @rent {boolean} TRUE if rent is need or FALSE else
     * @size {boolean} is size of screen selected
     * @sizeHeight {number}  from 1 to 100
     * @sizeWidth {number} from 1 to 100
     */

    const QUIZ_STATE = {
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

    // Select quiz properties
    let locationControls = $('#quizSlide_1 .quiz__card');
    addHandleClickToLocationCard(locationControls);








    // Go to the next question
    let btnNextStep = $('#quizBtnNextStep')[0];
    addHandleClickBtnNextStep(btnNextStep);










    // Check go to the previous slide button
    function checkButtonPrev () {
        let prevBtn = $('.quiz__btn-prev .btn')[0];
        let firstQuestionSlide = $('#quizSlide_1')[0];

        $(firstQuestionSlide).hasClass('active')
            ? $(prevBtn).addClass('inactive')
            : $(prevBtn).removeClass('inactive');
    }
    checkButtonPrev();

    // Check go to the next slide button
    function checkButtonNext () {
        let nextBtn = $('.quiz__btn-next .btn')[0];
        let activeSlide = $('.quiz__slide.active');
        let activeProp = $(activeSlide).data('quizProperty');

        QUIZ_STATE[activeProp] === undefined
            ? $(nextBtn).addClass('disabled')
            : $(nextBtn).removeClass('disabled');
    }
    checkButtonNext();

    function setNumberOfQuizSlide () {
        let numOfSlide = $('#numOfSlide');
        let quizActiveSlide = $('.quiz__slide.active')[0];
        let activeSlideNumber = $(quizActiveSlide)
            .parent()
            .index() + 1;

        $(numOfSlide).text(activeSlideNumber);
    }
    setNumberOfQuizSlide();

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











    // Send quiz from to the server
    $('#quizForm').on(
        'submit',
        function (event) {
            event.preventDefault();
        }
    );

});