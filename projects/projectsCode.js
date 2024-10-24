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

var currImgID;

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
// This function shows section (either programming or art) depending on which was clicked
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
// This function shows content depending on which category button is clicked
function showContent(header, content, slideshow, color) {
    let showContent = document.getElementById(content);
    let showHeader = document.getElementById(header);
    let hideSlideshow = document.getElementById(slideshow);
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
        hideSlideshow.style.display = 'none';
    }
}

// This function shows info from content depending on which category it's from
function showInfo(button, fromWhere) {
    let contentInfoElem;
    let contentImgElem;
    let contentTextElem;
    let slideshowImgs;
    let thisPageNum;

    // Decide which category contents is showing
    // TODO: add rest of category (animation, 3d modeling, prog2024, prog2021, prog2020)
    if (fromWhere == 'illustration') {
        contentInfoElem = document.getElementById("illustrationContentInfo");
        contentImgElem = document.getElementById("illustrationContentImg1");
        contentTextElem = document.getElementById("illustrationContentText");
        slideshowImgs = document.getElementsByClassName("contentImg_ill");
        thisPageNum = document.getElementById("pageNum_ill")

    } else if (fromWhere == 'animation') {
        contentInfoElem = document.getElementById("animationContentInfo");
        contentImgElem = document.getElementById("animationIframe");
        contentTextElem = document.getElementById("animationContentText");
    }


    // Decide which button was clicked
    // ADD NEW PROJECTS HERE
    // TODO: add rest of info

    const parentDiv = document.querySelector(".slideshow-container");
    // Reset slideshow if it was used (default is one image or video)
    if (slideshowImgs != null) {
        removeElemInDiv(slideshowImgs);
    }
    switch (button) {
        /*
        ILLUSTRATION PROJECTS
        */
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
        case 'sticker_sheets':
            thisPageNum.innerHTML = "1/4";
            contentImgElem.src = "../resources/img/projects/art/animalfrens_01_hello.png";
            contentImgElem.alt = "01_hello_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Sticker Sheets<br><b>Date:</b>&ensp;September 2022 - June 2023<br><b>Medium:</b>&ensp;Digital - Medibang Paint<br>> Some of the sticker sheet designs I made.<br>";
            // Second image
            let secondImg_stickersheet = document.createElement('img');
            secondImg_stickersheet.classList.add('contentImg');
            secondImg_stickersheet.classList.add('contentImg_ill');
            secondImg_stickersheet.id = 'illustrationContentImg2';
            secondImg_stickersheet.src = "../resources/img/projects/art/animalfrens_02_halloween.png";
            secondImg_stickersheet.alt = "02_halloween_img";
            secondImg_stickersheet.style.display = 'none';
            // Third image
            let thirdImg_stickersheet = document.createElement('img');
            thirdImg_stickersheet.classList.add('contentImg');
            thirdImg_stickersheet.classList.add('contentImg_ill');
            thirdImg_stickersheet.id = 'illustrationContentImg3';
            thirdImg_stickersheet.src = "../resources/img/projects/art/animalfrens_06_flower.png";
            thirdImg_stickersheet.alt = "06_flower_img";
            thirdImg_stickersheet.style.display = 'none';
            // Fourth image
            let fourthImg_stickersheet = document.createElement('img');
            fourthImg_stickersheet.classList.add('contentImg');
            fourthImg_stickersheet.classList.add('contentImg_ill');
            fourthImg_stickersheet.id = 'illustrationContentImg4';
            fourthImg_stickersheet.src = "../resources/img/projects/art/animalfrens_07_gamer.png";
            fourthImg_stickersheet.alt = "07_gamer_img";
            fourthImg_stickersheet.style.display = 'none';
            // Add all images to container
            parentDiv.append(secondImg_stickersheet, thirdImg_stickersheet, fourthImg_stickersheet);
            break;
        case 'char_concept':
            thisPageNum.innerHTML = "1/5";
            contentImgElem.src = "../resources/img/projects/art/Kwag_Hyoseo_Cupid.jpg";
            contentImgElem.alt = "cupid_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Character Concept<br><b>Date:</b>&ensp;11/20/2021<br><b>Medium:</b>&ensp;Digital - Medibang Paint, Stop Motion Studio<br>> Character concept project from animation class. I chose to design Cupid, Persephone, and Hades in modern world with opposite sex. I didn't get to finish the third turnaround.<br>";
            // Second image
            let secondImg_charconcept = document.createElement('img');
            secondImg_charconcept.classList.add('contentImg');
            secondImg_charconcept.classList.add('contentImg_ill');
            secondImg_charconcept.id = 'illustrationContentImg2';
            secondImg_charconcept.src = "../resources/img/projects/art/Kwag_Hyoseo_Cupid.gif";
            secondImg_charconcept.alt = "cupid_rotate_gif";
            secondImg_charconcept.style.display = 'none';
            // Third image
            let thirdImg_charconcept = document.createElement('img');
            thirdImg_charconcept.classList.add('contentImg');
            thirdImg_charconcept.classList.add('contentImg_ill');
            thirdImg_charconcept.id = 'illustrationContentImg3';
            thirdImg_charconcept.src = "../resources/img/projects/art/Kwag_Hyoseo_Percy.jpg";
            thirdImg_charconcept.alt = "persephone_img";
            thirdImg_charconcept.style.display = 'none';
            // Fourth image
            let fourthImg_charconcept = document.createElement('img');
            fourthImg_charconcept.classList.add('contentImg');
            fourthImg_charconcept.classList.add('contentImg_ill');
            fourthImg_charconcept.id = 'illustrationContentImg4';
            fourthImg_charconcept.src = "../resources/img/projects/art/Kwag_Hyoseo_Percy.gif";
            fourthImg_charconcept.alt = "persephone_rotate_gif";
            fourthImg_charconcept.style.display = 'none';
            // Fifth image
            let FifthImg_charconcept = document.createElement('img');
            FifthImg_charconcept.classList.add('contentImg');
            FifthImg_charconcept.classList.add('contentImg_ill');
            FifthImg_charconcept.id = 'illustrationContentImg5';
            FifthImg_charconcept.src = "../resources/img/projects/art/Kwag_Hyoseo_Heidi.jpg";
            FifthImg_charconcept.alt = "hades_img";
            FifthImg_charconcept.style.display = 'none';
            // Add all images to container
            parentDiv.append(secondImg_charconcept, thirdImg_charconcept, fourthImg_charconcept, FifthImg_charconcept);
            break;
        case 'garden':
            contentImgElem.src = "../resources/img/projects/art/Garden.gif";
            contentImgElem.alt = "garden_gif";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Garden<br><b>Date:</b>&ensp;2/18/2021<br><b>Medium:</b>&ensp;Digital - Photoshop, Clip Studio<br>> Mixed media class project. Used copyright-free photo mixed with digital animation.<br>";
            break;
        case 'alone_together':
            thisPageNum.innerHTML = "1/2";
            contentImgElem.src = "../resources/img/projects/art/Alone.jpg";
            contentImgElem.alt = "alone_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Alone/ Together<br><b>Date:</b>&ensp;12/10/2019<br><b>Medium:</b>&ensp;Digital - Clip Studio<br>> Illustration class project. I represented the idea with me alone in the room, but together in game (League of Legends). My inspiration came from 'Where's Wally?' artist.<br>";
            // Second image
            let secondImg_alonetogether = document.createElement('img');
            secondImg_alonetogether.classList.add('contentImg');
            secondImg_alonetogether.classList.add('contentImg_ill');
            secondImg_alonetogether.id = 'illustrationContentImg2';
            secondImg_alonetogether.src = "../resources/img/projects/art/Together.jpg";
            secondImg_alonetogether.alt = "together_img";
            secondImg_alonetogether.style.display = 'none';
            // Add all images to container
            parentDiv.append(secondImg_alonetogether);
            break;
        case 'propaganda':
            contentImgElem.src = "../resources/img/projects/art/HyoseoK_Wallpaper.jpg";
            contentImgElem.alt = "propaganda_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Propaganda<br><b>Date:</b>&ensp;11/7/2019<br><b>Medium:</b>&ensp;Watercolor, Digital - Photoshop<br>> Illustration class project. We had to choose one polarizing topic (I chose abortion) and make repetitive pattern into a wallpaper.<br>";
            break;
        case 'newyorker':
            contentImgElem.src = "../resources/img/projects/art/HyoseoK_NewYorker_Final.jpg";
            contentImgElem.alt = "newyorker_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;New Yorker Magazine<br><b>Date:</b>&ensp;10/22/2019<br><b>Medium:</b>&ensp;Watercolor, Digital - Photoshop<br>> Illustration class project. We had to choose one social issue (I chose school shootings) and add New Yorker magazine's format.<br>";
            break;
        case 'comics':
            thisPageNum.innerHTML = "1/2";
            contentImgElem.src = "../resources/img/projects/art/SequentialComics1.jpg";
            contentImgElem.alt = "comics_img1";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Sequential Comics<br><b>Date:</b>&ensp;10/14/2019<br><b>Medium:</b>&ensp;Black ink, Fountain pen<br>> Illustration class project. We had to choose one personal embarrassing story and draw comic of it. I couldn't remember good one at the moment so I made one up.<br>";
            // Second image
            let secondImg_comics = document.createElement('img');
            secondImg_comics.classList.add('contentImg');
            secondImg_comics.classList.add('contentImg_ill');
            secondImg_comics.id = 'illustrationContentImg2';
            secondImg_comics.src = "../resources/img/projects/art/SequentialComics2.jpg";
            secondImg_comics.alt = "comics_img2";
            secondImg_comics.style.display = 'none';
            // Add all images to container
            parentDiv.append(secondImg_comics);
            break;
        /*
        ANIMATION PROJECTS
        */
        case 'recipe':
            contentImgElem.src = "https://drive.google.com/file/d/19pE3V-s-uZQIWJEdsygBptfQpezzaE5e/preview";
            break;
    
        default:
            break;
    }

    if ((contentInfoElem.style.display=="") || (contentInfoElem.style.display=="none") || (currentShowing != button)) {
        // If the content info part is not shown or it's showing something but different button is clicked, show correspondingly
        // ADD NEW PROJECTS HERE : for single image ones only
        let singleImgElems = 'hsr_sparkle besties garden propaganda newyorker';
        let twoImgElems = 'alone_together comics';
        let fourImgElems = 'sticker_sheets'
        let fiveImgElems = 'char_concept';
        if (singleImgElems.includes(button)) {
            thisPageNum.innerHTML = "1/1";
        } else if (twoImgElems.includes(button)) {
            thisPageNum.innerHTML = "1/2";
        } else if (fourImgElems.includes(button)) {
            thisPageNum.innerHTML = "1/4";
        } else if (fiveImgElems.includes(button)) {
            thisPageNum.innerHTML = "1/5";
        }
        currImgID = contentImgElem.id;
        contentInfoElem.style.display = 'block';
        contentInfoElem.style.animation = "fadeIn 0.5s forwards";
        currentShowing = button;
    } else {
        // The same button was clicked twice, hide
        contentInfoElem.style.display = 'none';
    }
}

/*
    SLIDESHOW CODE
*/
// This function deletes imgs in slideshow (except the first img)
function removeElemInDiv(thisDiv) {
    let i=0;
    while (i < thisDiv.length) {
        let currElem = thisDiv[i];
        if (i==0) {
            // Show the first element
            currElem.style.display = "block";
            i++;
        } else {
            // Remove rest of elements
            currElem.remove();
        }
    }
}

// This function shows imgs in slideshow depending on which button was clicked (prev or next)
function nextSlide(num, fromWhere) {
    let pageNum;
    if (fromWhere == 'illustration') {
        // Get correct pageNum depending on from where buttons were clicked
        pageNum = document.getElementById("pageNum_ill");
    }
    let slideNum = Number(currImgID[currImgID.length-1]);   // Get number of current image shown in slideshow
    let changedSlideNum;
    let changeTo = currImgID.slice(0, -1);                  // Get id of the current image shown in slideshow
    // Depending on previous or next, add right number to move slide to
    if (num < 0) {
        // Show previous slide
        changedSlideNum = slideNum-1;
        changeTo += changedSlideNum;
        
    } else {
        // Show next slide
        changedSlideNum = slideNum+1;
        changeTo += changedSlideNum;
    }

    let changeFromElem = document.getElementById(currImgID);
    let changeToElem = document.getElementById(changeTo);
    if (changeToElem) {
        // Previous or next image exists (else, curr is first or last image)
        changeFromElem.style.display = 'none';
        changeToElem.style.display = 'block';
        currImgID = changeTo;

        // Change page num too
        let origPageNum = pageNum.innerHTML;
        let newPageNum = changedSlideNum + origPageNum.slice(1);
        pageNum.innerHTML = newPageNum;
    }
}