'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gStartPos;

function addListeners(canvas) {
    addMouseListeners(canvas)
    addTouchListeners(canvas)
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}

function addMouseListeners(canvas) {
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mouseup', onUp)
}

function addTouchListeners(canvas) {
    canvas.addEventListener('touchmove', onMove)
    canvas.addEventListener('touchstart', onDown)
    canvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    var shape = findIfText(ev);
    if (!shape) {
        onCanvasClick(ev);
        return;
    }
    const pos = getEvPos(ev);
    shape.isDragging = true;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';

}

function findIfText(ev) {
    const { offsetX, offsetY } = ev;
    var txt;
    const memes = getMeme();
    const lines = memes.lines 
    return txt = lines.find(line => {
        return isCirlceClicked(line, offsetX, offsetY);
        // Figure other shapes..? 
    })
}

function onMove(ev) {
    var meme = getMeme();
    var lines = meme.lines;
    lines.forEach(shape => {
        if (shape.isDragging) {
            const pos = getEvPos(ev)
            const dx = pos.x - gStartPos.x
            const dy = pos.y - gStartPos.y
            shape.pos.x += dx
            shape.pos.y += dy
            shape.pos.x = pos.x
            shape.pos.y = pos.y
            gStartPos = pos
            if (shape.type === "circle") drawCircle(pos.x, pos.y);
            if (shape.type === "square") drawRect(pos.x, pos.y);
            if (shape.type === "spade") drawSpade(pos.x, pos.y);
            if (shape.type === "line") drawLine(pos.x, pos.y);
        }
    });
}

function onUp() {
    var meme = getMeme();
    var lines = meme.lines;
    document.body.style.cursor = 'grab'
    lines.forEach(line => line.isDragging = false)
}

function getEvPos(ev) {
    const pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isCirlceClicked(line, clickedX, ClickedY) {
    var lineX = line.x;
    var lineY = line.y;
    const distance = Math.sqrt((lineX - clickedX) ** 2 + (lineY - ClickedY) ** 2);
    return distance <= line.size;
}
