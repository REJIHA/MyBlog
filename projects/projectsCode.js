/*
    This javascript code shows information on projects page depending on which
    categories and buttons are clicked. When certain category is clicked, it
    lists all buttons that user can click. Once these buttons are clicked,
    javascript fetches correct image/ gif/ video/ slideshow files to show.
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
    let parentDiv;

    // Decide which category contents is showing
    // ADD NEW CATEGORY HERE
    if (fromWhere == 'coding2024') {
        contentInfoElem = document.getElementById("coding2024ContentInfo");
        contentImgElem = document.getElementById("coding2024ContentImg1");
        contentTextElem = document.getElementById("coding2024ContentText");
        slideshowImgs = document.getElementsByClassName("contentImg_coding2024");
        thisPageNum = document.getElementById("pageNum_coding2024");
        parentDiv = document.getElementById("slideshow-container_coding2024");
    } else if (fromWhere == 'coding2021') {
        if (button == 'accessu') {
            // AccessU is video, so use video tag
            contentImgElem = document.getElementById("coding2021Iframe");
        } else {
            // Other coding 2021 projects are images, use img tag
            contentImgElem = document.getElementById("coding2021ContentImg1");
        }
        contentInfoElem = document.getElementById("coding2021ContentInfo");
        contentTextElem = document.getElementById("coding2021ContentText");
        slideshowImgs = document.getElementsByClassName("contentImg_coding2021");
        thisPageNum = document.getElementById("pageNum_coding2021");
        parentDiv = document.getElementById("slideshow-container_coding2021");
    } else if (fromWhere == 'coding2020') {
        contentInfoElem = document.getElementById("coding2020ContentInfo");
        contentImgElem = document.getElementById("coding2020Iframe");
        contentTextElem = document.getElementById("coding2020ContentText");
    } else if (fromWhere == 'illustration') {
        contentInfoElem = document.getElementById("illustrationContentInfo");
        contentImgElem = document.getElementById("illustrationContentImg1");
        contentTextElem = document.getElementById("illustrationContentText");
        slideshowImgs = document.getElementsByClassName("contentImg_ill");
        thisPageNum = document.getElementById("pageNum_ill")
        parentDiv = document.getElementById("slideshow-container_illustration");
    } else if (fromWhere == 'animation') {
        if (button == 'flipbook') {
            // Flipbook is gif, so use img tag
            contentImgElem = document.getElementById("animationContentImg1");
        } else {
            // Other animation projects are videos, use iframe tag
            contentImgElem = document.getElementById("animationIframe");
        }
        contentInfoElem = document.getElementById("animationContentInfo");
        contentTextElem = document.getElementById("animationContentText");
    } else if (fromWhere == 'modeling') {
        contentInfoElem = document.getElementById("modelingContentInfo");
        contentImgElem = document.getElementById("modelingContentImg1");
        contentTextElem = document.getElementById("modelingContentText");
        slideshowImgs = document.getElementsByClassName("contentImg_modeling");
        thisPageNum = document.getElementById("pageNum_modeling");
        parentDiv = document.getElementById("slideshow-container_modeling");
    }

    // Reset slideshow if it was used (default is one image or video)
    if (slideshowImgs != null) {
        removeElemInDiv(slideshowImgs);
    }
    // Depending on which button was clicked, show different info
    // ADD NEW PROJECTS HERE
    switch (button) {
        /*
        CODING 2024 PROJECTS
        */
        case 'mywebsite':
            thisPageNum.innerHTML = "1/8";
            contentImgElem.src = "../resources/img/projects/programming/myWebsite_1.png";
            contentImgElem.alt = "mywebsite1_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Personal Website<br><b>Date:</b>&ensp; 3/9/2024 - 3/10/2024, 8/28/2024 - present<br><b>Used:</b>&ensp;HTML, CSS, JavaScript, GitHub Pages, Web3Forms, Namecheap<br>> Personal portfolio website. Went for Windows XP theme and tried not to use any frameworks.<br><a href='https://rejiha.online' target='_blank'>► Link to Website ◀</a><br>";
            // Add rest of images
            addImgtoSlideshow(8, "contentImg_coding2024", "coding2024ContentImg", "programming", "myWebsite_", ".png", "mywebsite", "_img", parentDiv);
            break;
        /*
        CODING 2021 PROJECTS
        */
        case 'accessu':
            switchImgAndVideo("coding2021", "video", "coding2021Iframe", "coding2021ContentImg1");
            contentImgElem.src = "https://www.youtube.com/embed/KUjCdz5MU-A?si=KRAoEczew_ETsDcD";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;AccessU Website<br><b>Date:</b>&ensp;11/7/2021 - 12/8/2021<br><b>Used:</b>&ensp;HTML, CSS, JavaScript, MongoDB, Mongoose, Node.js, Express.js, AJAX, jQuery, Digital Ocean<br><b>Role:</b>&ensp; Full stack developer<br>> Web programming class group project with Kiana Thatcher and Connor Benson. It mimics UofA’s UAccess (course registration and management page) and we used Arizona State University’s color theme.<br>";
            break;
        case 'tower_defense':
            switchImgAndVideo("coding2021", "img", "coding2021Iframe", "coding2021ContentImg1");
            thisPageNum.innerHTML = "1/9";
            contentImgElem.src = "../resources/img/projects/programming/tower_defense_1.png";
            contentImgElem.alt = "towerdefense1_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Tower Defense<br><b>Date:</b>&ensp; 9/20/2021 - 12/3/2021<br><b>Used:</b>&ensp;C#, Unity<br><b>Role:</b>&ensp; Front-end developer<br>> Software engineering class group project with Hyungjun Ha. This was a free project so we self-learned Unity and programmed a tower defense game using copyright-free resources.<br><a href='https://drive.google.com/file/d/1fqnPYOXf8J18VI1HkkAAbAyx7_O8gZYx/view?usp=sharing' target='_blank'>► PC Download</a>/<a href='https://drive.google.com/file/d/1XQvOKM9z3N91Al0m0wnWu4T1wbNaV_sc/view?usp=sharing' target='_blank'> Mobile Download ◀</a><br>";
            // Add rest of images
            addImgtoSlideshow(9, "contentImg_coding2021", "coding2021ContentImg", "programming", "tower_defense_", ".png", "towerdefense", "_img", parentDiv);
            break;
        case 'totalvery':
            switchImgAndVideo("coding2021", "img", "coding2021Iframe", "coding2021ContentImg1");
            thisPageNum.innerHTML = "1/8";
            contentImgElem.src = "../resources/img/projects/programming/result1.png";
            contentImgElem.alt = "totalvery1_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Totalvery<br><b>Date:</b>&ensp; 1/3/2021 - 2/7/2021<br><b>Used:</b>&ensp;Python, HTML, CSS, Javascript, React, Bootstrap, MongoDB, Django, Docker, Google Cloud API<br><b>Role:</b>&ensp; Front-end developer<br>> Group project with Sooyoung Moon and Hyunju Song. Built a website that combines Doordash, UberEats and Grubhub delivery services for users to compare costs between platforms. Participated in Black Wings Hacks and won ”Best Use of Google Cloud” award.<br><a href='https://github.com/Totalvery/totalvery' target='_blank'>► Link to GitHub ◀</a><br>";
            // Add rest of images
            addImgtoSlideshow(8, "contentImg_coding2021", "coding2021ContentImg", "programming", "result", ".png", "totalvery", "_img", parentDiv);
            break;
        /*
        CODING 2020 PROJECTS
        */
        case 'social_deduction':
            contentImgElem.src = "https://docs.google.com/presentation/d/e/2PACX-1vQl08y4IcirkOFeTU601GlrQtxPCfeK1_pDMqb0qojLXRi1sFix9sCEvzbgCJWTQH0tz4uYP6KLvCV-/embed?start=false&loop=true&delayms=3000";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Social Deduction<br><b>Date:</b>&ensp; 12/1/2020 - 12/10/2020<br><b>Used:</b>&ensp;Java, JavaFX<br>> Object Oriented Programming class group project with Sooyoung Moon, Hyunju Song, and David Kennedy. It plays small social deduction game (we referenced Among Us).<br>";
            break;
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
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;New Yorker Magazine<br><b>Date:</b>&ensp;10/22/2019<br><b>Medium:</b>&ensp;Watercolor, Digital - Photoshop<br>> Illustration class project. We had to choose one social issue (I chose school shootings) and fit to New Yorker magazine's format.<br>";
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
        case 'personal_structure':
            switchImgAndVideo("animation", "video", "animationIframe", "animationContentImg1");
            contentImgElem.src = "https://drive.google.com/file/d/1m31185Wd2goz_kIyS3-maOplm6ZFMtdG/preview";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Personal Structure<br><b>Date:</b>&ensp;12/7/2021<br><b>Medium:</b>&ensp;Digital - Medibang Paint, Stop Motion Studio<br>> Animation class project. Since this was going to become one compilation of animation as a class, we decided on specific quincunx pattern for transition and color palettes for unity. For my personal structure, I chose to illustrate two contrasting sides I have in me.<br><br><details><summary>I recommend watching the video first then reading my explanation.</summary>Extrovert vs introvert, programmer vs artist, Korean vs American.</details>";
            break;
        case 'experimentation':
            switchImgAndVideo("animation", "video", "animationIframe", "animationContentImg1");
            contentImgElem.src = "https://drive.google.com/file/d/1E-yjF4Okmq8GYVmFA6r-EzOxcVWt8D9S/preview";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Week of Experimentation<br><b>Date:</b>&ensp;10/7/2021<br><b>Medium:</b>&ensp;Sand, Chalk, Acrylic, Magazine, Digital - Stop Motion Studio<br>> Animation class group project. During this week we were given various materials to animate with, and our group decided to try out all. Ours is the water droplet animation in the beginning of the video. The techniques used are: sand animation, lotoscoping, paint animation, and collage animation.<br>";
            break;
        case 'flipbook':
            switchImgAndVideo("animation", "gif", "animationIframe", "animationContentImg1");
            contentImgElem.src = "../resources/img/projects/art/HyoseoK_Flip-Book.gif";
            contentImgElem.alt = "flipbook_gif";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Flip Book<br><b>Date:</b>&ensp;9/10/2021<br><b>Medium:</b>&ensp;Watercolor, Digital - Stop Motion Studio<br>> Animation class project. We had to choose one virus and make an infinite loop animation. I chose Influenza (flu).<br>";
            break;
        case 'title_sequence':
            switchImgAndVideo("animation", "video", "animationIframe", "animationContentImg1");
            contentImgElem.src = "https://drive.google.com/file/d/1UOEltHCKhvAOH_M_gygJ2f0z-XaC7-8Y/preview";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Title Sequence<br><b>Date:</b>&ensp;5/3/2021<br><b>Medium:</b>&ensp;Digital - Clip Studio, After Effects<br>> Motion class project. We had to choose one typeface except Helvetica to animate its history like the movie title logo and I chose Comic Sans.<br>";
            break;
        case 'puppet':
            switchImgAndVideo("animation", "video", "animationIframe", "animationContentImg1");
            contentImgElem.src = "https://drive.google.com/file/d/13s4iDymcal9tjLkntST3Yyg0h710fIm8/preview";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Puppet<br><b>Date:</b>&ensp;4/7/2021<br><b>Medium:</b>&ensp;Digital - Clip Studio, After Effects<br>> Motion class project. We had to make unique character, dub and animate it using our own facial expressions. I recreated Cupid from greek mythology as modern Youtuber/streamer telling people about romance stories.<br>";
            break;
        case 'recipe':
            switchImgAndVideo("animation", "video", "animationIframe", "animationContentImg1");
            contentImgElem.src = "https://drive.google.com/file/d/19pE3V-s-uZQIWJEdsygBptfQpezzaE5e/preview";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Recipe<br><b>Date:</b>&ensp;3/8/2021<br><b>Medium:</b>&ensp;Digital - Adobe Illustrator, After Effects<br>> Motion class project. We had to animate recipe of our choice and I chose tomato juice with my mom's special recipe.<br>";
            break;
        /*
        3D MODELING PROJECTS
        */
        case 'self_portrait':
            thisPageNum.innerHTML = "1/2";
            contentImgElem.src = "../resources/img/projects/art/HyoseoK_Body_Color_Front.jpg";
            contentImgElem.alt = "body_front_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Self-Portrait<br><b>Date:</b>&ensp;September - December 2020<br><b>Medium:</b>&ensp;Digital - ZBrush<br>> 3D Modeling class project. We made 3D modelings of ourselves.<br>";
            // Second image
            let secondImg_selfportrait = document.createElement('img');
            secondImg_selfportrait.classList.add('contentImg');
            secondImg_selfportrait.classList.add('contentImg_modeling');
            secondImg_selfportrait.id = 'modelingContentImg2';
            secondImg_selfportrait.src = "../resources/img/projects/art/HyoseoK_Body_Color_Side.jpg";
            secondImg_selfportrait.alt = "body_side_img";
            secondImg_selfportrait.style.display = 'none';
            // Add all images to container
            parentDiv.append(secondImg_selfportrait);
            break;
        case 'double_meaning':
            thisPageNum.innerHTML = "1/2";
            contentImgElem.src = "../resources/img/projects/art/HyoseoK_Positive.jpg";
            contentImgElem.alt = "positive_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Double Meaning<br><b>Date:</b>&ensp;11/23/2020<br><b>Medium:</b>&ensp;Digital - ZBrush, Photoshop<br>> 3D Modeling class project. Reusing the models we made for 'Alienation', we had to put the 3D model in the photo we took in real life to create one positive/utopia image and one negative/dystopia image.<br>";
            // Second image
            let secondImg_doublemeaning = document.createElement('img');
            secondImg_doublemeaning.classList.add('contentImg');
            secondImg_doublemeaning.classList.add('contentImg_modeling');
            secondImg_doublemeaning.id = 'modelingContentImg2';
            secondImg_doublemeaning.src = "../resources/img/projects/art/HyoseoK_Negative.jpg";
            secondImg_doublemeaning.alt = "negative_img";
            secondImg_doublemeaning.style.display = 'none';
            // Add all images to container
            parentDiv.append(secondImg_doublemeaning);
            break;
        case 'alienation':
            thisPageNum.innerHTML = "1/4";
            contentImgElem.src = "../resources/img/projects/art/HyoseoK_Alienation1.jpg";
            contentImgElem.alt = "alienation1_img";
            contentTextElem.innerHTML = "<b>Title:</b>&ensp;Alienation<br><b>Date:</b>&ensp;11/19/2020<br><b>Medium:</b>&ensp;Digital - ZBrush<br>> 3D Modeling class project. I chose to alienate myself from my friends.<br>";
            // Add rest of images
            addImgtoSlideshow(4, "contentImg_modeling", "modelingContentImg", "art", "HyoseoK_Alienation", ".jpg", "alienation", "_img", parentDiv);
            break;
        default:
            break;
    }

    if ((contentInfoElem.style.display=="") || (contentInfoElem.style.display=="none") || (currentShowing != button)) {
        // If the content info part is not shown or it's showing something but different button is clicked, show correspondingly
        // ADD NEW PROJECTS HERE : for images only (no videos)
        let singleImgElems = 'hsr_sparkle besties garden propaganda newyorker';
        let twoImgElems = 'alone_together comics double_meaning self_portrait';
        let fourImgElems = 'sticker_sheets alienation'
        let fiveImgElems = 'char_concept';
        let eightImgElems = 'totalvery mywebsite';
        let nineImgElems = 'tower_defense';
        if (singleImgElems.includes(button)) {
            thisPageNum.innerHTML = "1/1";
        } else if (twoImgElems.includes(button)) {
            thisPageNum.innerHTML = "1/2";
        } else if (fourImgElems.includes(button)) {
            thisPageNum.innerHTML = "1/4";
        } else if (fiveImgElems.includes(button)) {
            thisPageNum.innerHTML = "1/5";
        } else if (eightImgElems.includes(button)) {
            thisPageNum.innerHTML = "1/8";
        } else if (nineImgElems.includes(button)) {
            thisPageNum.innerHTML = "1/9";
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
    // Get correct pageNum depending on from where buttons were clicked
    // ADD NEW CATEGORY HERE
    if (fromWhere == 'coding2021') {
        pageNum = document.getElementById("pageNum_coding2021");
    } else if (fromWhere == 'coding2024') {
        pageNum = document.getElementById("pageNum_coding2024");
    } else if (fromWhere == 'illustration') {
        pageNum = document.getElementById("pageNum_ill");
    } else if (fromWhere == 'modeling') {
        pageNum = document.getElementById("pageNum_modeling");
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

// This function adds multiple images to slideshow (only if image files have consistent numbering)
function addImgtoSlideshow(howmany, className, idName, folderName, imgFileName, fileType, altName, altType, parentDiv) {            
    for (let i=2; i<=howmany; i++) {
        // Create img element
        let currElem = document.createElement('img');
        currElem.classList.add('contentImg');
        currElem.classList.add(className);
        currElem.id = idName + i;
        currElem.src = "../resources/img/projects/" + folderName + "/" + imgFileName + i + fileType;
        currElem.alt = altName + i + altType;
        currElem.style.display = 'none';
        // Add image element to container
        parentDiv.append(currElem);
    }
}

/*
    SWITCH CODE
*/
// This function switches between img/gif and video to show in info section
function switchImgAndVideo(fromWhere, toThis, iframeId, imgId) {
    let iframeElem = document.getElementById(iframeId);
    let imgElem = document.getElementById(imgId);
    
    if ((toThis == "gif") || (toThis == "img")) {
        // Disable iframe and show img
        iframeElem.style.display = "none";
        imgElem.style.display = "block";
        if (fromWhere == 'coding2021') {
            // Coding 2021 section has both video and img so bring back slideshow buttons on img
            let slideshowButtons = document.getElementsByClassName("slideshowButtons2021");
            for (let i=0; i<slideshowButtons.length; i++) {
                let currElem = slideshowButtons[i];
                currElem.style.display = "inline-block";
            }
        }
    } else if (toThis == "video") {
        // Disable img and show iframe
        iframeElem.style.display = "block";
        imgElem.style.display = "none";
        if (fromWhere == 'coding2021') {
            // Coding 2021 section has both video and img so hide slideshow buttons on video
            let slideshowButtons = document.getElementsByClassName("slideshowButtons2021");
            for (let i=0; i<slideshowButtons.length; i++) {
                let currElem = slideshowButtons[i];
                currElem.style.display = "none";
            }
        }
    }
}