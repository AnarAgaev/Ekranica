import $ from "jquery";

$(document).ready(function () {
    // Handle cursor when it's over some image
    const cursor = document
        .getElementById('cursor');

    console.log(
        cursor
    )
    const imagesWithCursor = document
        .getElementsByClassName('custom-cursor');

    // Function for move cursor when mouse is over image
    const moveCursor = event => {
        cursor.style.top = event.pageY + 'px';
        cursor.style.left = event.pageX + 'px';
        cursor.classList.add('visible');
    };

    // Listening when cursor of mouse is over or out on clickable image
    [].forEach.call(imagesWithCursor, el => {
        el.addEventListener('mousemove', moveCursor);
        el.addEventListener('mouseout', () => {
            cursor.classList.remove('visible');
        });
    });
});

