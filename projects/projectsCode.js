/*
    This...
 */


/*
    GLOBAL VARIABLES
*/
const progElem = document.getElementById("programming");
const progElem_header = document.getElementById("programming_header");
const progElem_content = document.getElementById("programming_contents");
const artElem = document.getElementById("art");
const artElem_header = document.getElementById("art_header");
const artElem_content = document.getElementById("art_contents");


/*
    GETTER CODE
*/
function getWhichOne(theOne) {
    let elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content;
    // Get the correct one to animate
    if (theOne == "programming") {
        elem = progElem;
        elem_header = progElem_header;
        elem_content = progElem_content;
        otherElem = artElem;
        otherElem_header = artElem_header;
        otherElem_content = artElem_content;
    } else if (theOne == "art") {
        elem = artElem;
        elem_header = artElem_header;
        elem_content = artElem_content;
        otherElem = progElem;
        otherElem_header = progElem_header;
        otherElem_content = progElem_content;
    } else {
        return;
    }
    return [elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content];
}


/*
    ON HOVER CODE
*/
function expandAnimation(thisOne) {
    let [elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content] = getWhichOne(thisOne);

    // Selected mouseover one gets to be exanded, while other one shrinks
    elem.style.animation = "expand 0.5s forwards";
    otherElem.style.animation = "shrink 0.5s forwards";
}

function resetAnimation(thisOne) {
    let [elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content] = getWhichOne(thisOne);

    // Reset animations & stylings on mouseleave
    elem.style.animation = "reset_expand 0.5s forwards";
    elem.style.width = '50%';
    elem.style.writingMode = null;
    elem_header.style.display = 'block'
    elem_content.style.display = 'none';

    otherElem.style.animation = "reset_shrink 0.5s forwards";
    otherElem.width = '50%';
    otherElem.style.writingMode = null;
    otherElem_header.style.display = 'block';
    otherElem_content.style.display = 'none';
}


/*
    ON CLICK CODE
*/
function clickSection(thisOne) {
    let [elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content] = getWhichOne(thisOne);

    if (elem.style.width == '90%') {
        // The section has been expanded; close
        resetAnimation(thisOne);
        //  Reassign mouseover & mouseleave
        elem.onmouseover = function() {expandAnimation(this.id)};
        elem.onmouseleave = function() {resetAnimation(this.id)};
        otherElem.onmouseover = function() {expandAnimation(this.id)};
        otherElem.onmouseleave = function() {resetAnimation(this.id)};
    } else {
        // On click, expand to show contents inside
        elem.style.animation = "wholePage 0.5s forwards";
        elem.style.width = '90%';
        elem.style.writingMode = null;
        elem_header.style.display = 'none';
        elem_content.style.display = 'block';

        otherElem.style.animation = "subPage 0.5s forwards";
        otherElem.style.width = '10%';
        otherElem.style.writingMode = 'vertical-lr';
        otherElem.style.textOrientation = 'upright';
        otherElem_header.style.display = 'block';
        otherElem_content.style.display = 'none';

        // Remove mouseover & mouseleave
        elem.onmouseover = null;
        elem.onmouseleave = null;
        otherElem.onmouseover = null;
        otherElem.onmouseleave = null;
    }
}