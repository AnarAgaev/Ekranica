import $ from "jquery";

$(document).ready(function () {
    const slideTabs = $('.slider-tabs__button');

    function setTabsMarker(button) {
        const marker = $(button).closest('.slider-tabs__wrap').children('.marker');
        const width = $(button).innerWidth();
        const left = $(button).parent().position().left;

        $(marker).css({
            'width': width,
            'left': left + 'px',
            'opacity': '1',
        });
    }

    function initTabsMarker() {
        const btns = $('.slider-tabs__button.active');

        if (btns.length > 0) {
            for (let i = 0; i < btns.length; i++) {
                setTabsMarker(btns[i]);
            }
        }
    }
    setTimeout(initTabsMarker, 300);

    $(window).resize(function () {
        setTimeout(initTabsMarker, 300);
    });


    if (slideTabs.length > 0) {
        for (let i = 0; i < slideTabs.length; i++) {
            $(slideTabs[i]).on('click', function () {
                $('.slider-tabs__button').removeClass('active');
                $(this).addClass('active');
                setTabsMarker(this);

                // Show target tab
                const tabTargetId = $(this).data('targetTabId');

                $('.tabs-items .tabs-item').removeClass('visible');
                $(tabTargetId).addClass('visible');

            });
        }
    }
});

