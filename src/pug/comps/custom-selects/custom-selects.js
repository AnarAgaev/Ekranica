import $ from "jquery";

/*
 * Any selects must have next structure
 *
 * .select-CUSTOM-CLASS.custom-select
 *
 *      -- Here maybe any custom inner structure of custom select
 *      -- but it must have element with selected class for selected text
 *      -- START custom select structure
 *
 *     .select-CUSTOM-CLASS__selected-item.selected ITEM NAME
 *     .select-CUSTOM-CLASS__arr
 *
 *     -- END custom select structure
 *
 *     .select-CUSTOM-CLASS__container.custom-select__container
 *         .select-CUSTOM-CLASS__list.custom-select__list.scroller
 *             .select-CUSTOM-CLASS__item.custom-select__item.active ITEM NAME
 *             .select-CUSTOM-CLASS__item.custom-select__item ITEM NAME
 *             .select-CUSTOM-CLASS__item.custom-select__item ITEM NAME
 *             ...
 */

$(document).ready(function () {

    // Handle click on select
    const selects = $('.custom-select');

    if (selects.length > 0) {
        for (let i = 0; i < selects.length; i++) {
            $(selects[i]).on('click', function (e) {
                const isOpen = $(this).hasClass('open');

                if ($(e.target).closest('.custom-select__container').length === 0) {
                    $('.custom-select').removeClass('open');

                    isOpen
                        ? $(this).removeClass('open')
                        : $(this).addClass('open');
                }
            });
        }
    }


    // Close all selects after click on other any it (click on document)
    $(document).on('click', e => {
        if ($(e.target).closest('.custom-select').length === 0) {
            $('.custom-select').removeClass('open');
        }
    });


    /*
     * Handle click on select item
     *
     * Any selects must have element span with class .selected
     * for put it selected item after lick on item.
     *
     * Items into custom select must have class .custom-select__item
     *
     */

    const selectItems = $('.custom-select__item');

    if (selectItems.length > 0) {
        for (let i = 0; i < selectItems.length; i++) {
            $(selectItems[i]).on('click', function () {
                const selected = $(this).closest('.custom-select').children('.selected');
                const items = $(this).closest('.custom-select__list').children('.custom-select__item');

                $(selected).text($(this).text());
                $(items).removeClass('active');
                $(this).addClass('active');
                $('.custom-select').removeClass('open');
            });
        }
    }

    // Initial custom select width from longest inner element
    if (selects.length > 0) {
        setTimeout(function () {
            for (let i = 0; i < selects.length; i++) {
                const items = $(selects[i]).find('.custom-select__item');
                let width = 0;

                if (items.length > 0) {
                    for (let j = 0; j < items.length; j++) {

                        width = $(items[j]).width() > width
                            ? $(items[j]).width()
                            : width;
                    }
                }

                $(selects[i])
                    .children('.selected')
                    .css('minWidth', width + 'px');
            }
        }, 300);
    }
});