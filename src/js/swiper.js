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
        activeIndexChange: function (evt) {
            changeActiveNumber(evt.activeIndex);
            showAnimation(evt.activeIndex);
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