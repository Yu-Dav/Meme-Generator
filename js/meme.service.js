'use strict';

var gKeywords = { 'happy': 12, 'funny': 1 }

var gImgs = [
    { id: 1, url: 'imgs-square/1.jpg', keywords: ['happy'] }
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


