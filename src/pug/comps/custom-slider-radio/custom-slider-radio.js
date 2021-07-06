import $ from "jquery";

$(document).ready(function () {

    // Handle click on buttons at the radio group
    const radioBtns = $('.radio-group label');

    function setRadioMarker(label) {
        const marker = $(label).parent().children('.marker');
        const width = $(label).innerWidth();
        const left = $(label).position().left;

        $(marker).css({
            'width': width,
            'left': left + 'px',
            'opacity': '1',
        });
    }

    window.initRadioMarker = function () {
        console.log('asdf')


        const btns = $("input[type='radio']:checked + label");

        if (btns.length > 0) {
            for (let i = 0; i < btns.length; i++) {
                setRadioMarker(btns[i]);
            }
        }
    }
    setTimeout(initRadioMarker, 300);

    $(window).resize(function () {
        initRadioMarker();
    });

    if (radioBtns.length > 0) {
        for (let i = 0; i < radioBtns.length; i++) {
            $(radioBtns[i]).on('click', function () {
                setRadioMarker(this);
            });
        }
    }
});

