import $ from "jquery";

import Swiper from 'swiper';

// core version + navigation, pagination modules:
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// configure Swiper to use modules
SwiperCore.use([Navigation, Pagination]);

function changeActiveNumber(index) {
    const height = $("#sliderNums").height();

    const scrollable = $("#sliderNums")
        .find(".slide-nums__scrolled");

    $("#sliderNums .slide-nums__number")
        .removeClass('active');

    $("#sliderNums .slide-nums__number:eq(" + index + ")")
        .addClass('active');

    $(scrollable).css("top", "-" + height * index + "px");
}

function showAnimation(index) {
    if (index !== 0) {
        $("#sliderAnimation").removeClass("visible");
    } else {
        $("#sliderAnimation").addClass("visible");
    }
}

new Swiper('.slider-banner', {
    //autoHeight: true,
    navigation: {
        nextEl: '#btnSliderNext',
        prevEl: '#btnSliderPrev',
    },
    speed: 500,
    parallax:true,
    on: {
        activeIndexChange: function (swiper) {
            changeActiveNumber(swiper.activeIndex);
            showAnimation(swiper.activeIndex);
        }
    },
});

new Swiper('.offer__list', {
    //autoHeight: true,
    slidesPerView: 'auto',
    speed: 500,
    navigation: {
        nextEl: '#btnOfferSliderNext',
        prevEl: '#btnOfferSliderPrev',
    },
    breakpoints: {
        1024: {
            spaceBetween: 16,
        },
        1140: {
            spaceBetween: 34,
        },
        1920: {
            spaceBetween: 0,
        },
    },
});

new Swiper('#projectsList', {
    slidesPerView: 'auto',
    speed: 500,
    navigation: {
        nextEl: '#btnProjectsNext',
        prevEl: '#btnProjectsPrev',
    },
    breakpoints: {
        1024: {
            spaceBetween: 16,
        },
        1140: {
            spaceBetween: 34,
        },
        1920: {
            spaceBetween: 0,
        },
    },
    on: {
        reachEnd: function () {
            // Let's get all elements after active
            const lastItems = $('#projectsList .swiper-slide-active')
                .nextAll('.projects__item');

            // Add class visible all elements after active and active too.
            for (let i = 0; i <= lastItems.length; i++) {
                $(lastItems[i]).addClass('visible');
            }
        },
        fromEdge:  function () {
            $('.projects__item').removeClass('visible');
        },
    }
});

new Swiper('#clientsList', {
    slidesPerView: 'auto',
    speed: 500,
    spaceBetween: 16,
    navigation: {
        nextEl: '#btnClientsSliderNext',
        prevEl: '#btnClientsSliderPrev',
    },
    breakpoints: {
        768: {
            spaceBetween: 24,
        },
        1024: {
            spaceBetween: 48,
        },
        1140: {
            spaceBetween: 68,
        },
        1920: {
            spaceBetween: 96,
        },
    },
});

new Swiper('#feedbackList', {
    slidesPerView: 'auto',
    speed: 500,
    spaceBetween: 16,
    navigation: {
        nextEl: '#btnFeedbackNext',
        prevEl: '#btnFeedbackPrev',
    },
    breakpoints: {
        768: {
            spaceBetween: 48,
        },
        1140: {
            spaceBetween: 68,
        },
        1920: {
            spaceBetween: 134,
        },
    },
    on: {
        reachEnd: function () {
            const lastItems = $('#feedbackList .swiper-slide-active')
                .nextAll('.feedback__item');

            for (let i = 0; i <= lastItems.length; i++) {
                $(lastItems[i]).addClass('visible');
            }
        },
        fromEdge:  function () {
            $('.feedback__item').removeClass('visible');
        },
    }
});




const breakpointXL = window.matchMedia ('(min-width: 1920px)');
let partnersChooseSlider, workOrderSlider;

function breakpointXLChecker() {
    if ( breakpointXL.matches === true ) {
        if ( partnersChooseSlider !== undefined ) {
            partnersChooseSlider.destroy(true, true);
        }

        if ( workOrderSlider !== undefined ) {
            workOrderSlider.destroy(true, true);
        }
    } else if ( breakpointXL.matches === false ) {
        enablePartnersChooseSlider();
        enableWorkOrderSlider();
    }
}

function enablePartnersChooseSlider() {
    partnersChooseSlider = new Swiper('#partnersChooseSlider', {
        autoHeight: true,
        slidesPerView: 'auto',
        speed: 500,
        spaceBetween: 24,
        breakpoints: {
            768: {
                autoHeight: false,
            },
            1024: {
                autoHeight: false,
                spaceBetween: 48,
            },
            1140: {
                autoHeight: false,
                spaceBetween: 68,
            },
        },
    });
}

function enableWorkOrderSlider() {
    workOrderSlider = new Swiper('#workOrder', {
        autoHeight: true,
        slidesPerView: 'auto',
        speed: 500,
        spaceBetween: 24,
        breakpoints: {
            768: {
                autoHeight: false,
            },
            1024: {
                autoHeight: false,
                spaceBetween: 48,
            },
            1140: {
                autoHeight: false,
                spaceBetween: 68,
            },
        }
    });
}

// Here are listening breakpoint for large screen and initial check
breakpointXL.addListener(breakpointXLChecker);
breakpointXLChecker();