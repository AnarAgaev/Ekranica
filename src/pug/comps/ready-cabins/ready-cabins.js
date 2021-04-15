import $ from "jquery";

$(document).ready(function () {

    // Gallery animation into the cards on all slider with filter
    const dots = $('.dot');

    if (dots.length > 0) {
        for (let i = 0; i < dots.length; i++) {
            $(dots[i]).on('click', function () {
                const numEl = $(this).index();
                const imgs = $(this).closest('.gallery').find('.image');
                const dots = $(this).closest('.gallery').find('.dot');

                $(dots).removeClass('active');
                $(this).addClass('active');

                $(imgs).removeClass('active');
                $(imgs[numEl]).addClass('active');
            });
        }
    }


    // Auto slider for gallery animation into the cards on all slider with filter
    const gallerys = $('.gallery');

    if (gallerys.length > 0) {
        setInterval(function () {
            for (let i = 0; i < gallerys.length; i++) {
                const activeIndex = $(gallerys[i]).find('.dot.active').index();
                const dots = $(gallerys[i]).find('.dot');
                const imgs = $(gallerys[i]).find('.image');
                const nextIndex = activeIndex + 1 === dots.length ? 0 : activeIndex + 1;

                $(dots).removeClass('active');
                $(dots).eq(nextIndex).addClass('active');


                $(imgs).removeClass('active');
                $(imgs).eq(nextIndex).addClass('active');
            }
        }, 3000);
    }


    // TYPICAL SOLUTIONS FILTER
    const tsItems = $('.ready-cabins__slide');
    const tsFilterConstrols = $('.filter-controller');
    const tsFilterState = {
        executionType: '',
        pixelStep: '',
        width: '',
    }

    function setState(prop, value, reset = false) {
        // Обновляем стэйт
        if (reset) {
            for (let key in tsFilterState) {
                tsFilterState[key] = '';
            }
        } else {
            tsFilterState[prop] = value.toString();
        }

        /* Обновляем DOM в соответствии с новым STATE
         * Проходим по всем слайдам и скрываем те,
         * которые не удовлетворяют фильтру
         * (добавить класс hidden),
         * в противном случае показываем.
         */
        for (let j = 0; j < tsItems.length ; j++) {
            const itemProps = $(tsItems[j]).data('filterProps');
            let isHidden = false;

            for (let key in tsFilterState) {
                if (tsFilterState[key] !== '' && tsFilterState[key] !== itemProps[key]) {
                    isHidden = true;
                    break;
                }
            }

            if (isHidden) {
                $(tsItems[j]).addClass('hidden');
            } else {
                $(tsItems[j]).removeClass('hidden');
            }

            // Переинициализируем соответствующий слайдер
            tsSlider.update();
        }

        // Обработка пустого результата фильтрации
        // если нет ни одного элемента удовлетворяющего фильтру
        const slides = $('.ready-cabins__slide:not(".hidden")');

        if (slides.length === 0) {
            $('#notFilterTsResults').addClass('visible');
            $('#btnTypicalSolutionsPrev').addClass('hidden');
            $('#btnTypicalSolutionsNext').addClass('hidden');
        } else {
            $('#notFilterTsResults').removeClass('visible');
            $('#btnTypicalSolutionsPrev').removeClass('hidden');
            $('#btnTypicalSolutionsNext').removeClass('hidden');
        }
    }

    // Обрабатываем клик на контроллере
    if (tsFilterConstrols.length > 0) {
        for (let i = 0; i < tsFilterConstrols.length; i++) {
            $(tsFilterConstrols[i]).on('click', function (e) {
                setState(
                    $(this).data('filterProperty'),
                    $(this).data('filterValue')
                );
            });
        }
    }

    // Сбрасываем все контроллеры
    function resetControlls(...constrolls) {
        if (constrolls.length > 0) {
            for (let i = 0; i < constrolls.length; i++) {
                const type = $(constrolls[i]).data('controllerType');

                switch(type) {
                    case 'radio-group':
                        $(constrolls[i])
                            .children('.marker')
                            .removeAttr('style');

                        const inputs = $(constrolls[i]).children('input');
                        if (inputs.length > 0) {
                            for (let j = 0; j < inputs.length; j++) {
                                $(inputs[j])[0].checked = false;
                            }
                        }

                        break;

                    case 'custom-select':
                        $(constrolls[i]).children('.selected').text('');
                        $(constrolls[i]).find('.active').removeClass('active');

                        break;
                }
            }
        }
    }

    // Сбрасываем все результаты фильтра
    $('#tsResetFilter').on('click', function () {
        setState(
            undefined,
            undefined,
            true
        );

        resetControlls(
            $('#tsExecutionType'),
            $('#tsPixelStep'),
            $('#tsWidth'),
        );
    });
});