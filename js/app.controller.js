'use strict';

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners(gCanvas);
    renderCanvas();
}

function renderCanvas() {
    var meme = getMeme();
    console.log('Rendering =', meme);
    var img = new Image();
    img.src = `imgs-square/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(meme, 50, 50);
    }
    resizeCanvas();
}

function drawText(meme, x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = meme.lines[0].stroke;
    gCtx.fillStyle = meme.lines[0].fill;
    gCtx.font = `${meme.lines[0].size}px Impact`;
    gCtx.textAlign = meme.lines[0].align;
    gCtx.fillText(meme.lines[0].txt, x, y);
    gCtx.strokeText(meme.lines[0].txt, x, y);
}

function onSelectImage(el) {
    var imgId = el.dataset.imgId;
    updateMeme(imgId);
    renderCanvas();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height/4)
}