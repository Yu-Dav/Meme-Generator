'use strict';

var gCanvas;
var gCtx;
var gImg;

function onInit() {
    gCanvas = document.querySelector('canvas');
    console.log('gCanvas =', gCanvas)
    gCtx = gCanvas.getContext('2d');
    addListeners(gCanvas);
    // renderCanvas();
    renderImgGallery();
}

function renderCanvas() {
    const meme = getMeme();
    var img = new Image();
    img.src = getImgs()[meme.selectedImgId - 1].url;
    img.onload = () => {
        // gCanvas.width = img.naturalWidth;
        // gCanvas.height = img.naturalHeight;
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        // gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
        // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height * img.width / img.height);
        drawText();
    }
    resizeCanvas();
}

function drawText() {
    const lines = getMeme().lines;
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    lines.forEach(line => {
        // switch back to 1 canvas if this won't actually help.
        // var vrtCanvas = document.createElement('canvas');
        // vrtCanvas.width = 500;
        // vrtCanvas.height = 500;
        // var vrtCtx = vrtCanvas.getContext('2d');
        gCtx.lineWidth = line.strokeWidth
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.textAlign = line.align;
        gCtx.fillStyle = line.fill;
        gCtx.strokeStyle = line.stroke;
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);
        if (line.isFocused) {
            // const height = line.size * 1.5;
            // const height = line.size * 1.25;
            const height = line.size;
            const width = gCtx.measureText(line.txt).width
            gCtx.strokeStyle = 'white';
            gCtx.strokeRect(line.x - width / 2 - 10, line.y - height, gCtx.measureText(line.txt).width + 20, line.size + 15);
        }
        // gCtx.drawImage(vrtCanvas, 0, 0, gCanvas.width, gCanvas.height);
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
        await navigator.share({ title: "Meme Generator", url: "" });
    } catch (err) {
        console.error("Share failed:", err.message);
        renderShareOptions();
    }
});

function renderShareOptions() {
    /// func fires when web share API is not supported. 
    console.log('Share to Facebook =')
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()
    reader.onload = function (event) {
        var url = event.target.result
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = url
        gImg = img
        addNewImgToData(url)
    }
    reader.readAsDataURL(ev.target.files[0])
}




function renderImg(img) {
    document.querySelector('.meme-editor-container').style.display = 'flex';
    // renderCanvas();
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText();
}


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