/*
First, this javascript code enables dragging of icon elements from myWebsite's
index.html. This can happen from saving xy coordinate object of cursor upon
clicking on thhe icon elements.
Second, it saves screen size as object and uses it to calculate boundary area
of icon elements and saves that also as object. By this icon elements move
and be repositioned only inside this area.
Third, it keeps boolean value of if the windows upon clicking icons have
opened or not. If they are open, on clicking close button closes that window.
Fourth, it also does miscellaneous things like calculating toolbar size from
screen size and switching photos from clicking the button.
*/

// Global variables for draggable icons
const bkgdImg = document.getElementById("mainBackgroundImg");
const imgRatio = 0.15;
const boundarySize = parseInt(window.getComputedStyle(bkgdImg).getPropertyValue("padding"));
let dragElem = null;

// Global variables for aboutme window
const aboutmeWindow = document.getElementById("aboutmeWindow");
const popupText = document.getElementById("popupText");
let isAboutmeOpen = false;
let isAboutmeEnlarged = false;
let isPopupOpen = false;
let photoSwitched = false;

// Global variables for emailme window
const emailmeWindow = document.getElementById("emailmeWindow");
let isEmailmeOpen = false;

// Global variables for toolbar
let startButtonOpen = false;
let contactButtonOpen = false;

// Global variables for turn offs
let animationOn = true;
let dragOn = true;

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
    if ((elem != aboutmeWindow) && (elem != emailmeWindow)) {
        // Given the icon element from html and xy coordinates, move only inside the boundary
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
    } else {
        // The dragging element is aboutme or emailme window that should drag without boundary but within window size
        elem.style.left = newX + 'px';
        elem.style.top = newY + 'px';
    }
    
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
    // Resize toolbar according to current background image width
    resizeToolbar();
    // Save new background size & xy coordinates
    saveBackgroundInfo();

    // Elements for resizing (ADD NEW ID HERE)
    const iconImgs = ["aboutmeIconImg", "skillsIconImg", "projectsIconImg", "resumeIconImg", "linkpageIconImg"];
    const bkgdImgHeight = bkgdImg.offsetHeight;
    // console.log("background size: "+bkgdImgWidth+" "+bkgdImgHeight);
    for (let i=0; i<iconImgs.length; i++) {
        curr = iconImgs[i];
        currIcon =document.getElementById(curr);

        currIcon.style.width = (bkgdImgHeight * imgRatio) + "px";
        currIcon.style.height = (bkgdImgHeight * imgRatio) + "px";
        // console.log("about me: "+currIcon.offsetWidth+" "+currIcon.offsetHeight);
    }

    // const aboutmeIconImg = document.getElementById("aboutmeIconImg");
    // // Get height of background img and change icon size correspondingly
    // const bkgdImgHeight = bkgdImg.offsetHeight;
    // // console.log("background size: "+bkgdImgWidth+" "+bkgdImgHeight);
    // aboutmeIconImg.style.width = (bkgdImgHeight * imgRatio) + "px";
    // aboutmeIconImg.style.height = (bkgdImgHeight * imgRatio) + "px";
    // // console.log("about me: "+aboutmeIconImg.offsetWidth+" "+aboutmeIconImg.offsetHeight);

    // After resizing the icon related to window size, calculate boundary area
    // (why it's called here is because it needs changed icon size)
    setBoundary();


    // Change location of icon in relation to current window size (ADD NEW ID HERE)
    const iconsAt = ["linkIcon_aboutme", "linkIcon_skills", "linkIcon_projects", "linkIcon_resume", "linkIcon_linkpage"];
    for (let i=0; i<iconsAt.length; i++) {
        curr = iconsAt[i];
        currElem = document.getElementById(curr);
        currElemRect = currElem.getBoundingClientRect();

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

    // const currElem = document.getElementById("linkIcon_aboutme");
    // const currElemRect = currElem.getBoundingClientRect();

    // // Get current location of icon
    // currX = currElemRect.left;
    // currY = currElemRect.top;
    // // console.log("currently at: "+currX+","+currY);

    // // Calculate & change coordinates
    // moveX = (winSize.newWidth*currX) / winSize.oldWidth;
    // moveY = currY + (winSize.newY - winSize.oldY);
    // // console.log("NEW COORDINATES: "+moveX+","+moveY);
    // moveInsideBoundary(currElem, moveX, moveY);
}

function popupAboutmeWindow() {
    if (isPopupOpen == false) {
        // Popup is hidden right now, show
        popupText.style.visibility = 'visible';
        isPopupOpen = true;
    } else {
        // Popup is visible right now, hide
        popupText.style.visibility = 'hidden';
        isPopupOpen = false;
    }
}

function enlargeAboutmeWindow() {
    if (isAboutmeEnlarged == false) {
        // The window is on default size, enlarge
        aboutmeWindow.style.width = '100%';
        isAboutmeEnlarged = true;
    } else {
        // The window is on full size, shrink
        aboutmeWindow.style.width = '70%';
        isAboutmeEnlarged = false;
    }
}

function showAboutmeWindow() {
    if (isAboutmeOpen == false) {
        // The window is hidden, open
        aboutmeWindow.style.visibility = 'visible';
        aboutmeWindow.style.left = '50%';
        isAboutmeOpen = true;
    } else {
        // The window is open, close
        aboutmeWindow.style.visibility = 'hidden';
        isAboutmeOpen = false;
        // In case window moved around, reset location
        aboutmeWindow.style.top = '10%';
        // In case help button was clicked, reset
        popupText.style.visibility = 'hidden';
        isPopupOpen = false;
        // In case enlarge button was clicked, reset
        aboutmeWindow.style.width = '70%';
        isAboutmeEnlarged = false;
    }
}

// Dynamically change size of toolbar according to current background image size
function resizeToolbar() {
    toolbarElem = document.getElementById("toolbar");
    bkgdWidth = bkgdImg.width;
    toolbarElem.style.width = bkgdWidth+'px';
}

function switchPhoto() {
    portraitElem = document.getElementById("myPortrait");
    if (photoSwitched == false) {
        // Current photo is pixel gif
        portraitElem.src = "./resources/img/myWebsite/real_me.jpeg"
        photoSwitched = true;
    } else {
        // Current photo is real jpeg
        if (animationOn == true) {
            // Animation option is on
            portraitElem.src = "./resources/img/myWebsite/pixel_me.gif"
        } else {
            // Animation option is off
            portraitElem.src = "./resources/img/myWebsite/pixel_me.png"
        }
        
        photoSwitched = false;
    }
}

function showEmailmeWindow() {
    if (isEmailmeOpen == false) {
        // The window is hidden, open
        emailmeWindow.style.visibility = 'visible';
        emailmeWindow.style.left = '50%';
        isEmailmeOpen = true;
    } else {
        // The window is open, close
        emailmeWindow.style.visibility = 'hidden';
        isEmailmeOpen = false;
    }
}

function clickToolbarButton(elem) {
    toolbarButton = document.getElementById(elem);
    // Check which toolbar button is clicked, then change visibility
    if (elem == "start_dropup") {
        startButtonOpen = changeDisplay(toolbarButton, startButtonOpen);
    } else if (elem == "contact_dropup") {
        contactButtonOpen = changeDisplay(toolbarButton, contactButtonOpen);
    }
}

function changeDisplay(elem, bool) {
    if (bool == false) {
        // Current element's display is hidden, open
        elem.style.display = 'block';
        return true;
    } else {
        // Current element's display is open, close
        elem.style.display = 'none';
        return false;
    }
}

function disableAnimation(elem) {
    // Disable animation & change gif to still images
    // titleMoving = document.getElementById("pageTitle");
    const animations = document.getAnimations();
    gifImg = document.getElementById("myPortrait");
    if (animationOn == true) {
        // Animations are on; turn them off
        animations.forEach(animation => {
            animation.pause();
        });
        // Change pixel me portrait from gif to png
        gifImg.src = "./resources/img/myWebsite/pixel_me.png";
        
        animationOn = false;
        changeColorOfButton(elem, animationOn);
    } else {
        // Animations are off; turn them on
        animations.forEach(animation => {
            animation.play();
        });
        // Change pixel me portrait from png to gif
        gifImg.src = "./resources/img/myWebsite/pixel_me.gif";

        animationOn = true;
        changeColorOfButton(elem, animationOn);
    }
}

function disableDrag(elem) {
    // Disable drag and fix location of icons
    console.log("DISABLE DRAG");
}

function changeColorOfButton(elem, bool) {
    // Signify if the option is on or off by color
    curr_button = document.getElementById(elem);
    if (bool == true) {
        curr_button.style.backgroundColor = '#55abaa';
    } else {
        curr_button.style.backgroundColor = '#448685'; 
    }
    
}

// On load, erase texts in email input fields
document.getElementById("forms").reset();

// On loading and resizing of window, change icons' size and location too
window.addEventListener('load', repositionIcons);
window.addEventListener('resize', repositionIcons);