import $ from "jquery";

$(document).ready(function () {
    const ranges = $('input[type="range"]');
    if (ranges.length > 0) {
        for (let i = 0; i < ranges.length; i++) {
            $(ranges[i]).on('input',function () {
                const valueContainer = $(this)
                    .closest('.custom-range')
                    .find('.value');

                const statusBar = $(this)
                    .closest('.custom-range')
                    .find('.status-bar');

                const slider = $(this)
                    .closest('.custom-range')
                    .find('.slider');

                const range = $(this) .closest('.custom-range');

                let containerWidth,
                    partsWidth,
                    statusBarWidth,
                    partsSliderWidth,
                    sliderOffsetLeft;

                containerWidth = $(this)[0].offsetWidth + $(this)[0].offsetLeft - 8;
                partsWidth = containerWidth / ($(this)[0].max - $(this)[0].min);
                statusBarWidth = (this.value - $(this)[0].min) * partsWidth;
                partsSliderWidth = ($(this)[0].offsetWidth - $(slider).width()) / ($(this)[0].max - $(this)[0].min);
                sliderOffsetLeft = (this.value - $(this)[0].min) * partsSliderWidth;

                valueContainer.text(this.value);
                range.data('calcValue', this.value);
                $(statusBar).css('width', statusBarWidth + 'px');
                $(slider).css('left', sliderOffsetLeft + 'px');
            });
        }
    }
});