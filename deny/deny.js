/*
This javascript has functions to clone element in index.html to repeat across
the page.
*/

const warningDiv = document.getElementById("warnings");
const warningSize = 150;
const distancePX = 200;
let maxRepeat = 0;
let idNum = 0;

// Set up maxRepeat depending on current screen size and clone warning elements
function setup() {
    const width = window.innerWidth;
    maxRepeat = (width / (distancePX + warningSize)) + 1;


    cloneElement("warning");
}

// Clone the element so they repeat across the page
function cloneElement(elementId) {
    var elem = document.getElementById(elementId);

    while (idNum <= maxRepeat) {
        idNum++;
        
        // console.log("elem: "+elem.id);
        var cloneElem = elem.cloneNode(true);
        cloneElem.id = "warning"+idNum;
        copyElemStyle(cloneElem);
        // console.log('LEFT: '+elem.offsetLeft);
        cloneElem.style.left = (elem.offsetLeft + distancePX) + 'px';

        warningDiv.appendChild(cloneElem);
        elem = cloneElem;
    }
}

// To keep same styles of cloned elements
function copyElemStyle(elem) {
    elem.style.width = '150px';
    elem.style.animation = 'size_updown 1s infinite ease-in-out alternate';
}

setup();