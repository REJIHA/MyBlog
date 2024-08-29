/*
First, this javascript code keeps icons inside windows xp style background in
appropriate ratio to background, so when the user resizes or refreshes the
window or moves the icon, they stay relative to changed aspects.
*/

const imgRatio = 0.15;
let dragElem = null;

// Object for mouse cursor coordinates upon click on draggable item
var coordinate = {
    newX: 0,
    newY: 0,
    startX: 0,
    startY: 0
};

// Boundary of draggable area
var boundary = {
    top: 0,
    bot: 0,
    left: 0,
    right: 0
};

function startDragging(id) {
    // Fetch the element to drag from html and start tracking mouse movements
    dragElem = document.getElementById(id);
    // console.log("dragging this item: "+dragElem.id);

    dragElem.addEventListener('mousedown', mouseDown);
}

function mouseDown(e) {
    // Grab cursor position upon drag start click
    coordinate.startX = e.clientX;
    coordinate.startY = e.clientY;
    // console.log("mouse start XY: ("+coordinate.startX+", "+coordinate.startY+")");

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

function mouseMove(e) {
    // Calculate distance between drag start click and mouse move (dragging)
    coordinate.newX = coordinate.startX - e.clientX;
    coordinate.newY = coordinate.startY - e.clientY;
    // console.log("new XY: ("+coordinate.newX+", "+coordinate.newY+")");

    // Reset start position
    coordinate.startX = e.clientX;
    coordinate.startY = e.clientY;
    // console.log("curr start XY: ("+coordinate.startX+", "+coordinate.startY+")");

    // Move the element
    dragElem.style.top = (dragElem.offsetTop - coordinate.newY) + 'px';
    dragElem.style.left = (dragElem.offsetLeft - coordinate.newX) + 'px';
    // console.log("moved to: ("+(dragElem.offsetTop - coordinate.newY)+", "+(dragElem.offsetLeft - coordinate.newX)+")");
}

function mouseUp(e) {
    // Upon releasing the click stop dragging
    document.removeEventListener('mousemove', mouseMove);
}

function repositionIcons() {
/*  TODO: stick icon coordinate according to background image ratio
            do not let icon move out of background image
*/

    // When background image resize, reposition & resize icons inside too
    const bckgnd = document.getElementById("mainBackgroundImg");
    const aboutme = document.getElementById("aboutmeImg");


    // const bckgndWidth = bckgnd.offsetWidth;
    const bckgndHeight = bckgnd.offsetHeight;
    // console.log("background size: "+bckgndWidth+" "+bckgndHeight);

    aboutme.style.width = (bckgndHeight * imgRatio) + "px";
    aboutme.style.height = (bckgndHeight * imgRatio) + "px";
    // console.log("about me: "+aboutme.offsetWidth+" "+aboutme.offsetHeight);
}

// Make sure icons keep appropriate size and location on refresh & resize of window
window.onresize = repositionIcons;
window.onload = repositionIcons;