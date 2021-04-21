'use strict';

var gLastChangedDirect;

function onTextChange(txt) {
    updateMeme('txt', txt);
    renderCanvas();

    // drawText()
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

function onChangeStokeWidth(dif) {
    dif = +dif;
    updateMeme('stokeWidth', dif);
    renderCanvas();
}

function onFontChange(font) {
    updateMeme('font', font);
    renderCanvas();
}

function onTextAlign(align) {
    console.log('align =', align)
    updateMeme('align', align);
    renderCanvas();
}

function onChangeLineY(dif) {
    console.log('dif =', dif)
    if (dif > 0) gLastChangedDirect = 'down';
    if (dif < 0) gLastChangedDirect = 'up';
    dif = +dif;
    updateMeme('lineY', dif);
    renderCanvas();
}
function onChangeLineX(dif) {
    if (dif > 0) gLastChangedDirect = 'right';
    if (dif < 0) gLastChangedDirect = 'left';
    dif = +dif;
    updateMeme('lineX', dif);
    renderCanvas();
}


function onChangeLine() {
    changeCurrLine();
    renderPlaceHolder();
    renderCanvas();
}

function onRemoveLine() {
    removeLine();
    renderCanvas();
}

function onAddLine() {
    addLine();
    renderCanvas();
}