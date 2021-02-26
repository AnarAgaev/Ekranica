// Слайдеры, построенные на слике


// Main Slider on index page at the header
$('#indexsSlider').slick(
    {
        prevArrow: '<button type="button" class="slick-prev btn btn_icon-outlined" id="btnSliderPrev"></button>',
        nextArrow: '<button type="button" class="slick-next btn btn_icon-outlined" id="btnSliderNext"></button>',
    }
);

function replaceSliderNums (direction) {
    const active = $('.slider__nums-number.active')[0];
    const passive = $('.slider__nums-number.passive')[0];
    const prevActive = $(active).prev()[0];
    const nextPassive = $(passive).next()[0];

    if (direction) {
        $(active).removeClass('active');
        $(passive).removeClass('passive').addClass('active');
        $(nextPassive).addClass('passive');

        $('.slider__nums-wrap').animate(
            {left: "-90px"},
            400,
            function () {
                $('.slider__nums-wrap').children()[0].remove();
                $('.slider__nums-wrap').css("left", "-45px");

                const clone = $(passive).clone()[0];
                $(clone).removeClass('active');
                $('.slider__nums-wrap').append(clone);
            }
        );
    } else {
        $(active).removeClass('active').addClass('passive');
        $(prevActive).addClass('active');
        $(passive).removeClass('passive');

        $('.slider__nums-wrap').animate(
            {left: "0"},
            400,
            function () {
                const clone = $(nextPassive).clone()[0];
                $('.slider__nums-wrap').prepend(clone);
                $('.slider__nums-wrap').css("left", "-45px");
                $('.slider__nums-number:last-child').last().remove();
            }
        );
    }
}

$('#btnSliderPrev').on('click', function () {
    if (actionStopper) {
        actionStopper = false;
        replaceSliderNums(false);

        setTimeout(function () {
            actionStopper = true;
        }, 500);
    }
});

$('#btnSliderNext').on('click', function () {
    if (actionStopper) {
        actionStopper = false;
        replaceSliderNums(true);

        setTimeout(function () {
            actionStopper = true;
        }, 500);
    }
});

$('#indexSlider').on('swipe', function(event, slick, direction){
    if (direction === 'left') {
        replaceSliderNums(true);
    } else {
        replaceSliderNums(false);
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

// Partners Choose Slider and list on Rent page
$(window).on('load resize orientationchange', function() {
    $('#partnersChoose, #rent').each(function () {
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

// Types of equipment on Rent page
$('#types').slick(
    {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev btn btn_icon-outlined" id="btnTypesRentPrev"></button>',
        nextArrow: '<button type="button" class="slick-next btn btn_icon-outlined" id="btnTypesRentNext"></button>',
    }
);



// Work on order Slider
$(window).on('load resize orientationchange', function() {
    $('#workOrder, #workRent').each( function () {
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

