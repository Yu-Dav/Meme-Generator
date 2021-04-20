'use strict';

function onTextChange(txt) {
    updateMeme('txt', txt);
    drawText()
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
    renderPlaceHolder();
}

function onRemoveLine() {
    removeLine();
    renderCanvas();
}

function onAddLine() {
    addLine();
    renderCanvas();
}