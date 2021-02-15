$(document).ready( evt => {
    $('header .dropdown').each((i, el) => {
        const handlerIn = () => {
            $('#navLine').addClass('visible');
        }

        const handlerOut = () => {
            $('#navLine').removeClass('visible');
        }

        $(el).hover(handlerIn, handlerOut);
    });
});