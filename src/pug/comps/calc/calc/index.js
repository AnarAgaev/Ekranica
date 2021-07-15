import $ from "jquery";

import './handle-click-on-additionally-controller-buttons';
import './handle-click-on-calc-tab-buttons';
import './setting-execution-type';
import './settings-type-size';
import './setting-pixel-step';
import './setting-width-height';
import './setting-controller-system';
import './setting-content-controller';
import './go-to-cabin-pixel-step-less-than-2_5';
import './calculating';
import './toggle-hidden-controllers';
import './set-hidden-select-controler-value-to-state';
import './set-checkbox-value-into-state';

import './rent/set-execution';
import './rent/set-pixel-step';
import './rent/set-construction';
import './rent/set-system-control';
import './rent/set-rent-days';
import './rent/check-calc-rent-parameters';

$(document).ready(
    function () {
        window.isDebugMainCalcState = false;

        window.isDebugMainCalcResults = true;

        window.CALC_PRICE = $('#mainCalc').data('calcPrice');

        window.MAIN_CALC_STATE = {
            calcType: 'outsideScreen', // outsideScreen, insideScreen, mediaFaced, rentScreen
            outsideScreen: {
                calcType: "outsideScreen",
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
                $SUSum: undefined,
                RG: undefined, // number of years
                $RG: undefined,
                RS: undefined, // number of years
                $RS: undefined,
                DY: undefined,
                EP: undefined,
                ESH: undefined,
                PM: undefined,
                ZCH: undefined,
                UK: undefined, // place, remotely
                QCabW: undefined,
                QCabH: undefined,
                QCab: undefined,
                QModCab: undefined,
                Cab: undefined,
                $CabSum: undefined,
            },
            insideScreen: {
                calcType: "insideScreen",
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
                $SUSum: undefined,
                RG: undefined, // number of years
                $RG: undefined,
                RS: undefined, // number of years
                $RS: undefined,
                DY: undefined,
                EP: undefined,
                ESH: undefined,
                PM: undefined,
                ZCH: undefined,
                UK: undefined, // place, remotely
                QCabW: undefined,
                QCabH: undefined,
                QCab: undefined,
                QModCab: undefined,
                Cab: undefined,
                $CabSum: undefined,
            },
            mediaFaced: {
                calcType: "mediaFaced",
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
                calcType: "rentScreen",
                execution: undefined, // inner, outer
                pixelStep: undefined,
                construction: undefined, // floor, suspended
                systemControl: undefined, // controller, processor
                technician: undefined, // undefined, true
                delivery: undefined, // undefined, true
                rentDays: undefined,
                dateStart: undefined,
                mask: undefined,
                width: undefined,
                height: undefined,
                maxSizes: {
                    39: {
                        width: 50000,
                        height: 50000,
                    },
                    48: {
                        width: 100000,
                        height: 100000,
                    }
                },
                controllerParams: {
                    width: {
                        min: 500,
                        max: 50000,
                        step: 500
                    },
                    height: {
                        min: 500,
                        max: 50000,
                        step: 500
                    }
                },
            },
        };

        window.executionTypeTimer = {
            pixelStep: undefined,
            executionType: undefined
        };

        window.printMainState = function () {
            console.log(
                'Current STATE of all calculators: ',
                MAIN_CALC_STATE
            );
        };

        window.getActiveMainCalc = function () {
            return $('.calc__calculator.active')[0];
        }

        window.cleanCalcCurrentResult = function () {
            let currentCalc = getActiveMainCalc();

            let currentCalcResult = $(currentCalc)
                .find('.calc__results');

            let resultJsonStorage = $(currentCalc)
                .find('.calc-results-input');

            setTimeout(cleanAndHideCalcResult, 100);

            function cleanAndHideCalcResult () {
                if (isCalcResultVisible()) {
                    $(currentCalcResult).addClass('hidden');
                    $(resultJsonStorage).val('');

                    setTimeout(
                        () => $(currentCalcResult)
                            .removeClass('visible hidden'),
                        700
                    )
                }
            }

            function isCalcResultVisible() {
                return $(currentCalcResult)
                    .hasClass('visible');
            }
        }
    }
);