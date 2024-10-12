/*
    This...
 */


/*
    GLOBAL VARIABLES
*/
const progElem = document.getElementById("programming");
const progElem_header = document.getElementById("programming_header");
const progElem_img = document.getElementById("programmingImg");
const progElem_caption = document.getElementById("programming_caption");
const progElem_content = document.getElementById("programming_contents");

const artElem = document.getElementById("art");
const artElem_header = document.getElementById("art_header");
const artElem_img = document.getElementById("artImg");
const artElem_caption = document.getElementById("art_caption");
const artElem_content = document.getElementById("art_contents");

var currentClicked;
var currentShowing;

/*
    TITLE CODE
*/
function titleClick() {
    // When title is clicked, it resets expand/shrink of headers
    if (currentClicked != null) {
        let [elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content,
        elem_img, otherElem_img, elem_caption, otherElem_caption] = getWhichOne(currentClicked);

        // Reset the sections in case they were expanded
        resetAnimation(currentClicked);
        //  Reassign mouseover & mouseleave
        elem.onmouseover = function() {expandAnimation(this.id)};
        elem.onmouseleave = function() {resetAnimation(this.id)};
        otherElem.onmouseover = function() {expandAnimation(this.id)};
        otherElem.onmouseleave = function() {resetAnimation(this.id)};
    }
}


/*
    HEADER GETTER CODE
*/
function getWhichOne(theOne) {
    let elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content,
        elem_img, otherElem_img, elem_caption, otherElem_caption;
    // Get the correct one to animate
    if (theOne == "programming") {
        elem = progElem;
        elem_header = progElem_header;
        elem_img = progElem_img;
        elem_caption = progElem_caption;
        elem_content = progElem_content;
        otherElem = artElem;
        otherElem_header = artElem_header;
        otherElem_img = artElem_img;
        otherElem_caption = artElem_caption;
        otherElem_content = artElem_content;
    } else if (theOne == "art") {
        elem = artElem;
        elem_header = artElem_header;
        elem_img = artElem_img;
        elem_caption = artElem_caption;
        elem_content = artElem_content;
        otherElem = progElem;
        otherElem_header = progElem_header;
        otherElem_img = progElem_img;
        otherElem_caption = progElem_caption;
        otherElem_content = progElem_content;
    } else {
        return;
    }
    return [elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content,
            elem_img, otherElem_img, elem_caption, otherElem_caption];
}


/*
    HEADER ON HOVER CODE
*/
function expandAnimation(thisOne) {
    let [elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content,
        elem_img, otherElem_img, elem_caption, otherElem_caption] = getWhichOne(thisOne);

    // Selected mouseover one gets to be exanded, while other one shrinks
    elem.style.animation = "expand 0.5s forwards";
    otherElem.style.animation = "shrink 0.5s forwards";
}

function resetAnimation(thisOne) {
    let [elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content,
        elem_img, otherElem_img, elem_caption, otherElem_caption] = getWhichOne(thisOne);

    // Reset animations & stylings on mouseleave
    elem.style.animation = "reset_expand 0.5s forwards";
    elem.style.width = '50%';
    elem.style.writingMode = null;
    elem_header.style.display = 'block'
    elem_header.style.transform = 'translateY(20vh)';
    elem_img.style.width = '30%';
    elem_img.style.margin = '10px';
    elem_caption.style.display = 'block';
    elem_content.style.display = 'none';

    otherElem.style.animation = "reset_shrink 0.5s forwards";
    otherElem.width = '50%';
    otherElem.style.writingMode = null;
    otherElem_header.style.display = 'block';
    otherElem_header.style.transform = 'translateY(20vh)';
    otherElem_img.style.width = '30%';
    otherElem_img.style.margin = '10px';
    otherElem_caption.style.display = 'block';
    otherElem_content.style.display = 'none';
}


/*
    HEADER ON CLICK CODE
*/
function clickSection(thisOne) {
    let [elem, otherElem, elem_header, otherElem_header, elem_content, otherElem_content,
        elem_img, otherElem_img, elem_caption, otherElem_caption] = getWhichOne(thisOne);
    currentClicked = thisOne;

    // On click, expand to show contents inside
    elem.style.animation = "wholePage 0.5s forwards";
    elem.style.width = '90%';
    elem.style.writingMode = null;
    elem_header.style.display = 'none';
    elem_content.style.display = 'block';
    elem_content.style.animation = "fadeIn 0.5s forwards";

    otherElem.style.animation = "subPage 0.5s forwards";
    otherElem.style.width = '10%';
    otherElem.style.writingMode = 'vertical-lr';
    otherElem.style.textOrientation = 'upright';
    otherElem_header.style.display = 'block';
    otherElem_header.style.transform = 'none';
    otherElem_img.style.width = '20px';
    otherElem_img.style.margin = '0';
    otherElem_caption.style.display = 'inline-block';
    otherElem_content.style.display = 'none';

    // Remove mouseover & mouseleave
    elem.onmouseover = null;
    elem.onmouseleave = null;
    otherElem.onmouseover = null;
    otherElem.onmouseleave = null;
}


/*
    CONTENT CODE
*/
function showContent(header, content, color) {
    let showContent = document.getElementById(content);
    let showHeader = document.getElementById(header)
    if ((showContent.style.display == '') || (showContent.style.display == 'none')) {
        // Show content
        showContent.style.display = 'block';
        showContent.style.animation = "fadeIn 0.5s forwards";
        showHeader.style.color = '#ffffff90';
        showHeader.style.backgroundColor = color;
    } else {
        // Hide content
        showContent.style.display = 'none';
        showHeader.style.color = color;
        showHeader.style.backgroundColor = '';
    }
}

function showInfo(button, fromWhere) {
    let contentInfoElem;
    let contentImgElem;
    let contentTextElem;

    // Decide which category contents is showing
    // TODO: add rest of category (animation, 3d modeling, prog2024, prog2021, prog2020)
    if (fromWhere == 'illustration') {
        contentInfoElem = document.getElementById("illustrationContentInfo");
        contentImgElem = document.getElementById("illustrationContentImg");
        contentTextElem = document.getElementById("illustrationContentText");
    }

    // Decide which button was clicked
    // ADD NEW PROJECTS HERE
    // TODO: add rest of info
    switch (button) {
        case 'hsr_sparkle':
            contentImgElem.src = "../resources/img/projects/art/HSR_Sparkle.png";
            contentImgElem.alt = "HSR_Sparkle_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Honkai: Star Rail - Sparkle<br><b>Date:</b>&ensp;6/24/2024<br><b>Medium:</b>&ensp;Digital - Medibang Paint<br>> Fan art of a character 'Sparkle' from game 'Honkai: Star Rail'.<br>";
            break;
        case 'besties':
            contentImgElem.src = "../resources/img/projects/art/besties_all_universe.png";
            contentImgElem.alt = "besties_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;We Are Besties In Every Universe<br><b>Date:</b>&ensp;3/5/2024<br><b>Medium:</b>&ensp;Digital - Medibang Paint<br>> Animalification of my best friends.<br>";
            break;
    }

    if ((contentInfoElem.style.display=="") || (contentInfoElem.style.display=="none") || (currentShowing != button)) {
        // If the content info part is not shown or it's showing something but different button is clicked, show correspondingly
        contentInfoElem.style.display = 'block';
        contentInfoElem.style.animation = "fadeIn 0.5s forwards";
        currentShowing = button;
    } else {
        // The same button was clicked twice, hide
        contentInfoElem.style.display = 'none';
    }
}