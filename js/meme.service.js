'use strict';

var gKeywords = { 'happy': 12, 'funny': 1, 'pets': 8, 'cute': 4, 'baby': 3, 'politics': 2 }

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['politics'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['pets', 'cute'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['pets', 'cute'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['baby'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'serious'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 19, url: 'imgs/19.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 20, url: 'imgs/20.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 21, url: 'imgs/21.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 22, url: 'imgs/22.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 23, url: 'imgs/23.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 24, url: 'imgs/24.jpg', keywords: ['pets', 'cute', 'baby'] },
    { id: 25, url: 'imgs/25.jpg', keywords: ['pets', 'cute', 'baby'] },
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Whoop Whoop!',
        size: 50,
        align: 'center',
        fill: 'white',
        stroke: 'red',
        x: 250,
        y: 50,
        font: 'impact',
        strokeWidth: 1,
        isFocused: true
    },
    {
        txt: 'Yay!',
        size: 75,
        align: 'center',
        fill: 'lightblue',
        stroke: 'red',
        x: 250,
        y: 490,
        font: 'impact',
        strokeWidth: 3,
        isFocused: false
    }]
}

var gSaveMemes = [];
const key = 'savedMemes';

// Images

function getImgs() {
    return gImgs;
}

// Meme

function updateMeme(key, val) {
    const currMemeLine = gMeme.lines[gMeme.selectedLineIdx];
    if (key === 'img') gMeme.selectedImgId = val;
    if (key === 'txt') currMemeLine.txt = val;
    if (key === 'fontSize') currMemeLine.size = currMemeLine.size + val;
    if (key === 'lineY') currMemeLine.y = currMemeLine.y + val;
    if (key === 'lineX') currMemeLine.x = currMemeLine.x + val;
    if (key === 'x') currMemeLine.x = val;
    if (key === 'y') currMemeLine.y = val;
    if (key === 'fill') currMemeLine.fill = val;
    if (key === 'stroke') currMemeLine.stroke = val;
    if (key === 'font') currMemeLine.font = val;
    if (key === 'align') currMemeLine.align = val;
    if (key === 'stokeWidth') currMemeLine.strokeWidth = currMemeLine.strokeWidth + val;
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function saveMeme(url) {
    var memes = loadFromStorage(key);
    var meme = createMemeForStorage(url);
    if (!memes || !memes.length) {
        var gSaveMemes = [];
        gSaveMemes.push(meme);
        saveToStorage(key, gSaveMemes);
        return;
    }
    memes.push(meme);
    saveToStorage(key, memes);
}

function createMemeForStorage(url) {
    var meme = {
        id: getID(),
        url
    }
    return meme;
}

function getSavedMemes() {
    return loadFromStorage(key);
}

function addLine() {
    const line = {
        txt: 'your text here',
        size: 50,
        align: 'center',
        fill: 'white',
        stroke: 'black',
        x: 125,
        y: 220,
        font: 'impact',
        strokeWidth: 1,
        isFocused: false
    }
    gMeme.lines.push(line);
}

function changeCurrLine() {
    gMeme.lines[gMeme.selectedLineIdx].isFocused = false;
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    gMeme.lines[gMeme.selectedLineIdx].isFocused = true;
}

function getMeme() {
    return gMeme;
}

function addNewImgToData(url) {
    // console.log('adding new photo!')
    // console.log('var =', url)
    const newImg = {
        id: gImgs.length + 1,
        url
    }
    gMeme.selectedImgId = gImgs.length + 1;
    gImgs.push(newImg);
}
