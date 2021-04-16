import $ from "jquery";

$(document).ready(function () {

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