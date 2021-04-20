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
    var line = findIfLine(ev);
    console.log('line =', line)
    if (!line) {
        // onCanvasClick(ev);
        return;
    }
    const pos = getEvPos(ev);
    line.isDragging = true;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';

}

function findIfLine(ev) {
    const { offsetX, offsetY } = ev;
    const memes = getMeme();
    const lines = memes.lines
    var line = lines.find(line => isLine(line, offsetX, offsetY))
    return line;
}

function onMove(ev) {
    var meme = getMeme();
    var lines = meme.lines;
    lines.forEach(line => {
        if (line.isDragging) {
            console.log('moving shape =', line)
            const pos = getEvPos(ev)
            const dx = pos.x - gStartPos.x
            const dy = pos.y - gStartPos.y
            line.x += dx
            line.y += dy
            line.x = pos.x
            line = pos.y
            gStartPos = pos
            renderCanvas();
        }
    });
}

function onUp() {
    var meme = getMeme();
    var lines = meme.lines;
    document.body.style.cursor = 'pointer'
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

function isLine(line, clickedX, ClickedY) {
    const distance = Math.sqrt((line.x - clickedX) ** 2 + (line.y - ClickedY) ** 2);
    return distance <= line.size;
}
