import $ from "jquery";

$(document).ready(function () {

    setTimeout(function () {
        if ($('#tsSlider').length > 0) {
            tsSlider.update();
        }
    }, 700);

    // TYPICAL SOLUTIONS FILTER
    const tsItems = $('.typical-solutions__slide');
    const tsFilterConstrols = $('.typical-solutions .filter-controller');
    const tsFilterState = {
        executionType: '',
        pixelStep: '',
        width: '',
        solutionType: '',
    }

    function setTsState(prop, value, reset = false) {
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

            $(tsItems).addClass('hide');

            setTimeout(function () {
                if (isHidden) {
                    $(tsItems[j]).addClass('hidden');
                } else {
                    $(tsItems[j]).removeClass('hidden');
                    $(tsItems[j]).addClass('invisible');
                }
            }, 300);
        }

        setTimeout(function () {
            // Обработка пустого результата фильтрации
            // если нет ни одного элемента удовлетворяющего фильтру
            const slides = $('.typical-solutions__slide:not(".hidden")');

            if (slides.length === 0) {
                $('#notFilterTsResults').addClass('visible');
                $('#btnTsPrev').addClass('hidden');
                $('#btnTSNext').addClass('hidden');
            } else {
                $('#notFilterTsResults').removeClass('visible');
                $('#btnTsPrev').removeClass('hidden');
                $('#btnTSNext').removeClass('hidden');
            }

            // Переинициализируем соответствующий слайдер
            tsSlider.update();
        }, 300);

        // Добавляем delay для постепенного появления слайдов
        setTimeout(function () {
            const invisibleItems = $(tsItems).filter('.invisible.hide');

            for (let i = 0; i < invisibleItems.length; i++) {
                $(invisibleItems[i]).css('transition-delay', 0.1 * i + 's');
            }
        }, 350);

        // Показываем отфильтрованные слайды
        setTimeout(function () {
            $(tsItems).removeClass('invisible hide');
        }, 400);

        // Чистим transition-delay во всех слайдах
        setTimeout(function () {
            $(tsItems).attr('style', '');
        }, 1000);
    }

    // Обрабатываем клик на контроллере
    if (tsFilterConstrols.length > 0) {
        for (let i = 0; i < tsFilterConstrols.length; i++) {
            $(tsFilterConstrols[i]).on('click', function (e) {
                setTsState(
                    $(this).data('filterProperty'),
                    $(this).data('filterValue')
                );
            });
        }
    }

    // Сбрасываем все контроллеры
    function resetTsControlls(...constrolls) {
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
                        $(constrolls[i]).children('.selected').html('&nbsp;');
                        $(constrolls[i]).find('.active').removeClass('active');

                        break;
                }
            }
        }
    }

    // Сбрасываем все результаты фильтра
    $('#resetTsFilter').on('click', function () {
        setTsState(
            undefined,
            undefined,
            true
        );

        resetTsControlls(
            $('#executionType'),
            $('#pixelStep'),
            $('#width'),
            $('#solutionType'),
        );
    });
});