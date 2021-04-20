'use strict';

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.querySelector('canvas');
    console.log('gCanvas =', gCanvas)
    gCtx = gCanvas.getContext('2d');
    // gCanvas.setAttribute('tabindex','0');
    // gCanvas.focus();
    addListeners(gCanvas);
    // renderCanvas();
    renderImgGallery();
}

function renderCanvas() {
    const meme = getMeme();
    console.log('meme =', meme)
    var img = new Image();
    img.src = `imgs/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        // gCanvas.width = img.naturalWidth;
        // gCanvas.height = img.naturalHeight;
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText();
    }
    resizeCanvas();
}

function drawText() {
    const lines = getMeme().lines;
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    lines.forEach(line => {

        var vrtCanvas = document.createElement('canvas');
        vrtCanvas.width = 500;
        vrtCanvas.height = 500;
        var vrtCtx = vrtCanvas.getContext('2d');
        vrtCtx.lineWidth = line.strokeWidth
        vrtCtx.font = `${line.size}px ${line.font}`;
        vrtCtx.textAlign = line.align;
        vrtCtx.fillStyle = line.fill;
        // console.log ('Width =',gCtx.measureText(line.txt).width)
        // console.log ('Height =',gCtx.measureText(line.txt).height)
        vrtCtx.fillText(line.txt, line.x, line.y);
        vrtCtx.strokeStyle = line.stroke;
        vrtCtx.strokeText(line.txt, line.x, line.y);
        gCtx.drawImage(vrtCanvas, 0, 0, gCanvas.width, gCanvas.height);
    });
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


function renderPlaceHolder() {
    const meme = getMeme();
    var elInput = document.querySelector('.text input')
    elInput.value = meme.lines[meme.selectedLineIdx].txt;
}

function renderSavedMemes() {
    const memes = getSavedMemes();
    if (!memes) {
        document.querySelector('.saved-memes-container').innerHTML = 'Start saving...';
        return;
    }
    var strHTMLs = memes.map(meme => {
        return `
        <img onclick="onSavedMemeClick('${meme.id}')" src="${meme.url}" alt="Saved meme">
        `
    });
    document.querySelector('.saved-memes-container').innerHTML = strHTMLs.join('');
}

function onSelectImage(imgId) {
    document.querySelector('.meme-editor-container').style.display = 'flex';
    updateMeme('img', imgId);
    renderCanvas();
    // only renderText to smear.....
}

function onSavedMemeClick(id) {
    console.log('var =', id);
}


// function onCanvasClick() {
//     console.log ('canvas clicked =')
// }

function onOpenSavedModal() {
    console.log('opening modal =')
    document.querySelector('.saved-memes-modal').hidden = false;
    document.querySelector('.saved-memes-modal').style.zIndex = '2'
    // Screen zindex 1
    renderSavedMemes();
}

function onCloseSavedModal() {
    console.log('closing modal =')
    document.querySelector('.saved-memes-modal').hidden = true;
}

function onOpenClearConfirm() {
    document.querySelector('.clear-confirm').hidden = false;
}

function onCloseClearConfirm() {
    document.querySelector('.clear-confirm').hidden = true;
}

function onClearSavedMemes() {
    localStorage.clear();
    onCloseSavedModal();
}

// ACTIONS

function onDownload(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'My Creation';
}

function onSave() {
    const data = gCanvas.toDataURL();
    saveMeme(data)
}

var shareButton = document.querySelector('.btn-share')
shareButton.addEventListener("click", async () => {
    try {
        await navigator.share({ title: "Example Page", url: "" });
        console.log("Data was shared successfully");
    } catch (err) {
        console.error("Share failed:", err.message);
    }
});


// function onShare() {
//     console.log('var =')

// }


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