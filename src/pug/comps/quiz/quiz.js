import $ from "jquery";

$(document).ready(function () {

    // Adding event listeners to the buttons for open Quiz
    let buttonsQuizToggle = $('.btn-quiz-toggle');
    addHandleClickToButtonsQuizToggle(buttonsQuizToggle);

    // Start quiz questions
    let btnQuizQuestionsStart = $('#btnQuizQuestionsStart')[0];
    addHandleClickToButtonQuestionsStart(btnQuizQuestionsStart);










    function addHandleClickToButtonsQuizToggle(buttons) {
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

    function toggleVisibleQuiz() {
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

    function fixScrollWidth(scrollWidth) {
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

    function isQuizVisible() {
        return $('#quiz').hasClass('visible');
    }

    function addHandleClickToButtonQuestionsStart(button) {
        $(button).on(
            'click',
            showQuizQuestions
        );
    }

    function showQuizQuestions() {
        // take this parameter in CSS from .quiz__content class
        const ANIMATION_TIME = 700;

        let quizProlog = $('.quiz__prolog')[0];
        let quizQuestions = $('.quiz__questions')[0];

        hideQuizBody();

        setTimeout(
            () => {
                hidePrologSlide(quizProlog);
                showQuestionsSlide(quizQuestions);
                showQuizBody();
            },
            ANIMATION_TIME + 100
        );
    }

    function hidePrologSlide(prolog) {
        $(prolog).css('display', 'none');
    }

    function showQuestionsSlide(questions) {
        $(questions).css('display', 'block');
    }

    function hideQuizBody() {
        let quizBody = $('.quiz__content');

        $(quizBody).addClass('hide');
    }

    function showQuizBody() {
        let quizBody = $('.quiz__content');

        $(quizBody).removeClass('hide');
    }




});