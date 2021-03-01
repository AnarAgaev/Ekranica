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
    parallax:true,
});

new Swiper('.projects__list', {
    //autoHeight: true,
    slidesPerView: 'auto',
    speed: 500,
    navigation: {
        nextEl: '#btnProjectsNext',
        prevEl: '#btnProjectsPrev',
    },
    on: {
        reachEnd: function (swiper) {
            if ($(document).width() > 1024) {
                $('.projects__item:eq(-2)').addClass('active');
            }

            $('.projects__item:last-child').addClass('active');
        },
        fromEdge:  function (swiper) {
            if ($(document).width() > 1024) {
                $('.projects__item:eq(-2)').removeClass('active');
            }

            $('.projects__item:last-child').removeClass('active');
        },
    }
});



const breakpointXL = window.matchMedia ('(min-width: 1920px)');
let partnersChooseSlider;

function breakpointXLChecker() {
    if ( breakpointXL.matches === true ) {
        if ( partnersChooseSlider !== undefined ) {
            partnersChooseSlider.destroy(true, true);
        }
        return;
    } else if ( breakpointXL.matches === false ) {
        return enablePartnersChooseSlider();
    }
}

function enablePartnersChooseSlider() {
    partnersChooseSlider = new Swiper('#partnersChooseSlider', {
        autoHeight: true,
        slidesPerView: 'auto',
        speed: 500,
        parallax:true,
        spaceBetween: 24,
        breakpoints: {
            768: {
                //slidesPerView: 3,
                autoHeight: false,
            },
            1140: {
                autoHeight: false,
                spaceBetween: 68,
            },

        }
    });
}

breakpointXL.addListener(breakpointXLChecker);
breakpointXLChecker();