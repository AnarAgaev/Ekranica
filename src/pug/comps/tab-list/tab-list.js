import $ from "jquery";

$(document).ready(function () {
    const tabListBtns = $('.tab-list__get-data');

    if (tabListBtns.length) {
        for (let i = 0; i < tabListBtns.length; i++) {
            $(tabListBtns[i]).on('click', function (e) {
                const targetListId = $(this).data('listId');
                const targetList = $(targetListId)
                    .children('.tabs-item.visible')
                    .find('.tab-list__list__wrap');

                let addedItems;

                // Getting date from server ...

                SPINNER.addClass('visible');

                setTimeout(function () {
                    SPINNER.removeClass('visible');

                    targetList.append(articlesData.articles);

                    setTimeout(function () {
                        addedItems = $('.article-list__slide.added');
                        $(addedItems).removeClass('added');
                    }, 100);

                    setTimeout(function () {
                        $(addedItems).attr('style', '');
                    }, 1500);
                }, 1500);
            });
        }
    }
});