/*
First, this javascript code keeps icons inside windows xp style background in
appropriate ratio to background, so when the user resizes or refreshes the
window or moves the icon, they stay relative to changed aspects.
*/

const bkgdImg = document.getElementById("mainBackgroundImg");
const imgRatio = 0.15;
const boundarySize = parseInt(window.getComputedStyle(bkgdImg).getPropertyValue("padding"));
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

// Background window size & xy coordinates
var winSize = {
    oldWidth: 0,
    oldHeight: 0,
    newWidth: 0,
    newHeight: 0,

    oldX: 0,
    oldY: 0,
    newX: 0,
    newY: 0,
};

function setBoundary() {
    // Get the changed icon size (base -> aboutme icon)
    computedWidth = document.getElementById("linkIcon_aboutme").clientWidth;
    computedHeight = document.getElementById("linkIcon_aboutme").clientHeight;
    // console.log("ICON SIZE w,h: "+computedWidth+","+computedHeight);

    // Set boundary of draggable icons
    boundary.top = bkgdImg.offsetTop + boundarySize;
    boundary.bot = boundary.top + bkgdImg.offsetHeight - (computedHeight + boundarySize*2);
    boundary.left = bkgdImg.offsetLeft + boundarySize;
    boundary.right = boundary.left + bkgdImg.offsetWidth - (computedWidth + boundarySize*2);
    // console.log("BOUNDARY TBLR: "+boundary.top+","+boundary.bot+","+boundary.left+","+boundary.right);
}

function moveInsideBoundary(elem, newX, newY) {
    // Given the element from html and xy coordinates, move only inside the boundary
    if ((boundary.left <= newX) && (newX <= boundary.right)) {
        // New x coordinate is inside the moveabe area
        elem.style.left = newX + 'px';
    } else if (boundary.left > newX) {
        // New x coordinate is too left, stop going further
        elem.style.left = boundary.left + 'px';
    } else if (boundary.right > newX) {
        // New x coordinate is too right, stop going further
        elem.style.left = boundary.right + 'px';
    } else {
        // Icon ended up outside of boundary... put it back inside
        elem.style.left = boundary.right + 'px';
    }

    if ((boundary.top <= newY) && (newY <= boundary.bot)) {
        // New y coordinate is inside the moveable area
        elem.style.top = newY + 'px';
    } else if (boundary.top > newY) {
        // New y coordinate is too high, stop going further
        elem.style.top = boundary.top + 'px';
    } else if (boundary.bot > newY) {
        // New y coordinate is too low, stop going further
        elem.style.top = boundary.bot + 'px';
    } else {
        // Icon ended up outside of boundary... put it back inside
        elem.style.top = boundary.bot + 'px';
    }
    // console.log("arrived at: ("+dragElem.style.left+","+dragElem.style.top+")");
}

function saveBackgroundInfo() {
    var computedBkgd = window.getComputedStyle(bkgdImg);
    const backRect = bkgdImg.getBoundingClientRect();

    // Below calculation gives size without padding, border, and margins
    currWidth = bkgdImg.clientWidth - (parseFloat(computedBkgd.paddingLeft) + parseFloat(computedBkgd.paddingRight));
    currHeight = bkgdImg.clientHeight - (parseFloat(computedBkgd.paddingTop) + parseFloat(computedBkgd.paddingBottom));
    
    // Below gives xy coordinates of current background window location
    currX = Math.round(backRect.left);
    currY = Math.round(backRect.top);

    // Start with initializing/saving window size
    if ((winSize.oldWidth == 0) && (winSize.oldHeight == 0)) {
        // Initially the old size is original size
        winSize.oldWidth = bkgdImg.naturalWidth;
        winSize.oldHeight = bkgdImg.naturalHeight;
        winSize.newWidth = currWidth;
        winSize.newHeight = currHeight;
        // console.log("INIT: "+JSON.stringify(winSize));
    } else {
        // Keep previous size as old and save changed size as new
        winSize.oldWidth = winSize.newWidth;
        winSize.oldHeight = winSize.newHeight;
        winSize.newWidth = currWidth;
        winSize.newHeight = currHeight;
        // console.log("OLD N NEW: "+JSON.stringify(winSize));
    }
    // Next initialize/save xy coordinates of window
    if ((winSize.oldX == 0) && (winSize.oldY == 0)) {
        // Initially the old xy is current location
        winSize.oldX = currX;
        winSize.oldY = currY;
        winSize.newX = currX;
        winSize.newY = currY;
        // console.log("INIT: "+JSON.stringify(winSize));
    } else {
        // Keep previous xy coordinates as old and save new location as new
        winSize.oldX = winSize.newX;
        winSize.oldY = winSize.newY;
        winSize.newX = currX;
        winSize.newY = currY;
        // console.log("OLD N NEW: "+JSON.stringify(winSize));
    }
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

    // Before moving the element, check it's inside the boundary and then move
    moveToX = (dragElem.offsetLeft - coordinate.newX);
    moveToY = (dragElem.offsetTop - coordinate.newY);
    moveInsideBoundary(dragElem, moveToX, moveToY);
}

function mouseUp(e) {
    // Upon releasing the click stop dragging
    document.removeEventListener('mousemove', mouseMove);
    // console.log("NO MORE DRAGGING");
}

function repositionIcons() {
    // Save new background size & xy coordinates
    saveBackgroundInfo();

    // Elements for resizing
    // TODO: for all icons!
    // const iconImgs = ["aboutmeImg"];
    // for (let i=0; i<iconImgs.length; i++) {
    //     curr = iconImgs[i];
    // }
    const aboutmeImg = document.getElementById("aboutmeImg");

    // Get height of background img and change icon size correspondingly
    const bkgdImgHeight = bkgdImg.offsetHeight;
    // console.log("background size: "+bkgdImgWidth+" "+bkgdImgHeight);
    aboutmeImg.style.width = (bkgdImgHeight * imgRatio) + "px";
    aboutmeImg.style.height = (bkgdImgHeight * imgRatio) + "px";
    // console.log("about me: "+aboutmeImg.offsetWidth+" "+aboutmeImg.offsetHeight);

    // After resizing the icon related to window size, calculate boundary area
    // (why it's called here is because it needs changed icon size)
    setBoundary();


    // Change location of icon in relation to current window size
    const currElem = document.getElementById("linkIcon_aboutme");
    const currElemRect = currElem.getBoundingClientRect();
    
    // const iconsAt = ["linkIcon_aboutme"];
    // for (let i=0; i<iconsAt.length; i++) {
    //      curr = iconsAt[i];
    // }


    // Get current location of icon
    currX = currElemRect.left;
    currY = currElemRect.top;
    // console.log("currently at: "+currX+","+currY);

    // Calculate & change coordinates
    moveX = (winSize.newWidth*currX) / winSize.oldWidth;
    moveY = currY + (winSize.newY - winSize.oldY);
    // console.log("NEW COORDINATES: "+moveX+","+moveY);
    moveInsideBoundary(currElem, moveX, moveY);
}

// On loading and resizing of window, change icons' size and location too
window.addEventListener('load', repositionIcons);
// window.addEventListener('load', setBoundary);
window.addEventListener('resize', repositionIcons);
// window.addEventListener('resize', setBoundary);


/*  TODO: CANNOT DRAG OR CLICK ON MOBILE WEB
        as more icons are added use loops to make all icons resized & repositioned
        on double click open icon pages
*/