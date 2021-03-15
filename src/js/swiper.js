import $ from "jquery";

import Swiper from 'swiper/bundle';

// core version + navigation, pagination modules:
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// configure Swiper to use modules
SwiperCore.use([Navigation, Pagination]);

$(document).ready(function () {
    function changeActiveNumber(index, numsId) {
        const width = $(numsId + " .slide-nums__current").width();

        const scrollable = $(numsId)
            .find(".slide-nums__scrolled");

        $(numsId + " .slide-nums__number")
            .removeClass('active');

        $(numsId + " .slide-nums__number:eq(" + index + ")")
            .addClass('active');

        $(scrollable).css("transform", "translateX(-" +  width * index + "px)");
    }

    function showAnimation(index) {
        if (index !== 0) {
            $("#sliderAnimation").removeClass("visible");
        } else {
            $("#sliderAnimation").addClass("visible");
        }
    }

    const bannerPicSlider = new Swiper('#bannerPictureSlider', {
        speed: 1500,
        parallax: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
    });

    const bannerContSlider = new Swiper('#bannerContentSlider', {
        speed: 1500,
        parallax: true,
        navigation: {
            nextEl: '#btnSliderNext',
            prevEl: '#btnSliderPrev',
        },
        on: {
            activeIndexChange: function (swiper) {
                changeActiveNumber(swiper.activeIndex, "#sliderNums");
                showAnimation(swiper.activeIndex);
            }
        },
    });

    bannerPicSlider.controller.control = bannerContSlider;
    bannerContSlider.controller.control = bannerPicSlider;

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
});
