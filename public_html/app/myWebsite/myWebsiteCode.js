/*
First, this javascript code keeps icons inside windows xp style background in
appropriate ratio to background, so when the user resizes or refreshes the
window or moves the icon, they stay relative to changed aspects.
*/

const baseImg = document.getElementById("mainBackgroundImg");
const imgRatio = 0.15;
const boundarySize = parseInt(window.getComputedStyle(baseImg).getPropertyValue("padding"));
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

function setBoundary() {
    // const baseImg = document.getElementById("mainBackgroundImg");
    iconCompStyle = window.getComputedStyle(document.getElementById("linkIcon_aboutme"));
    computedWidth = parseInt(iconCompStyle.getPropertyValue("width"));
    computedHeight = parseInt(iconCompStyle.getPropertyValue("height"));
    console.log("ICON SIZE w,h: "+computedWidth+","+computedHeight);
    boundary.top = baseImg.offsetTop + boundarySize;
    boundary.bot = boundary.top + baseImg.offsetHeight - (computedHeight + boundarySize*2);     // gotta subtract (icon size + boundary size) here
    boundary.left = baseImg.offsetLeft + boundarySize;
    boundary.right = boundary.left + baseImg.offsetWidth - (computedWidth + boundarySize*2);   // gotta subtract (icon size + boundary size) here
    // console.log("BOUNDARY TBLR: "+boundary.top+","+boundary.bot+","+boundary.left+","+boundary.right);
}

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

    // Before moving the element, check it's inside the boundary
    moveToX = (dragElem.offsetLeft - coordinate.newX);
    moveToY = (dragElem.offsetTop - coordinate.newY);

    // this lets icons move all over the place
    // dragElem.style.left = moveToX + 'px';
    // dragElem.style.top = moveToY + 'px';
    // console.log("moved to: ("+(dragElem.offsetTop - coordinate.newY)+", "+(dragElem.offsetLeft - coordinate.newX)+")");

    // Move x coordinate
    if ((boundary.left <= moveToX) && (moveToX <= boundary.right)) {
        // New x coordinate is inside the moveable area
        dragElem.style.left = moveToX + 'px';
    } else if (boundary.left > moveToX) {
        // New x coordinate is too left, stop going further
        dragElem.style.left = boundary.left + 'px';
    } else if (boundary.right > moveToX) {
        // New x coordinate is too right, stop going further
        dragElem.style.left = boundary.right + 'px';
    } else {
        // For some reason icon ended up outside of boundary...
        // console.log("icon is outside of bounary!")
    }

    // Move y coordinate
    if ((boundary.top <= moveToY) && (moveToY <= boundary.bot)) {
        // New y coordinate is inside the moveable area
        dragElem.style.top = moveToY + 'px';
    } else if (boundary.top > moveToY) {
        // New y coordinate is too high, stop going further
        dragElem.style.top = boundary.top + 'px';
    } else if (boundary.bot > moveToY) {
        // New y coordinate is too low, stop going further
        dragElem.style.top = boundary.bot + 'px';
    } else {
        // For some reason icon ended up outside of boundary...
        // console.log("icon is outside of bounary!")
    }

    // dragElem.style.left = moveToY + 'px';
    // console.log("arrived at: ("+dragElem.style.left+","+dragElem.style.top+")");
}

function mouseUp(e) {
    // Upon releasing the click stop dragging
    document.removeEventListener('mousemove', mouseMove);

    // document.removeEventListener('mouseup', mouseUp);
    // document.removeEventListener('mousedown', mouseDown);
    // console.log("NO MORE DRAGGING");
}

function repositionIcons() {
    // Elements for resizing
    // const bckgnd = document.getElementById("mainBackgroundImg");
    // const bckgnd = baseImg;
    const aboutmeImg = document.getElementById("aboutmeImg");

    // When window resizes, get height of background img and change icon size correspondingly
    const baseImgWidth = baseImg.offsetWidth;
    const baseImgHeight = baseImg.offsetHeight;
    // console.log("background size: "+baseImgWidth+" "+baseImgHeight);
    aboutmeImg.style.width = (baseImgHeight * imgRatio) + "px";
    aboutmeImg.style.height = (baseImgHeight * imgRatio) + "px";
    // console.log("about me: "+aboutmeImg.offsetWidth+" "+aboutmeImg.offsetHeight);

    // const imgWidth = baseImg.width;
    // const imgHeight = baseImg.height;
    // console.log("img size: "+imgWidth+" x "+imgHeight);
    const aboutmeLocation = document.getElementById("linkIcon_aboutme");
    const location = aboutmeLocation.getBoundingClientRect();
    // console.log("icon at: ("+location.top+","+location.left+")");

    // const baseImgX = baseImg.getBoundingClientRect().left;
    // const baseImgY = baseImg.getBoundingClientRect().top;
    // console.log("background at: ("+baseImgX+","+baseImgY+")");
    

}


// Make sure to keep new boundary area, and icons' appropriate size
// and location on refresh & resize of window
window.addEventListener('load', setBoundary);
window.addEventListener('load', repositionIcons);
window.addEventListener('resize', setBoundary);
window.addEventListener('resize', repositionIcons);

/*  TODO: stick icon coordinate according to background image ratio
            do not let icon move out of background image (tweak more)
            CANNOT DRAG OR CLICK ON MOBILE WEB
*/