function moveSliderNums(index) {
    const height = $("#sliderNums").height();

    const scrolled = $("#sliderNums")
        .children(".slide-nums__current")
        .children(".slide-nums__scrolled");

    $(scrolled)
        .children(".slide-nums__number")
        .removeClass('active');

    $('#sliderNums .slide-nums__number:eq(' + index + ')')
        .addClass('active');

    $(scrolled).css("top", "-" + height * index + "px");
}

new Swiper('.slider-banner', {
    autoHeight: true,
    navigation: {
        nextEl: '#btnSliderNext',
        prevEl: '#btnSliderPrev',
    },
    speed: 500,
    parallax:true,
    on: {
        slideNextTransitionStart: function (evt) {
            moveSliderNums(evt.activeIndex);
        },
        slidePrevTransitionStart: function (evt) {
            moveSliderNums(evt.activeIndex);
        }
    },

});