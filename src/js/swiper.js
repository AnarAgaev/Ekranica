import $ from "jquery";

import Swiper from 'swiper/bundle';

// core version + navigation, pagination modules:
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// configure Swiper to use modules
SwiperCore.use([Navigation, Pagination]);

function changeActiveNumber(index, numsId) {
    const height = $(numsId).height();

    const scrollable = $(numsId)
        .find(".slide-nums__scrolled");

    $(numsId + " .slide-nums__number")
        .removeClass('active');

    $(numsId + " .slide-nums__number:eq(" + index + ")")
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
            changeActiveNumber(swiper.activeIndex, "#sliderNums");
            showAnimation(swiper.activeIndex);
        }
    },
});


new Swiper('#rentBanner', {
    speed: 500,
    parallax: true,
    navigation: {
        nextEl: '#btnBannerProjectsNext',
        prevEl: '#btnBannerProjectsPrev',
    },
    on: {
        activeIndexChange: function (swiper) {
            changeActiveNumber(swiper.activeIndex, "#bannerSliderNums");
        }
    },
});


new Swiper('#offerSlider', {
    //autoHeight: true,
    slidesPerView: 'auto',
    speed: 500,
    navigation: {
        nextEl: '#btnOfferSliderNext',
        prevEl: '#btnOfferSliderPrev',
    },
});

new Swiper('#projectsList', {
    slidesPerView: 'auto',
    speed: 500,
    navigation: {
        nextEl: '#btnProjectsNext',
        prevEl: '#btnProjectsPrev',
    },
    on: {
        reachEnd: function () {
            // Let's get all elements after active
            const lastItems = $('#projectsList .swiper-slide-active')
                .nextAll('.projects__slide');

            // Add class visible all elements after active and active too.
            for (let i = 0; i <= lastItems.length; i++) {
                $(lastItems[i]).addClass('visible');
            }
        },
        fromEdge:  function () {
            $('.projects__slide').removeClass('visible');
        },
    },
});

new Swiper('#clientsList', {
    slidesPerView: 'auto',
    speed: 500,
    navigation: {
        nextEl: '#btnClientsSliderNext',
        prevEl: '#btnClientsSliderPrev',
    },
});

new Swiper('#feedbackList', {
    slidesPerView: 'auto',
    speed: 500,
    navigation: {
        nextEl: '#btnFeedbackNext',
        prevEl: '#btnFeedbackPrev',
    },
    on: {
        reachEnd: function () {
            const lastItems = $('#feedbackList .swiper-slide-active')
                .nextAll('.feedback__slide');

            for (let i = 0; i <= lastItems.length; i++) {
                $(lastItems[i]).addClass('visible');
            }
        },
        fromEdge:  function () {
            $('.feedback__slide').removeClass('visible');
        },
    }
});

new Swiper('#typesSlider', {
    //autoHeight: true,
    slidesPerView: 'auto',
    speed: 500,
    navigation: {
        nextEl: '#btntypesSliderNext',
        prevEl: '#btntypesSliderPrev',
    },
    on: {
        reachEnd: function () {
            // Let's get all elements after active
            const lastItems = $('#typesSlider .swiper-slide-active')
                .nextAll('.types__slide');

            // Add class visible all elements after active and active too.
            for (let i = 0; i <= lastItems.length; i++) {
                $(lastItems[i]).addClass('visible');
            }
        },
        fromEdge:  function () {
            $('.types__slide').removeClass('visible');
        },
    }
});


const breakpointXL = window.matchMedia ('(min-width: 1860px)');
let partnersChooseSlider,
    rentListSlider,
    workOrderSlider,
    workRentSlider;

function breakpointXLChecker() {
    if ( breakpointXL.matches === true ) {
        if ( partnersChooseSlider !== undefined ) {
            partnersChooseSlider.destroy(true, true);
        }

        if ( workOrderSlider !== undefined ) {
            workOrderSlider.destroy(true, true);
        }

        if ( rentListSlider !== undefined ) {
            rentListSlider.destroy(true, true);
        }

        if ( workRentSlider !== undefined ) {
            workRentSlider.destroy(true, true);
        }

    } else if ( breakpointXL.matches === false ) {
        enablePartnersChooseSlider();
        enableWorkOrderSlider();
        enableRentListSlider();
        enableWorkRentSlider();
    }
}

function enablePartnersChooseSlider() {
    if ($('#partnersChooseSlider')[0]) {
        partnersChooseSlider = new Swiper('#partnersChooseSlider', {
            autoHeight: true,
            slidesPerView: 'auto',
            speed: 500,
            breakpoints: {
                768: {
                    autoHeight: false,
                },
            },
        });
    }
}

function enableRentListSlider() {
    if ($('#rentList')[0]) {
        rentListSlider = new Swiper('#rentList', {
            autoHeight: true,
            slidesPerView: 'auto',
            speed: 500,
            breakpoints: {
                768: {
                    autoHeight: false,
                },
            },
        });
    }
}

function enableWorkOrderSlider() {
    if ($('#workOrder')[0]) {
        workOrderSlider = new Swiper('#workOrder', {
            autoHeight: true,
            slidesPerView: 'auto',
            speed: 500,
            breakpoints: {
                768: {
                    autoHeight: false,
                },
            }
        });
    }
}

function enableWorkRentSlider() {
    if ($('#workRent')[0]) {
        workRentSlider = new Swiper('#workRent', {
            autoHeight: true,
            slidesPerView: 'auto',
            speed: 500,
            breakpoints: {
                768: {
                    autoHeight: false,
                },
            }
        });
    }
}

// Here are listening breakpoint for large screen and initial check
breakpointXL.addListener(breakpointXLChecker);
breakpointXLChecker();
