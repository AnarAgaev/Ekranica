import $ from 'jquery';
import { correctInputRangesAfterUpdateState } from "../setting-execution-type";

export default function setCalcRentHeightToItsRange (controller) {
    let calc = MAIN_CALC_STATE
            .calcType,

        maxSizeId = $(controller)
            .data('maxSizesId'),

        maxSizes = MAIN_CALC_STATE[calc]
            .maxSizes[maxSizeId],

        maxHeight = maxSizes.height,

        container = $(getActiveMainCalc())
            .find('.label-controll__size-type-height'),

        input = $(container)
            .find('.custom-input')
            .children('input'),

        slider = $(container)
            .find('.custom-range__slide');

    $(input).data('max', maxHeight);
    $(slider).prop('max', maxHeight);

    MAIN_CALC_STATE[calc]
        .controllerParams
        .height
        .max = maxHeight;

    correctInputRangesAfterUpdateState();
}