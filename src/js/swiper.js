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

    new Swiper('#contentBanner', {
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

    new Swiper('#contentBannerSlider', {
        speed: 700,
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
        slidesPerView: 'auto',
        speed: 500,
        navigation: {
            nextEl: '#btnOfferSliderNext',
            prevEl: '#btnOfferSliderPrev',
        },
    });

    new Swiper('#projectsSlider', {
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
        slidesPerView: 'auto',
        speed: 500,
        navigation: {
            nextEl: '#btnTypesSliderNext',
            prevEl: '#btnTypesSliderPrev',
        },
    });

    window.rcSlider = new Swiper('#readyCabinsSlider', {
        slidesPerView: 'auto',
        speed: 500,
        navigation: {
            nextEl: '#btnRcNext',
            prevEl: '#btnRcPrev',
        },
    });

    window.tsSlider = new Swiper('#typicalSolutionsSlider', {
        slidesPerView: 'auto',
        speed: 500,
        navigation: {
            nextEl: '#btnTSNext',
            prevEl: '#btnTsPrev',
        },
    });

    const breakpointXL = window.matchMedia ('(min-width: 1320px)');
    let listSlider, workSlider, ourWorksSlider;

    function breakpointXLChecker() {
        if ( breakpointXL.matches === true ) {
            if ( listSlider !== undefined ) {
                listSlider.destroy(true, true);
            }

            if ( workSlider !== undefined ) {
                workSlider.destroy(true, true);
            }

            if ( ourWorksSlider !== undefined ) {
                ourWorksSlider.destroy(true, true);
            }

        } else if ( breakpointXL.matches === false ) {
            enableListSlider();
            enableWorkSlider();
            enableOurWorksSlider();
        }
    }

    function enableListSlider() {
        if ($('#listSlider')[0]) {
            listSlider = new Swiper('#listSlider', {
                slidesPerView: 'auto',
                speed: 500,
            });
        }
    }

    function enableWorkSlider() {
        if ($('#workSlider')[0]) {
            workSlider = new Swiper('#workSlider', {
                slidesPerView: 'auto',
                speed: 500,
            });
        }
    }

    function enableOurWorksSlider() {
        if ($('#workSlider')[0]) {
            ourWorksSlider = new Swiper('#ourWorksSlider', {
                slidesPerView: 'auto',
                speed: 500,
            });

            setTimeout(function () {
                ourWorksSlider.update();
            }, 500);
        }
    }

    $(window).resize(function () {
        // Update slider fot mobile and tablet version if it has built
        // for corrected swiper slide width
        setTimeout(function () {
            ourWorksSlider.update();
        }, 1000);
    });

    // Here are listening breakpoint for large screen and initial check
    breakpointXL.addListener(breakpointXLChecker);
    breakpointXLChecker();

    // Tab lists sliders
    new Swiper('#TabListTickerSlider', {
        slidesPerView: 'auto',
        speed: 500,
        observeParents: true,
        observer: true,
        observeSlideChildren: true,
        navigation: {
            nextEl: '#btnTabListTickerNext',
            prevEl: '#btnTabListTickerPrev',
        },
    });
    new Swiper('#TabListMediaFacadeSlider', {
        slidesPerView: 'auto',
        speed: 500,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '#btnTabListMediaFacadeNext',
            prevEl: '#btnTabListMediaFacadePrev',
        },
    });
    new Swiper('#TabListOuterLedScreenSlider', {
        slidesPerView: 'auto',
        speed: 500,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '#btnTabListOuterLedScreenNext',
            prevEl: '#btnTabListOuterLedScreenPrev',
        },
    });
    new Swiper('#TabListInnerLedScreenSlider', {
        slidesPerView: 'auto',
        speed: 500,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '#btnTabListInnerLedScreenNext',
            prevEl: '#btnTabListInnerLedScreenPrev',
        },
    });
    new Swiper('#TabListRentSlider', {
        slidesPerView: 'auto',
        speed: 500,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '#btnTabListRentNext',
            prevEl: '#btnTabListRentPrev',
        },
    });
});
