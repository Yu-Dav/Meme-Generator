'use strict';

var gKeywords = { 'happy': 12, 'funny': 1 }

var gImgs = [
    { id: 1, url: 'imgs-square/1.jpg', keywords: ['happy'] }
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I love memes',
        size: 50,
        align: 'left',
        fill: 'white',
        stroke: 'red'
    }]
}

function updateMeme(id) {
    gMeme.selectedImgId = id; 
}

function getMeme() {
    return gMeme;
}


