import $ from "jquery";

import './handle-click-on-additionally-controller-buttons';
import './handle-click-on-calc-tab-buttons';
import './sticky-picture-at-the-calc-body';
import './setting-execution-type';
import './settings-type-size';
import './setting-pixel-step';
import './setting-width-height';
import './setting-controller-system';
import './go-to-cabin-pixel-step-less-than-2_5';
import './submit-calc-forms';

window.isDebugMainCalcState = false;

window.isDebugMainCalcResults = true;

window.CALC_PRICE = $('#mainCalc').data('calcPrice');

window.MAIN_CALC_STATE = {
    calcType: 'outsideScreen', // outsideScreen, insideScreen, mediaFaced, rentScreen
    outsideScreen: {
        location: "outdoor",
        executionType: 'monolithic', // monolithic, cabinet
        sizeType: [320, 160], // [320,160], [640,640], [960,960]
        maxSizes: {
            320160: [30400,30400],
            640640: [30720,30720],
            960960: [30720,30720]
        },
        pixelStep: undefined,
        width: undefined,
        height: undefined,
        controllerParams: {
            width: {
                min: 320,
                max: 30400,
                step: 320
            },
            height: {
                min: 160,
                max: 30400,
                step: 160
            }
        },
        QModH: undefined,
        QModW: undefined,
        QModSum: undefined,
        Mod: undefined,
        $ModSum: undefined,
        QBp: undefined,
        Bp: undefined,
        $BpSum: undefined,
        QRv: undefined,
        Rv: undefined,
        $RvSum: undefined,
        $St: undefined,
        QMag: undefined,
        Mag: undefined,
        $MagSum: undefined,
        Pr: undefined,
        $PrSum: undefined,
        Ug: undefined,
        $UgSum: undefined,
        QNa: undefined,
        Na: undefined,
        $NaSum: undefined,
        $Sum: undefined,
        ExchangeRate: undefined,
        RubSum: undefined,
        QMk: undefined,
        $MkSum: undefined,
        SUType: "controller", // controller, processor
        SU: undefined,
        $SUSum: undefined
    },
    insideScreen: {
        location: "indoor",
        executionType: 'monolithic', // monolithic, cabinet
        sizeType: [320, 160], // [320,160], [640,480], [640,640], [960,960]
        maxSizes: {
            320160: [16000,16000],
            640480: [16000,16320],
            640640: [16000,16000],
            960960: [16320,16320]
        },
        pixelStep: undefined,
        width: undefined,
        height: undefined,
        controllerParams: {
            width: {
                min: 320,
                max: 16000,
                step: 320
            },
            height: {
                min: 160,
                max: 16000,
                step: 160
            }
        },
        QModH: undefined,
        QModW: undefined,
        QModSum: undefined,
        Mod: undefined,
        $ModSum: undefined,
        QBp: undefined,
        Bp: undefined,
        $BpSum: undefined,
        QRv: undefined,
        Rv: undefined,
        $RvSum: undefined,
        $St: undefined,
        QMag: undefined,
        Mag: undefined,
        $MagSum: undefined,
        Pr: undefined,
        $PrSum: undefined,
        Ug: undefined,
        $UgSum: undefined,
        QNa: undefined,
        Na: undefined,
        $NaSum: undefined,
        $Sum: undefined,
        ExchangeRate: undefined,
        RubSum: undefined,
        QMk: undefined,
        $MkSum: undefined,
        SUType: "controller", // controller, processor
        SU: undefined,
        $SUSum: undefined
    },
    mediaFaced: {
        executionType: 'monolithic', // monolithic, cabinet
        sizeType: [320, 160], // [320,160], [640,480], [640,640], [960,960]
        pixelStep: undefined,
        width: undefined,
        height: undefined,
        controllerParams: {
            width: {
                min: undefined,
                max: undefined,
                step: undefined
            },
            height: {
                min: undefined,
                max: undefined,
                step: undefined
            }
        }
    },
    rentScreen: {
        rentConstruction: 'monolithic', // outdoor, Подвесная
        sizeType: [320, 160], // [320,160], [640,480], [640,640], [960,960]
        pixelStep: undefined,
        width: undefined,
        height: undefined,
        controllerParams: {
            width: {
                min: undefined,
                max: undefined,
                step: undefined
            },
            height: {
                min: undefined,
                max: undefined,
                step: undefined
            }
        }
    },
};

window.executionTypeTimer = {
    pixelStep: undefined,
    executionType: undefined
};

window.printMainState = function() {
    console.log(
        'Current STATE of all calculators: ',
        MAIN_CALC_STATE
    );
};

window.getActiveMainCalc = function() {
    return $('.calc__calculator.active')[0];
}