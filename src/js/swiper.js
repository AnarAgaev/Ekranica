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

    new Swiper('#singleWorkSlider', {
        slidesPerView: 'auto',
        speed: 500,
        navigation: {
            nextEl: '#btnSingleWorkNext',
            prevEl: '#btnSingleWorkPrev',
        },
    });

    window.rcSlider = new Swiper('#readyCabinsSlider', {
        slidesPerView: 'auto',
        speed: 500,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
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


    // Handler change window width on laptops for rebuild some sliders
    const breakpointLG = window.matchMedia ('(min-width: 1320px)'); // breakpoint for more then 1366px
    let listSlider,
        workSlider,
        ourWorksSlider;

    function breakpointLGChecker() {
        if ( breakpointLG.matches === true ) {
            if ( listSlider !== undefined ) {
                listSlider.destroy(true, true);
            }

            if ( workSlider !== undefined ) {
                workSlider.destroy(true, true);
            }

            if ( ourWorksSlider !== undefined  && $('#ourWorksSlider').length > 0 ) {
                ourWorksSlider.destroy(true, true);
            }

        } else if ( breakpointLG.matches === false ) {
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
        if ($('#ourWorksSlider')[0]) {
            ourWorksSlider = new Swiper('#ourWorksSlider', {
                slidesPerView: 'auto',
                speed: 500,
            });
        }
    }

    $(window).resize(function () {
        // Update slider fot mobile and tablet version
        // if it has built for corrected swiperjs slide width

        if ( $('#ourWorksSlider')[0] && !isDesctop) {
            setTimeout(function () {
                ourWorksSlider.update();
            }, 1000);
        }
    });

    // Here are listening breakpoint for large screen and initial check
    breakpointLG.addListener(breakpointLGChecker);
    breakpointLGChecker();


    // Handler change window width on desctops for rebuild some sliders
    const breakpointXL = window.matchMedia ('(min-width: 1860px)'); // breakpoint for more then 1920px
    let tabListTickerSlider,
        tabListMediaFacadeSlider,
        tabListOuterLedScreenSlider,
        tabListInnerLedScreenSlider,
        tabListRentSlider;

    function breakpointXLChecker() {
        if ( breakpointXL.matches === true ) {
            if ( tabListTickerSlider !== undefined
                    && $('#tabListTickerSlider')[0] ) {
                tabListTickerSlider.destroy(true, true);
            }

            if ( tabListMediaFacadeSlider !== undefined
                    && $('#tabListMediaFacadeSlider')[0] ) {
                tabListMediaFacadeSlider.destroy(true, true);
            }

            if ( tabListOuterLedScreenSlider !== undefined
                    && $('#tabListOuterLedScreenSlider')[0] ) {
                tabListOuterLedScreenSlider.destroy(true, true);
            }

            if ( tabListInnerLedScreenSlider !== undefined
                    && $('#tabListInnerLedScreenSlider')[0] ) {
                tabListInnerLedScreenSlider.destroy(true, true);
            }

            if ( tabListRentSlider !== undefined
                    && $('#tabListRentSlider')[0] ) {
                tabListRentSlider.destroy(true, true);
            }

        } else if ( breakpointXL.matches === false ) {
            enableTabListTickerSlider();
            enableTabListMediaFacadeSlider();
            enableTabListOuterLedScreenSlider();
            enableTabListInnerLedScreenSlider();
            enableTabListRentSlider();
        }
    }

    // Tab lists sliders functions
    function enableTabListTickerSlider() {
        if ($('#tabListTickerSlider')[0]) {
            tabListTickerSlider = new Swiper('#tabListTickerSlider', {
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
        }
    }

    function enableTabListMediaFacadeSlider() {
        if ($('#tabListMediaFacadeSlider')[0]) {
            tabListMediaFacadeSlider = new Swiper('#tabListMediaFacadeSlider', {
                slidesPerView: 'auto',
                speed: 500,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: '#btnTabListMediaFacadeNext',
                    prevEl: '#btnTabListMediaFacadePrev',
                },
            });
        }
    }

    function enableTabListOuterLedScreenSlider() {
        if ($('#tabListOuterLedScreenSlider')[0]) {
            tabListOuterLedScreenSlider = new Swiper('#tabListOuterLedScreenSlider', {
                slidesPerView: 'auto',
                speed: 500,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: '#btnTabListOuterLedScreenNext',
                    prevEl: '#btnTabListOuterLedScreenPrev',
                },
            });
        }
    }

    function enableTabListInnerLedScreenSlider() {
        if ($('#tabListInnerLedScreenSlider')[0]) {
            tabListInnerLedScreenSlider = new Swiper('#tabListInnerLedScreenSlider', {
                slidesPerView: 'auto',
                speed: 500,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: '#btnTabListInnerLedScreenNext',
                    prevEl: '#btnTabListInnerLedScreenPrev',
                },
            });
        }
    }

    function enableTabListRentSlider() {
        if ($('#tabListRentSlider')[0]) {
            tabListRentSlider = new Swiper('#tabListRentSlider', {
                slidesPerView: 'auto',
                speed: 500,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: '#btnTabListRentNext',
                    prevEl: '#btnTabListRentPrev',
                },
            });
        }
    }

    // Here are listening breakpoint for extra large screen and initial check
    breakpointXL.addListener(breakpointXLChecker);
    breakpointXLChecker();

    // Updating tab sliders after resizing window
    $(window).resize(function () {
        if ($('#tabListTickerSlider')[0]) {
            setTimeout(function () {
                tabListTickerSlider.update();
            }, 1000);
        }

        if ($('#tabListMediaFacadeSlider')[0]) {
            setTimeout(function () {
                tabListMediaFacadeSlider.update();
            }, 1000);
        }

        if ($('#tabListOuterLedScreenSlider')[0]) {
            setTimeout(function () {
                tabListOuterLedScreenSlider.update();
            }, 1000);
        }

        if ($('#tabListInnerLedScreenSlider')[0]) {
            setTimeout(function () {
                tabListInnerLedScreenSlider.update();
            }, 1000);
        }

        if ($('#tabListRentSlider')[0]) {
            setTimeout(function () {
                tabListRentSlider.update();
            }, 1000);
        }
    });
});
