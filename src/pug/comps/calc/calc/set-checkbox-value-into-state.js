import $ from "jquery";

$(document).ready(
    function () {
        $('.clac-checkbox')
            .toArray()
            .forEach(addHandlerOnCalcCheckboxChange)

        function addHandlerOnCalcCheckboxChange (el) {
            $(el).change(handlerChangeOnCalcCheckbox);
        }

        function handlerChangeOnCalcCheckbox () {
            $(this).prop("checked")
                ? setCheckboxValueToState(this)
                : removeCheckboxValueFromState(this);
        }

        function setCheckboxValueToState(self) {
            let prop = $(self).data('calcProperty');
            let val = $(self).data('calcValue');
            let calc = $(getActiveMainCalc()).attr('id');

            MAIN_CALC_STATE[calc][prop] = val === undefined
                ? true
                : val;
        }

        function removeCheckboxValueFromState (self) {
            let prop = $(self).data('calcProperty');
            let calc = $(getActiveMainCalc()).attr('id');

            MAIN_CALC_STATE[calc][prop] = undefined;

            switch (prop) {
                case 'RG':
                    resetValueHiddenSelect(self);
                    resetValueInState('RG');
                    break;

                case 'RS':
                    resetValueHiddenSelect(self);
                    resetValueInState('RS');
                    break;

                case 'EP':
                    resetValueHiddenCheckbox(self);
                    break;
            }
        }

        function resetValueHiddenSelect (self) {
            let hiddenController = $(self)
                .closest('.label-controll_checkbox')
                .next('.label-controll_hidden');

            $(hiddenController)
                .find('.custom-select__item.active')
                .removeClass('active');

            $(hiddenController)
                .find('.custom-select__item:first-child')
                .addClass('active');

            setTimeout(
                () => {
                    $(hiddenController)
                        .find('.select-suffix__selected-item')
                        .text('1');

                    $(hiddenController)
                        .find('.select-suffix__units')
                        .text('год');
                },
                300
            )
        }

        function resetValueInState(flag) {
            let calcType = $(getActiveMainCalc()).attr('id');

            switch (flag) {
                case 'RG':
                    MAIN_CALC_STATE[calcType].$RG = undefined;
                    break;

                case 'RS':
                    MAIN_CALC_STATE[calcType].$RS = undefined;
                    break;
            }
        }

        function resetValueHiddenCheckbox (self) {
            let controller = $(self)
                .closest('.label-controll_checkbox')
                .next('.label-controll_hidden')
                .find('input');

            let prop = $(controller).data('calcProperty');
            let calc = $(getActiveMainCalc()).attr('id');

            $(controller).prop("checked", false);
            MAIN_CALC_STATE[calc][prop] = undefined;
        }
    }
);
