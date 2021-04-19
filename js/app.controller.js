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
        drawText(meme, meme.lines[0].x, meme.lines[0].y);
    }
    resizeCanvas();

}

function drawText(line, x, y) {
    const lines = line.lines;
    console.log ('lines =',lines)
    lines.forEach(line => {
        gCtx.lineWidth = 1
        gCtx.font = `${line.size}px Impact`;
        gCtx.textAlign = line.align;
        gCtx.fillStyle = line.fill;
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeStyle = line.stroke;
        gCtx.strokeText(line.txt, line.x, line.y);
    });
}

function onSelectImage(imgId) {
    updateMeme('img', imgId);
    renderCanvas();
}

function onTextChange(txt) {
    updateMeme('txt', txt);
    renderCanvas();
}

function onChangeFontSize(dif) {
    dif = +dif;
    updateMeme('fontSize', dif);
    renderCanvas();
}

function onChangeLineY(dif) {
    dif = +dif;
    updateMeme('lineY', dif);
    renderCanvas();
}
function onChangeLineX(dif) {
    dif = +dif;
    updateMeme('lineX', dif);
    renderCanvas();
}

function onChangeLine() {
    changeCurrLine();
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