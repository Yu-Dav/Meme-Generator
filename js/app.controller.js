'use strict';

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.querySelector('canvas');
    console.log ('gCanvas =',gCanvas)
    gCtx = gCanvas.getContext('2d');
    // gCanvas.setAttribute('tabindex','0');
    // gCanvas.focus();
    addListeners(gCanvas);
    // renderCanvas();
    renderImgGallery();
}

function renderCanvas() {
    var meme = getMeme();
    var img = new Image();
    img.src = `imgs/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        console.log ('meme =',meme)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText();
    }
    resizeCanvas();
}

function getCanvas() {
    return gCanvas;
}

function drawText() {
    const lines = getMeme().lines;
    lines.forEach(line => {
        // gCtx.transform(-1, 0, 0, 1, 100, 0);
        gCtx.lineWidth = 1
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.textAlign = line.align;
        gCtx.fillStyle = line.fill;
        console.log ('Width =',gCtx.measureText(line.txt).width)
        console.log ('Height =',gCtx.measureText(line.txt).height)
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeStyle = line.stroke;
        gCtx.strokeText(line.txt, line.x, line.y);
    });
}

function onCanvasClick() {
    console.log ('canvas clicked =')
}

function renderImgGallery() {
    const imgs = getImgs();
    const strHTMLs = imgs.map(img => {
        return `
        <img onclick="onSelectImage(this.dataset.imgId)" data-img-id="${img.id}" src="imgs/${img.id}.jpg" alt="Image ${img.id}">
        `
    });
    const elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = strHTMLs.join('');
}

function onSelectImage(imgId) {
    document.querySelector('.meme-editor-container').style.display = 'flex';
    updateMeme('img', imgId);
    renderCanvas();
    // only renderText to smooth.....
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

function onFillChange(clr) {
    updateMeme('fill', clr);
    renderCanvas();

}

function onStrokeChange(clr) {
    updateMeme('stroke', clr);
    renderCanvas();
}

function onFontChange(font) {
    updateMeme('font', font);
    renderCanvas();
}

function onTextAlign(align) {
    console.log ('align =',align)
    updateMeme('align', align);
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
    // console.dir (elContainer)
    // console.log ('elContainer.offsetWidth =',elContainer.offsetWidth)
    // console.log ('elContainer.offsetHeight =',elContainer.offsetHeight)
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height/4)
}