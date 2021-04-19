'use strict';

var gKeywords = { 'happy': 12, 'funny': 1 }

var gImgs = [
    { id: 1, url: 'imgs-square/1.jpg', keywords: ['politics'] },
    { id: 2, url: 'imgs-square/2.jpg', keywords: ['pets','cute'] },
    { id: 3, url: 'imgs-square/3.jpg', keywords: ['pets','cute','baby'] },
    { id: 4, url: 'imgs-square/4.jpg', keywords: ['pets','cute','baby'] },
    { id: 5, url: 'imgs-square/5.jpg', keywords: ['pets','cute','baby'] },
    { id: 6, url: 'imgs-square/6.jpg', keywords: ['pets','cute','baby'] },
    { id: 7, url: 'imgs-square/7.jpg', keywords: ['pets','cute','baby'] },
    { id: 8, url: 'imgs-square/8.jpg', keywords: ['pets','cute','baby'] },
    { id: 9, url: 'imgs-square/9.jpg', keywords: ['pets','cute','baby'] },
    { id: 10, url: 'imgs-square/10.jpg', keywords: ['pets','cute','baby'] },
    { id: 11, url: 'imgs-square/11.jpg', keywords: ['pets','cute','baby'] },
    { id: 12, url: 'imgs-square/12.jpg', keywords: ['pets','cute','baby'] },
    { id: 13, url: 'imgs-square/13.jpg', keywords: ['pets','cute','baby'] },
    { id: 14, url: 'imgs-square/14.jpg', keywords: ['pets','cute','baby'] },
    { id: 15, url: 'imgs-square/15.jpg', keywords: ['pets','cute','baby'] },
    { id: 16, url: 'imgs-square/16.jpg', keywords: ['pets','cute','baby'] },
    { id: 17, url: 'imgs-square/17.jpg', keywords: ['pets','cute','baby'] },
    { id: 18, url: 'imgs-square/18.jpg', keywords: ['pets','cute','baby'] },
];

var gCurrLine = 0;

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        id: 0,
        txt: 'Whoop Whoop!',
        size: 50,
        align: 'left',
        fill: 'white',
        stroke: 'red',
        x: 50,
        y: 50
    },
    {
        id: 1,
        txt: 'Yay!',
        size: 50,
        align: 'left',
        fill: 'white',
        stroke: 'red',
        x: 100,
        y: 300
    }]
}

// Images

function getImgs() {
    return gImgs;
}

// Meme

function updateMeme(key, val) {
    console.log ('gCurrLine =',gCurrLine)
    if (key === 'img') gMeme.selectedImgId = val;
    if (key === 'txt') gMeme.lines[gCurrLine].txt = val;
    if (key === 'fontSize') gMeme.lines[gCurrLine].size = gMeme.lines[gCurrLine].size + val;
    if (key === 'lineY') gMeme.lines[gCurrLine].y = gMeme.lines[gCurrLine].y + val;
    if (key === 'lineX') gMeme.lines[gCurrLine].x = gMeme.lines[gCurrLine].x + val;
}
function changeCurrLine() {
    if (gCurrLine === 0) {
        gCurrLine = 1;
        return;
    }
    gCurrLine = 0
}
function getMeme() {
    return gMeme;
}


