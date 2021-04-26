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


    // Handler change window width on LAPTOPS for rebuild some sliders
    const breakpointLG = window.matchMedia ('(min-width: 1320px)'); // breakpoint for more then 1366px
    let listSlider,
        workSlider,
        ourWorksSlider,
        ourNewsSlider;

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

            if ( ourNewsSlider !== undefined  && $('#ourNewsSlider').length > 0 ) {
                ourNewsSlider.destroy(true, true);
            }

        } else if ( breakpointLG.matches === false ) {
            enableListSlider();
            enableWorkSlider();
            enableOurWorksSlider();
            enableOurNewsSlider();
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

    function enableOurNewsSlider() {
        if ($('#ourNewsSlider')[0]) {
            ourNewsSlider = new Swiper('#ourNewsSlider', {
                slidesPerView: 'auto',
                speed: 500,
            });
        }
    }

    // Update slider fot mobile and tablet version
    // if it has built for corrected swiperjs slide width
    function updateTabLinksSliders () {
        setTimeout(function () {
            if ( !isLaptop ) {
                if ($('#ourWorksSlider')[0]) ourWorksSlider.update();
                if ($('#ourNewsSlider')[0]) ourNewsSlider.update();
            }
        }, 1500);
    }

    updateTabLinksSliders();

    $(window).resize(updateTabLinksSliders);

    // Here are listening breakpoint for large screen and initial check
    breakpointLG.addListener(breakpointLGChecker);
    breakpointLGChecker();


    // Handler change window width on DESKTOPS for rebuild some sliders
    const breakpointXL = window.matchMedia ('(min-width: 1860px)'); // breakpoint for more then 1920px
    let tabListTickerSlider,
        tabListMediaFacadeSlider,
        tabListOuterLedScreenSlider,
        tabListInnerLedScreenSlider,
        tabListRentSlider,
        tabListNewsCompanySlider,
        tabListNewsPartnersSlider;

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

            if ( tabListNewsCompanySlider !== undefined
                    && $('#tabListNewsCompanySlider')[0] ) {
                tabListNewsCompanySlider.destroy(true, true);
            }

            if ( tabListNewsPartnersSlider !== undefined
                    && $('#tabListNewsPartnersSlider')[0] ) {
                tabListNewsPartnersSlider.destroy(true, true);
            }

        } else if ( breakpointXL.matches === false ) {
            enableTabListTickerSlider();
            enableTabListMediaFacadeSlider();
            enableTabListOuterLedScreenSlider();
            enableTabListInnerLedScreenSlider();
            enableTabListRentSlider();
            enableTabListNewsCompanySlider();
            enableTabListNewsPartnersSlider();
        }
    }

    let isUnlockAddSlides = true;

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
                on: {
                    reachEnd: swiper => {
                        const slideWrap = $(swiper.el).children('.tab-list__list__wrap');

                        if (isUnlockAddSlides) {
                            isUnlockAddSlides = false;

                            setTimeout(() => isUnlockAddSlides = true, 1500);
                            addTabListItems(slideWrap, swiper);
                        }
                    },
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
                on: {
                    reachEnd: swiper => {
                        const slideWrap = $(swiper.el).children('.tab-list__list__wrap');

                        if (isUnlockAddSlides) {
                            isUnlockAddSlides = false;

                            setTimeout(() => isUnlockAddSlides = true, 1500);
                            addTabListItems(slideWrap, swiper);
                        }
                    },
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
                on: {
                    reachEnd: swiper => {
                        const slideWrap = $(swiper.el).children('.tab-list__list__wrap');

                        if (isUnlockAddSlides) {
                            isUnlockAddSlides = false;

                            setTimeout(() => isUnlockAddSlides = true, 1500);
                            addTabListItems(slideWrap, swiper);
                        }
                    },
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
                on: {
                    reachEnd: swiper => {
                        const slideWrap = $(swiper.el).children('.tab-list__list__wrap');

                        if (isUnlockAddSlides) {
                            isUnlockAddSlides = false;

                            setTimeout(() => isUnlockAddSlides = true, 1500);
                            addTabListItems(slideWrap, swiper);
                        }
                    },
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
                on: {
                    reachEnd: swiper => {
                        const slideWrap = $(swiper.el).children('.tab-list__list__wrap');

                        if (isUnlockAddSlides) {
                            isUnlockAddSlides = false;

                            setTimeout(() => isUnlockAddSlides = true, 1500);
                            addTabListItems(slideWrap, swiper);
                        }
                    },
                },
            });
        }
    }

    function enableTabListNewsCompanySlider() {
        if ($('#tabListNewsCompanySlider')[0]) {
            tabListNewsCompanySlider = new Swiper('#tabListNewsCompanySlider', {
                slidesPerView: 'auto',
                speed: 500,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: '#btnTabListNewsCompanyNext',
                    prevEl: '#btnTabListNewsCompanyPrev',
                },
                on: {
                    reachEnd: swiper => {
                        const slideWrap = $(swiper.el).children('.tab-list__list__wrap');

                        if (isUnlockAddSlides) {
                            isUnlockAddSlides = false;

                            setTimeout(() => isUnlockAddSlides = true, 1500);
                            addTabListItems(slideWrap, swiper);
                        }
                    },
                },
            });
        }
    }

    function enableTabListNewsPartnersSlider() {
        if ($('#tabListNewsPartnersSlider')[0]) {
            tabListNewsPartnersSlider = new Swiper('#tabListNewsPartnersSlider', {
                slidesPerView: 'auto',
                speed: 500,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: '#btnTabListNewsPartnersNext',
                    prevEl: '#btnTabListNewsPartnersPrev',
                },
                on: {
                    reachEnd: swiper => {
                        const slideWrap = $(swiper.el).children('.tab-list__list__wrap');

                        if (isUnlockAddSlides) {
                            isUnlockAddSlides = false;

                            setTimeout(() => isUnlockAddSlides = true, 1500);
                            addTabListItems(slideWrap, swiper);
                        }
                    },
                },
            });
        }
    }

    // Here are listening breakpoint for extra large screen and initial check
    breakpointXL.addListener(breakpointXLChecker);
    breakpointXLChecker();

    // Updating tab sliders after resizing window
    function updateSlidersTabList () {
        if (!isDesktop) {
            if ($('#tabListTickerSlider')[0]) {
                setTimeout(function () {
                    tabListTickerSlider.update();
                }, 1500);
            }

            if ($('#tabListMediaFacadeSlider')[0]) {
                setTimeout(function () {
                    tabListMediaFacadeSlider.update();
                }, 1500);
            }

            if ($('#tabListOuterLedScreenSlider')[0]) {
                setTimeout(function () {
                    tabListOuterLedScreenSlider.update();
                }, 1500);
            }

            if ($('#tabListInnerLedScreenSlider')[0]) {
                setTimeout(function () {
                    tabListInnerLedScreenSlider.update();
                }, 1500);
            }

            if ($('#tabListRentSlider')[0]) {
                setTimeout(function () {
                    tabListRentSlider.update();
                }, 1500);
            }

            if ($('#tabListNewsCompanySlider')[0]) {
                setTimeout(function () {
                    tabListNewsCompanySlider.update();
                }, 1500);
            }

            if ($('#tabListNewsPartnersSlider')[0]) {
                setTimeout(function () {
                    tabListNewsPartnersSlider.update();
                }, 1500);
            }
        }
    }

    setTimeout(updateSlidersTabList, 1500);

    $(window).resize(function () {
        updateSlidersTabList();
    });
});
