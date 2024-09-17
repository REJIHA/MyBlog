/*
*/

const maxRepeat = 20;
const tailRepeat = 50;
let idNum = 0;

// Add more to its tail so it looks like a linen of elements
function tailElement(elementId) {
    var elem = document.getElementById(elementId)
    var tailDiv = document.createElement('div');
    document.body.appendChild(tailDiv);
    
    for (let i=0; i<tailRepeat; i++) {
        var cloneElem = elem.cloneNode(true);
        cloneElem.id = elem.id + idNum;
        copyElemStyle(cloneElem);
        cloneElem.style.left = elem.offsetLeft + 'px';
        cloneElem.style.top = (elem.offsetTop + 100) + 'px';
        tailDiv.appendChild(cloneElem);
        // document.body.appendChild(cloneElem);
        elem = cloneElem;
    }
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
        cloneElem.style.left = (elem.offsetLeft + 100) + 'px';

        document.body.appendChild(cloneElem);
        elem = cloneElem;

        // tailElement(elem.id);
    }
}

// To keep same styles of cloned elements
function copyElemStyle(elem) {
    elem.style.zIndex = '-1';
    elem.style.position = 'absolute';
    elem.style.top = '0';
    elem.style.width = '100px';

    if (idNum % 2 == 0) {
        // current idNum is even
        elem.style.animation = 'move_down 2s linear infinite';
    } else {
        // current idNum is odd
        elem.style.animation = 'move_up 2s linear infinite';
    }
}


cloneElement("warning");
// tailElement("warning");

/*
    z-index: -1;
    position: absolute;
    width: 100px;
    top: 0;
    left: 0;
    animation: move_down 2s linear infinite;
    animation-iteration-count: infinite;
*/