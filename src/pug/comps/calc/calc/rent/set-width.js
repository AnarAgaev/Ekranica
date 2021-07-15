import $ from 'jquery';
import { correctInputRangesAfterUpdateState } from "../setting-execution-type";

export default function setCalcRentWidthToItsRange (controller) {
    let calc = MAIN_CALC_STATE
            .calcType,

        maxSizeId = $(controller)
            .data('maxSizesId'),

        maxSizes = MAIN_CALC_STATE[calc]
            .maxSizes[maxSizeId],

        maxWidth = maxSizes.width,

        container = $(getActiveMainCalc())
            .find('.label-controll__size-type-width'),

        input = $(container)
            .find('.custom-input')
            .children('input'),

        slider = $(container)
            .find('.custom-range__slide');

    $(input).data('max', maxWidth);
    $(slider).prop('max', maxWidth);

    MAIN_CALC_STATE[calc]
        .controllerParams
        .width
        .max = maxWidth;

    correctInputRangesAfterUpdateState();
}