import $ from "jquery";

$(document).ready(function () {

    // TYPICAL SOLUTIONS FILTER
    const items = $('.simple-filter-slide');
    const filterConstrols = $('.filter-controller');
    const filterState = {
        executionType: '',
        pixelStep: '',
        width: '',
    }

    function setState(prop, value, reset = false) {
        // Обновляем стэйт
        if (reset) {
            for (let key in filterState) {
                filterState[key] = '';
            }
        } else {
            filterState[prop] = value.toString();
        }

        /* Обновляем DOM в соответствии с новым STATE
         * Проходим по всем слайдам и скрываем те,
         * которые не удовлетворяют фильтру
         * (добавить класс hidden),
         * в противном случае показываем.
         */
        for (let j = 0; j < items.length ; j++) {
            const itemProps = $(items[j]).data('filterProps');
            let isHidden = false;

            for (let key in filterState) {
                if (filterState[key] !== '' && filterState[key] !== itemProps[key]) {
                    isHidden = true;
                    break;
                }
            }

            if (isHidden) {
                $(items[j]).addClass('hidden');
            } else {
                $(items[j]).removeClass('hidden');
            }

            // Переинициализируем соответствующий слайдер
            tsSlider.update();
        }

        // Обработка пустого результата фильтрации
        // если нет ни одного элемента удовлетворяющего фильтру
        const slides = $('.simple-filter-slide:not(".hidden")');

        if (slides.length === 0) {
            $('#notFilterResults').addClass('visible');
            $('#btnTypicalSolutionsPrev').addClass('hidden');
            $('#btnTypicalSolutionsNext').addClass('hidden');
        } else {
            $('#notFilterResults').removeClass('visible');
            $('#btnTypicalSolutionsPrev').removeClass('hidden');
            $('#btnTypicalSolutionsNext').removeClass('hidden');
        }
    }

    // Обрабатываем клик на контроллере
    if (filterConstrols.length > 0) {
        for (let i = 0; i < filterConstrols.length; i++) {
            $(filterConstrols[i]).on('click', function (e) {
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
    $('#resetFilter').on('click', function () {
        setState(
            undefined,
            undefined,
            true
        );

        resetControlls(
            $('#executionType'),
            $('#pixelStep'),
            $('#width'),
        );
    });
});