import $ from "jquery";

import {
    setSizeTypeToState,
    setTypeSizeToInputsRange,
    correctInputRangesAfterUpdateState
} from './setting-execution-type';

$(document).ready(
    function () {
        $('.calc-cabin-type label')
            .toArray()
            .forEach(addHandlerClickOnTypeSizeToggle);

        function addHandlerClickOnTypeSizeToggle (el) {
            $(el).click(
                handlerClickOnTypeSizeToggle
            );
        }

        function handlerClickOnTypeSizeToggle () {
            setSizeTypeToState(this);
            setTypeSizeToInputsRange(this);
            correctInputRangesAfterUpdateState();

           cleanCalcCurrentResult();

            if(isDebugMainCalcState) printMainState();
        }
    }
);