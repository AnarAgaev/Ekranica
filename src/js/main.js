$(document).ready(function () {
    window.actionStopper = true;


    function getScreenType () {
        window.isDesctop = $(document).width() > 1700;
    }
    getScreenType();

    // HEADER
    // Listening hover for desktop viewport size
    $('header .dropdown').each(function (i, el) {
        function handlerIn () {
            if (isDesctop) {
                $('#navLine').addClass('visible');
                $('#header').addClass('is-background');
            }
        }

        function handlerOut () {
            if (isDesctop) {
                $('#navLine').removeClass('visible');
                $('#header').removeClass('is-background');
            }
        }

        $(el).hover(handlerIn, handlerOut);
    });

    $('#navToggler').on('click', function () {
        $('#header').toggleClass('nav-visible');
        $('.nav__item.dropdown').removeClass('drop-visible');
    });

    $('.nav__item.dropdown').on('click', function (e) {
        const el = e.target

        if (!isDesctop) {
            $(el).toggleClass('drop-visible');
        }
    });

    $('.nav__item.dropdown a').on('click', function (e) {
        if (!isDesctop) {
            e.preventDefault();

            const el = e.target;
            const parent = $(el).parent();
            parent.click();
        }
    });






    // FOOTER
    // Replace phone at the footer to the socials section for desktop viewport
    function replaceFooterPhone () {
        if (isDesctop) {
            $('#footerPhone').prependTo("#footerSocials");
        } else {
            $('#footerPhone').prependTo("#footer");
        }
    }
    replaceFooterPhone();







    // Main banner on index page at the header
    $('#indexBanner').slick(
        {
            prevArrow: '<button type="button" class="slick-prev btn btn_icon-outlined" id="btnBannerPrev"></button>',
            nextArrow: '<button type="button" class="slick-next btn btn_icon-outlined" id="btnBannerNext"></button>',
        }
    );

    function replaceBannerNums (direction) {
        const active = $('.banner__nums-number.active')[0];
        const passive = $('.banner__nums-number.passive')[0];
        const prevActive = $(active).prev()[0];
        const nextPassive = $(passive).next()[0];

        if (direction) {
            $(active).removeClass('active');
            $(passive).removeClass('passive').addClass('active');
            $(nextPassive).addClass('passive');

            $('.banner__nums-wrap').animate(
                {left: "-90px"},
                200,
                function () {
                    $('.banner__nums-wrap').children()[0].remove();
                    $('.banner__nums-wrap').css("left", "-45px");

                    const clone = $(passive).clone()[0];
                    $(clone).removeClass('active');
                    $('.banner__nums-wrap').append(clone);
                }
            );
        } else {
            $(active).removeClass('active').addClass('passive');
            $(prevActive).addClass('active');
            $(passive).removeClass('passive');

            $('.banner__nums-wrap').animate(
                {left: "0"},
                200,
                function () {
                    const clone = $(nextPassive).clone()[0];
                    $('.banner__nums-wrap').prepend(clone);
                    $('.banner__nums-wrap').css("left", "-45px");
                    $('.banner__nums-number:last-child').last().remove();
                }
            );
        }
    }

    $('#btnBannerPrev').on('click', function () {
        if (actionStopper) {
            actionStopper = false;
            replaceBannerNums(false);

            setTimeout(function () {
                actionStopper = true;
            }, 500);
        }
    });

    $('#btnBannerNext').on('click', function () {
        if (actionStopper) {
            actionStopper = false;
            replaceBannerNums(true);

            setTimeout(function () {
                actionStopper = true;
            }, 500);
        }
    });

    $('#indexBanner').on('swipe', function(event, slick, direction){
        if (direction === 'left') {
            replaceBannerNums(true);
        } else {
            replaceBannerNums(false);
        }
    });


    // Offer Slider
    $('#offerList').slick(
        {
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev btn btn_icon-outlined" id="btnOfferPrev"></button>',
            nextArrow: '<button type="button" class="slick-next btn btn_icon-outlined" id="btnOfferNext"></button>',
            responsive: [
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        }
    );

    // Partners Choose Slider
    $(window).on('load resize orientationchange', function() {
        $('#partnersChoose').each(function () {
            let $carousel = $(this);
            /* Initializes a slick carousel only on mobile screens */
            // slick on mobile
            if ( $(window).width() > 1339 ) {
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');
                }
            } else {
                if ( !$carousel.hasClass('slick-initialized') ) {
                    $carousel.slick({
                        infinite: false,
                        arrows: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                        mobileFirst: true,
                        responsive: [
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });
                }
            }
        });
    });

    // Projects Slider
    $('#projectsList').slick(
        {
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev btn btn_icon-outlined" id="btnProjectsPrev"></button>',
            nextArrow: '<button type="button" class="slick-next btn btn_icon-outlined" id="btnProjectsNext"></button>',
        }
    );


    // Projects Slider
    $('#clientsList').slick(
        {
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev btn btn_icon-outlined" id="btnClientsPrev"></button>',
            nextArrow: '<button type="button" class="slick-next btn btn_icon-outlined" id="btnClientsNext"></button>',
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                }
            ]

        }
    );


    // Feedback Slider
    $('#feedbackList').slick(
        {
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev btn btn_icon-outlined" id="btnFeedbackPrev"></button>',
            nextArrow: '<button type="button" class="slick-next btn btn_icon-outlined" id="btnFeedbackNext"></button>',
        }
    );


    // Work on order Slider
    $(window).on('load resize orientationchange', function() {
        $('#workChoose').each( function () {
            let $carousel = $(this);
            /* Initializes a slick carousel only on mobile screens */
            // slick on mobile
            if ( $(window).width() > 1339 ) {
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');
                }
            } else {
                if ( !$carousel.hasClass('slick-initialized') ) {
                    $carousel.slick({
                        infinite: false,
                        arrows: false,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        mobileFirst: true,
                        responsive: [
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });
                }
            }
        });
    });





    // FAQ toggle
    $('.faq__caption').on('click', function (e) {
        const isVisible =  $(e.target).parent().hasClass('visible');

        //$('.faq__item').removeClass('visible');

        if (isVisible) {
            $(e.target)
                .parent().removeClass('visible');
        } else {
            $(e.target)
                .parent().addClass('visible');
        }
    });

    $('.faq__toggler').on('click', function (e) {
        e.stopPropagation();

        const isVisible = $(e.target).closest('.faq__item').hasClass('visible');

        //$('.faq__item').removeClass('visible');

        if (isVisible) {
            $(e.target)
                .closest('.faq__item')
                .removeClass('visible');
        } else {
            $(e.target)
                .closest('.faq__item')
                .addClass('visible');
        }
    });









    $(window).resize(function () {
        getScreenType();
        replaceFooterPhone();
    });



});