import $ from "jquery";
import { setRentPixelStepToState } from "./set-pixel-step";
import setRadioMarker from '../../../custom-slider-radio/custom-slider-radio';

$(document).ready(() => {
    $('.calc-rent-execution label')
        .toArray()
        .forEach(addHandleClickOnRentExecutionToggle)

    function addHandleClickOnRentExecutionToggle (el) {
        $(el).click(
            handleClickOnRentExecutionToggle
        );
    }

    function handleClickOnRentExecutionToggle () {
        setRentExecutionToState(this);
        setRentPixelStep(this);
    }

    function setRentPixelStep(controller) {
        let pixelStepFlag = $(controller)
            .data('calcPixelStep'),

            pixelStepController = $('.rent-pixel-step')
                .find(`[data-calc-value="${pixelStepFlag}"]`);

        $(pixelStepController)
            .prev('input')
            .prop({'checked': true});

        setRentPixelStepToState(pixelStepController);
        setRadioMarker(pixelStepController);
    }
});

function setRentExecutionToState (controller) {
    let propName = $(controller).data('calcProperty');
    let propValue = $(controller).data('calcValue');
    let activeCalc = MAIN_CALC_STATE.calcType;

    MAIN_CALC_STATE[activeCalc][propName] = propValue;

    if(isDebugMainCalcState) printMainState();
}

export {
    setRentExecutionToState
};













// let isPixelStepCorrect = checkPixelStep(this);

// if (isPixelStepCorrect) {
//     setExecutionTypeToState(this);
//     toggleTypeOfCabin(this);
//     setSizeTypeToState(this);
//     setTypeSizeToInputsRange(this);
//     correctInputRangesAfterUpdateState();
//
//     cleanCalcCurrentResult();
// }



// function toggleTypeOfCabin (controller) {
//     let type = $(controller).data('calcValue');
//     let cabinTypeContainer = $(controller)
//         .closest('.label-controll')
//         .next('.cabin-type');
//
//     type === 'cabinet'
//         ? showCabinTypeContainer(cabinTypeContainer)
//         : hideCabinTypeContainer(cabinTypeContainer);
// }
//
// function setSizeTypeToState (controller) {
//     let calcType = getActiveMainCalc().attr('id');
//     let calcProp = $(controller).data('calcProperty');
//
//     MAIN_CALC_STATE[calcType].sizeType = (calcProp === 'executionType')
//         ? getTypeSizeFromExecutionTypeBtn(controller)
//         : getSizeTypeFromString($(controller).data('calcValue'));
// }
//
// function getTypeSizeFromExecutionTypeBtn (controller) {
//     let screenType = $(controller).data('calcValue');
//
//     if (screenType === 'monolithic') {
//         return [320, 160];
//     }
//
//     let value = $(getActiveMainCalc())
//         .find('.calc-cabin-type')
//         .find('input:checked')
//         .next('label')
//         .data('calcValue');
//
//     return getSizeTypeFromString(value);
// }
//
// function setTypeSizeToInputsRange (controller) {
//     let from = $(controller).data('calcProperty');
//     let value = $(controller).data('calcValue');
//     let typeSize;
//
//     if (from === 'executionType') {
//         typeSize = getTypeSizeFromExecutionTypeBtn(controller);
//     } else if (from === 'cabinType') {
//         typeSize = getSizeTypeFromString(value);
//     }
//
//     setWidthToInputRange(typeSize);
//     setHeightToInputRange(typeSize);
//
//     setWidthParamsToCalcState(typeSize);
//     setHeightParamsToCalcState(typeSize);
// }
//
// function setWidthToInputRange (typeSize) {
//     let container = $(getActiveMainCalc())
//         .find('.label-controll__size-type-width');
//
//     let controller = $(container)
//         .find('.custom-input')
//         .children('input');
//
//     let slider = $(container)
//         .find('.custom-range__slide');
//
//     let newParams = getNewTypeSizeForWidth(typeSize);
//
//     $(controller).data('min', newParams.min);
//     $(controller).data('max', newParams.max);
//
//     $(slider).prop('min', newParams.min);
//     $(slider).prop('max', newParams.max);
//     $(slider).prop('step', newParams.step);
// }
//
// function getNewTypeSizeForWidth (typeSize) {
//     let screenType = $(getActiveMainCalc()).attr('id');
//     let sizeId = parseInt(typeSize.join(''));
//     let newParams = {};
//
//     switch(screenType) {
//         case 'outsideScreen':
//             newParams.min = newParams.step = typeSize[0];
//             newParams.max = MAIN_CALC_STATE.outsideScreen.maxSizes[sizeId][0];
//             break;
//
//         case 'insideScreen':
//             newParams.min = newParams.step = typeSize[0];
//             newParams.max = MAIN_CALC_STATE.insideScreen.maxSizes[sizeId][0];
//             break;
//
//         default:
//             console.log('Unknown type of calculator!');
//             break;
//     }
//
//     return newParams;
// }
//
// function setWidthParamsToCalcState (typeSize) {
//     let calcType = $(getActiveMainCalc()).attr('id');
//     let newParams = getNewTypeSizeForWidth(typeSize);
//
//     MAIN_CALC_STATE[calcType].controllerParams.width.min = newParams.min;
//     MAIN_CALC_STATE[calcType].controllerParams.width.max = newParams.max;
//     MAIN_CALC_STATE[calcType].controllerParams.width.step = newParams.step;
// }
//
// function setHeightToInputRange (typeSize) {
//     let container = $(getActiveMainCalc())
//         .find('.label-controll__size-type-height');
//
//     let controller = $(container)
//         .find('.custom-input')
//         .children('input');
//
//     let slider = $(container)
//         .find('.custom-range__slide');
//
//     let newParams = getNewTypeSizeForHeight(typeSize);
//
//     $(controller).data('min', newParams.min);
//     $(controller).data('max', newParams.max);
//
//     $(slider).prop('min', newParams.min);
//     $(slider).prop('max', newParams.max);
//     $(slider).prop('step', newParams.step);
// }
//
// function getNewTypeSizeForHeight (typeSize) {
//     let screenType = $(getActiveMainCalc()).attr('id');
//     let sizeId = parseInt(typeSize.join(''));
//     let newParams = {};
//
//     switch(screenType) {
//         case 'outsideScreen':
//             newParams.min = newParams.step = typeSize[1];
//             newParams.max = MAIN_CALC_STATE.outsideScreen.maxSizes[sizeId][1];
//             break;
//
//         case 'insideScreen':
//             newParams.min = newParams.step = typeSize[1];
//             newParams.max = MAIN_CALC_STATE.insideScreen.maxSizes[sizeId][1];
//             break;
//
//         default:
//             console.log('Unknown type of calculator!');
//             break;
//     }
//
//     return newParams;
// }
//
// function setHeightParamsToCalcState (typeSize) {
//     let calcType = $(getActiveMainCalc()).attr('id');
//     let newParams = getNewTypeSizeForHeight(typeSize);
//
//     MAIN_CALC_STATE[calcType].controllerParams.height.min = newParams.min;
//     MAIN_CALC_STATE[calcType].controllerParams.height.max = newParams.max;
//     MAIN_CALC_STATE[calcType].controllerParams.height.step = newParams.step;
// }
//
// function correctInputRangesAfterUpdateState () {
//     correctCalcInputRanges('width');
//     correctCalcInputRanges('height');
// }
//
// function correctCalcInputRanges (stateProperty) {
//     let activeCalc = $(getActiveMainCalc()).attr('id');
//     let valInState = MAIN_CALC_STATE[activeCalc][stateProperty];
//
//     if (valInState === undefined) return; // Work only if values was set
//
//     let min = MAIN_CALC_STATE[activeCalc].controllerParams[stateProperty].min;
//     let max = MAIN_CALC_STATE[activeCalc].controllerParams[stateProperty].max;
//     let step = MAIN_CALC_STATE[activeCalc].controllerParams[stateProperty].step;
//     let newValue;
//
//     if (valInState < min) newValue = min;
//     else if (valInState > max) newValue = max;
//     else if (valInState % step === 0) newValue = valInState;
//     else {
//         let wholeNumber = Math.trunc(valInState / step) + 1;
//         let roundVal = step * wholeNumber;
//
//         newValue = roundVal > max
//             ? max
//             : roundVal;
//     }
//
//     let container = $(getActiveMainCalc())
//         .find('.label-controll__size-type-' + stateProperty);
//
//     let controller = $(container)
//         .find('.custom-input')
//         .children('input');
//
//     let slider = $(container)
//         .find('.custom-range__slide');
//
//     $(controller).val(newValue);
//     $(slider).val(newValue);
//
//     setRange(slider[0], false);
// }
//
// function showCabinTypeContainer (container) {
//     let caption = $(container).children('.label-controll__caption');
//     $(container).removeClass('hidden');
//
//     setTimeout(
//         () => {
//             $(container).addClass('visible');
//             $(caption).addClass('visible');
//             setCabinTypeMarker();
//         },
//         100
//     );
// }
//
// function setCabinTypeMarker () {
//     setTimeout(setMarker, 200);
//
//     function setMarker() {
//         let radio = $(getActiveMainCalc()).find('.calc-cabin-type');
//         let marker = $(radio).children('.marker');
//         let label = $(radio).find('input:checked + label');
//         let width = $(label).innerWidth();
//         let left = $(label).position().left;
//
//         $(marker).css({
//             'width': width,
//             'left': left + 'px',
//             'opacity': '1',
//         });
//     }
// }
//
// function hideCabinTypeContainer (container) {
//     let caption = $(container).children('.label-controll__caption');
//     $(container).removeClass('visible');
//     $(caption).removeClass('visible');
//
//     setTimeout(
//         () => {
//             $(container).addClass('hidden');
//         },
//         500
//     );
// }
//
// function getSizeTypeFromString (sizeTypeStr) {
//     return sizeTypeStr
//         .split(',')
//         .map(el => parseInt(el, 10));
// }
//
// function checkPixelStep (btn) {
//     let pixelStep = $(btn)
//         .closest('.calc__body-controllers')
//         .find('.calc-pixel-step')
//         .find('.custom-select__item.active')
//         .data('calcValue');
//
//     if(pixelStep === undefined) return true;
//
//     pixelStep = typeof pixelStep === 'string'
//         ? parseFloat(pixelStep.replace("," , "."))
//         : pixelStep;
//
//     let warning = $(btn)
//         .closest('.calc__body-controllers')
//         .find('.label-controll__warning');
//
//     let cabinBtn = $(btn)
//         .closest('.calc-execution-type')
//         .find('[data-calc-value="cabinet"]');
//
//     let executionType = $(btn).data('calcValue');
//
//     if (executionType === "monolithic" && pixelStep <= 2) {
//         if ($(warning).hasClass('visible')) {
//
//             if (executionTypeTimer.pixelStep) {
//                 $(warning).removeClass('visible');
//                 clearTimeout(executionTypeTimer.pixelStep);
//                 executionTypeTimer.pixelStep = undefined;
//
//                 setTimeout(
//                     () => showPixelStepWar(warning),
//                     500
//                 );
//             }
//
//         } else showPixelStepWar(warning);
//
//         setTimeout(
//             () => $(cabinBtn).click(), // for block toggle controller
//             3
//         );
//
//         return false; // for block toggle execution type
//     }
//
//     if (executionType === "monolithic" && pixelStep > 2) {
//         $(warning).removeClass('visible');
//
//         clearTimeout(executionTypeTimer.pixelStep);
//         executionTypeTimer.pixelStep = undefined;
//
//         clearTimeout(executionTypeTimer.executionType);
//         executionTypeTimer.executionType = undefined;
//     }
//
//     return true;
// }
//
// function showPixelStepWar (warning) {
//     $(warning)
//         .html(
//             'Шаг менее 2.5мм собирают на Кабинетах.' +
//             '<br>' +
//             'Выберите другой Тип Исполнения экрана.')
//         .addClass('visible');
//
//     executionTypeTimer.executionType = setTimeout(
//         () => {
//             $(warning).removeClass('visible');
//             executionTypeTimer.executionType = undefined;
//         },
//         15000
//     );
// }
//
// export {
//     setSizeTypeToState,
//     setTypeSizeToInputsRange,
//     correctInputRangesAfterUpdateState
// };