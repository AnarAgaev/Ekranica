import $ from "jquery";

$(document).ready(function () {

    // TYPICAL SOLUTIONS FILTER
    const rcItems = $('.ready-cabins__slide');
    const rcFilterConstrols = $('.ready-cabins .filter-controller');
    const rcFilterState = {
        executionType: '',
        pixelStep: '',
        width: '',
    }

    function setRcState(prop, value, reset = false) {
        // Обновляем стэйт
        if (reset) {
            for (let key in rcFilterState) {
                rcFilterState[key] = '';
            }
        } else {
            rcFilterState[prop] = value.toString();
        }

        /* Обновляем DOM в соответствии с новым STATE
         * Проходим по всем слайдам и скрываем те,
         * которые не удовлетворяют фильтру
         * (добавить класс hidden),
         * в противном случае показываем.
         */
        for (let j = 0; j < rcItems.length ; j++) {
            const itemProps = $(rcItems[j]).data('filterProps');
            let isHidden = false;

            for (let key in rcFilterState) {
                if (rcFilterState[key] !== '' && rcFilterState[key] !== itemProps[key]) {
                    isHidden = true;
                    break;
                }
            }

            if (isHidden) {
                $(rcItems[j]).addClass('hidden');
            } else {
                $(rcItems[j]).removeClass('hidden');
            }

            // Переинициализируем соответствующий слайдер
            rcSlider.update();
        }

        // Обработка пустого результата фильтрации
        // если нет ни одного элемента удовлетворяющего фильтру
        const slides = $('.ready-cabins__slide:not(".hidden")');

        if (slides.length === 0) {
            $('#notRcFilterResults').addClass('visible');
            $('#btnRcPrev').addClass('hidden');
            $('#btnRcNext').addClass('hidden');
        } else {
            $('#notRcFilterResults').removeClass('visible');
            $('#btnRcPrev').removeClass('hidden');
            $('#btnRcNext').removeClass('hidden');
        }
    }

    // Обрабатываем клик на контроллере
    if (rcFilterConstrols.length > 0) {
        for (let i = 0; i < rcFilterConstrols.length; i++) {
            $(rcFilterConstrols[i]).on('click', function (e) {
                setRcState(
                    $(this).data('filterProperty'),
                    $(this).data('filterValue')
                );
            });
        }
    }

    // Сбрасываем все контроллеры
    function resetRcControlls(...constrolls) {
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
    $('#resetRcFilter').on('click', function () {
        setRcState(
            undefined,
            undefined,
            true
        );

        resetRcControlls(
            $('#executionType'),
            $('#pixelStep'),
            $('#width'),
        );
    });
});