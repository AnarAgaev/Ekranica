import $ from "jquery";

$(document).ready(function () {
    const tabListBtns = $('.tab-list__get-data');

    window.addTabListItems = function (targetList, slider, btnMore) {
        let slideWidth,
            slidesShown,
            offset,
            addedItems;

        if (slider) {
            slideWidth = $(targetList).children('.swiper-slide').width();
            slidesShown = slider.activeIndex + 1;
            offset = slideWidth * slidesShown;
        }





        // GETTING DATE FROM SERVER ...

        // Получаем данные по url хранящемуся в дата атрибуте targetList,
        // соответственно url для ajax(а) нужно добавлять именно в него

        SPINNER.addClass('visible');

        setTimeout(function () {
            SPINNER.removeClass('visible');

            targetList.append(articlesData.articles);

            if (slider) {
                slider.update();
                $(slider.el).children('.swiper-wrapper').css({
                    'transform': 'translate3d(-' + offset + 'px, 0px, 0px)',
                    'transitionDuration': '500ms',
                });
            }

            setTimeout(function () {
                addedItems = $('.article-list__slide.added');
                $(addedItems).removeClass('added');
            }, 100);

            setTimeout(function () {
                $(addedItems).attr('style', '');
            }, 1500);
        }, 1500);

        if (btnMore) {
            // Скрываем кнопку добавления если добавляли новые элементы полсе клика по кнопке
            // !!!! Добавлять url для ajax запроса данных в инлайновые стили объртки списка .tab-list__list__wrap
            // который передаётся в функции в параметр targetList

            console.log(btnMore)
        }
    }

    if (tabListBtns.length) {
        for (let i = 0; i < tabListBtns.length; i++) {
            $(tabListBtns[i]).on('click', function (e) {
                const targetListId = $(this).data('listId');
                const targetList = $(targetListId)
                    .children('.tabs-item.visible')
                    .find('.tab-list__list__wrap');
                    addTabListItems(targetList, undefined, this);
            });
        }
    }
});