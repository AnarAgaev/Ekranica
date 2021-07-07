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
                case 'RS':
                    resetValueHiddenSelect(self);
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
                () => $(hiddenController)
                    .find('.select-suffix__selected-item')
                    .text('1'),
                300
            )
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














// function handleChangeOnHiddenLabelController () {
//     let controller = $(this)
//         .closest('.label-controll_checkbox')
//         .next('.label-controll_hidden');
//
//     if ($(this).prop("checked")) {
//         showCalcHiddenController(controller);
//         setValueOfHiddenCheckerToState(this);
//
//         console.log(show)
//     } else {
//         hideCalcHiddenController(controller);
//         removeValueOfHiddenCheckerToState(this);
//     }
// }
//
// function showCalcHiddenController (controller) {
//     let caption = $(controller)
//         .find('.label-controll__caption');
//
//     $(controller).removeClass('hide');
//
//     setTimeout(
//         () => {
//             $(controller).addClass('visible');
//             $(caption).addClass('visible');
//         },
//         100
//     )
// }
//
// function setValueOfHiddenCheckerToState (self) {
//     let prop = $(self).data('calcProperty');
//     let calc = $(getActiveMainCalc()).attr('id');
//
//     MAIN_CALC_STATE[calc][prop] = 1;
// }
//
// function hideCalcHiddenController (controller) {
//     let caption = $(controller)
//         .find('.label-controll__caption');
//
//     $(controller).removeClass('visible');
//     $(caption).removeClass('visible');
//
//     setTimeout(
//         () => {
//             $(controller).addClass('hide');
//         },
//         500
//     );
// }
//
// function removeValueOfHiddenCheckerToState (self) {
//     let prop = $(self).data('calcProperty');
//     let calc = $(getActiveMainCalc()).attr('id');
//
//     MAIN_CALC_STATE[calc][prop] = undefined;
//
//     resetValueHiddenController (self);
// }
//
