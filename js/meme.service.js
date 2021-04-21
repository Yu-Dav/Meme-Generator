'use strict';

var gKeywords = { 'all': 20, 'tv': 22, 'politics': 17, 'funny': 24, 'serious': 20, 'pets': 28, 'baby': 26, 'cute': 26 }

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['tv'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['politic', 'serious'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['pets', 'cute'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['baby', 'cute', 'serious'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['baby', 'pets', 'cute'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['pets', 'funny'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['pets', 'cute'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['baby', 'funny', 'cute'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['tv', 'serious'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['tv', 'serious'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['tv', 'funny'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['tv', 'funny', 'serious'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'cute', 'baby'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['politic', 'serious'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['pets', 'cute', 'funny'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['baby', 'cute', 'baby'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['politics', 'funny'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['funny'] },
    { id: 19, url: 'imgs/19.jpg', keywords: ['tv', 'serious'] },
    { id: 20, url: 'imgs/20.jpg', keywords: ['tv', 'serious'] },
    { id: 21, url: 'imgs/21.jpg', keywords: ['tv', 'serious'] },
    { id: 22, url: 'imgs/22.jpg', keywords: ['tv', 'funny'] },
    { id: 23, url: 'imgs/23.jpg', keywords: ['tv', 'funny', 'serious'] },
    { id: 24, url: 'imgs/24.jpg', keywords: ['politics', 'serious'] },
    { id: 25, url: 'imgs/25.jpg', keywords: ['tv', 'funny'] },
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Try and break the internet',
        size: 45,
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
        txt: 'I dare you',
        size: 65,
        align: 'center',
        fill: 'lightblue',
        stroke: 'red',
        x: 250,
        y: 490,
        font: 'impact',
        strokeWidth: 2,
        isFocused: false
    }]
}

var gFilterImgby = 'all'

var gSaveMemes = [];
const KEY = 'savedMemes';

// Images

function getImgs() {
    if (gFilterImgby === 'all') return gImgs;
    var filtered = gImgs.filter(img => img.keywords.includes(gFilterImgby));
    return filtered
}

function getImgByID() {
    return gImgs.find(img => img.id + '' === gMeme.selectedImgId);
}

function getKeywords() {
    return gKeywords;
}

function setFilter(keyword) {
    gFilterImgby = keyword;
}

function updateKeywordRating(keyword) {
    if (keyword === 'all') return;
    if (gKeywords[keyword] > 30) return;
    gKeywords[keyword] = gKeywords[keyword] + 1;
    renderKeywords();
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
    if (key === 'stokeWidth') currMemeLine.strokeWidth = currMemeLine.strokeWidth + val;
    if (key === 'font') currMemeLine.font = val;
    if (key === 'align') currMemeLine.align = val;
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function saveMeme(url) {
    var memes = loadFromStorage(KEY);
    var meme = createMemeForStorage(url);
    if (!memes || !memes.length) {
        var gSaveMemes = [];
        gSaveMemes.push(meme);
        saveToStorage(KEY, gSaveMemes);
        return;
    }
    memes.push(meme);
    saveToStorage(KEY, memes);
}

function createMemeForStorage(url) {
    var meme = {
        id: getID(),
        url
    }
    return meme;
}

function getSavedMemes() {
    return loadFromStorage(KEY);
}

function addLine() {
    const line = {
        txt: 'Your text here',
        size: 50,
        align: 'center',
        fill: 'white',
        stroke: 'black',
        x: 250,
        y: 250,
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

function updateCurrLine(idx) {
    gMeme.lines.forEach(line => line.isFocused = false);
    gMeme.lines[idx].isFocused = true;
    gMeme.lines[idx].isDragging = true;
    gMeme.selectedLineIdx = idx;
}

function getMeme() {
    return gMeme;
}


function addNewImgToData(url) {
    const newImg = {
        id: gImgs.length + 1,
        url
    }
    gMeme.selectedImgId = gImgs.length + 1;
    gImgs.push(newImg);
}

function removeMemeFromStorage(id) {
    var memes = loadFromStorage(KEY);
    var idxToRemove = memes.findIndex(meme => meme.id === id);
    console.log('idxToRemove =', idxToRemove)
    memes.splice(idxToRemove, 1);
    saveToStorage(KEY, memes);
    renderSavedMemes();
}