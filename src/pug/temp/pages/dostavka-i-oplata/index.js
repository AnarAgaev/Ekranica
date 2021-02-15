$(document).ready( evt => {
    function initBtnGroup () {
        $('.btn-group__btns').each((i, el)=> {
            const active = $(el).find('.active')[0];
            const marker = $(el).find('.marker')[0];
            const index = $(active).index()

            // Устанавливаем ширину маркера при инициализации страницы
            $(marker).width($(active).innerWidth());

            index === 0
                ? $(marker).css('left', 0)
                : $(marker).css('left', $(active).position().left);

            initTabs(index, el)
        });
    }

    function initTabs (index, el) {
        const parent = $(el).parent()[0];
        const tabs = $(parent).siblings('.tabs');
        const newActive = $(tabs).children()[index];

        $(tabs).children().each((i, el) => {
            $(el).removeClass('visible');
        });

        $(newActive).addClass('visible');
    }

    // Обрабочкик кликов по кнопкам
    $('.btn-group__btns .btn').each((i, el)=> {
        $(el).click(evt => {
            $('.btn-group__btns .btn')
                .removeClass('active');

            $(evt.target)
                .addClass('active');

            initBtnGroup();
        });
    });

    setTimeout(initBtnGroup, 100);
});