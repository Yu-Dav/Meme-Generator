'use strict';

var gShapes = []

function getShapes() {
    return gShapes;
}

function clearShapes() {
    gShapes = [];
}


function createShape(x, y, size, type, fill, stroke) {
    const shape = {
        pos: { x, y },
        size,
        type,
        fill,
        stroke,
        isDragging: false
    }
    gShapes.push(shape);
}