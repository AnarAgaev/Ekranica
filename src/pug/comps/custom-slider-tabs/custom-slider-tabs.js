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

                if (!$(this).hasClass('active')) {
                    const adjacentBtns = $(this)
                        .closest('.slider-tabs__wrap')
                        .find('.slider-tabs__button');

                    $(adjacentBtns).removeClass('active');
                    $(this).addClass('active');
                    setTabsMarker(this);

                    // Show target tab
                    const tabTargetId = $(this).data('targetTabId');
                    const visibleTab = $(this).closest('.tab-list').find('.tabs-item.visible');

                    $(visibleTab).addClass('hide');

                    setTimeout(function () {
                        $(visibleTab).removeClass('visible show hide');
                        $(tabTargetId).addClass('visible');
                    }, 200);

                    setTimeout(function () {
                        $(tabTargetId).addClass('show');
                    }, 300);
                }
            });
        }
    }
});

