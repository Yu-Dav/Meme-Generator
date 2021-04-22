'use strict';

// fa not working?
// ngrok. 
// img ratio square? 
// btns in modal onClickImg modal - add funcs.
// white rect when downloading should be removed 
// images -> img 
// controllers/selectors go for one of them.
// navbar movment when hovered - need to fix.
// onBlue to remove input of text imput
// pics ratio on the canvas needs to be looked at
// 

var gCanvas;
var gCtx;
var gImg;

function onInit() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners(gCanvas);
    // renderCanvas();
    renderImgGallery();
    renderKeywords()
}

function renderCanvas() {
    resizeCanvas();
    const img = new Image();
    const memeImg = getImgByID();
    img.src = memeImg.url;
    img.onload = () => {
        const widthRatio = img.naturalWidth / gCanvas.width;
        const heightRatio = img.naturalHeight / gCanvas.height;
        gCtx.drawImage(img, 0, 0, img.naturalWidth / widthRatio, img.naturalHeight / heightRatio);
        renderText();
    }
}

function renderText() {
    const lines = getMeme().lines;
    lines.forEach(line => {
        gCtx.lineWidth = line.strokeWidth
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.textAlign = line.align;
        gCtx.fillStyle = line.fill;
        gCtx.strokeStyle = line.stroke;
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);
        if (line.isFocused) {
            const height = line.size;
            const width = gCtx.measureText(line.txt).width
            gCtx.lineWidth = '2';
            gCtx.strokeStyle = 'white';
            gCtx.strokeRect(line.x - width / 2 - 10, line.y - height, gCtx.measureText(line.txt).width + 20, line.size + 15);
        }
    });
}

function renderImgGallery() {
    const imgs = getImgs();
    const strHTMLs = imgs.map(img => {
        return `
        <img class="img-hover" onclick="onSelectImage(this.dataset.imgId)" data-img-id="${img.id}" src="imgs/${img.id}.jpg" alt="Image ${img.id}">
        `
    });
    const elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = strHTMLs.join('');
}

function renderKeywords() {
    const keywordsObj = getKeywords();
    const keywords = Object.entries(keywordsObj);
    /// need to caps the words.
    const strHTMLs = keywords.map(key => {
        return `
        <li style="font-size: ${key[1]}px;" onclick="onFilterImgByKeyword(this.innerText)">${key[0]}</li>
        `
    });
    const elList = document.querySelector('.keywords');
    elList.innerHTML = strHTMLs.join('');
    // Object.keys(keywords).map(function(key, val) {
    //     console.log(`The key is ${keywords[key]}`);
    //     console.log(`The key is ${keywords[val]}`);
    //   });
    // for (const [key, val] of Object.entries(keywords)) {
    //     'hello'
    //     console.log(`The key is ${key}`)
    //     console.log(`The val is ${val}`)
    // }
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
        <img data-img-id="${meme.id}" onclick="onSavedMemeClick('${meme.id}')" src="${meme.url}" alt="Saved meme">
        `
    });
    document.querySelector('.saved-memes-container').innerHTML = strHTMLs.join('');
}

function onFilterImgByKeyword(keyword) {
    // keywords = keywords.toLowerCase();
    setFilter(keyword);
    updateKeywordRating(keyword);
    renderImgGallery();
}

function onSelectImage(imgId) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.querySelector('.meme-editor-container').classList.add('open-editor');
    updateMeme('img', imgId);
    renderCanvas();
    renderPlaceHolder();
    // only renderText to smear.....
}

function closeEditor() {
    document.querySelector('.meme-editor-container').classList.remove('open-editor');
}

function onInputChange(val) {
    // need to fix- when changing from direction x to y, old value is kepts which makes the line jump
    if (!gLastChangedDirect) return;
    if (gLastChangedDirect === 'right' || gLastChangedDirect === 'left') {
        updateMeme('x', val);
        renderCanvas();
        return;
    }
    updateMeme('y', val);
    renderCanvas();
}

function onSavedMemeClick(id) {
    // console.log('var =', id);
    const elImg = document.querySelector(`[data-img-id='${id}']`)
    elImg.classList.toggle('meme-clicked');
    const elControllers = document.querySelector('.save-meme-options');
    elControllers.hidden = false;
    // console.log('elImg =', elImg)
    // func working just needs to be assigned to the right btn
    // removeMemeFromStorage(id); 
}

// function onCanvasClick() {
//     console.log ('canvas clicked =')
// }

function onOpenSavedModal() {
    const elModal = document.querySelector('.saved-memes-modal');
    const elScreen = document.querySelector('.screen');
    elModal.hidden = false;
    elModal.style.opacity = '1';
    elModal.style.zIndex = '1'
    elScreen.hidden = false;
    elScreen.style.zIndex = '1'
    renderSavedMemes();
}

function onCloseSavedModal() {
    const elModal = document.querySelector('.saved-memes-modal');
    const elScreen = document.querySelector('.screen');
    elModal.hidden = true;
    elScreen.hidden = true;
}

function onOpenClearConfirm() {
    document.querySelector('.clear-confirm').hidden = false;
}

function onCloseClearConfirm() {
    document.querySelector('.clear-confirm').hidden = true;
}

function onClearSavedMemes() {
    // move to service
    localStorage.clear();
    onCloseSavedModal();
}

// ACTIONS

function onDownload(elLink) {
    // render image again without white rect.
    setTimeout(download(elLink), 5000)
}

function download(elLink) {
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
    const reader = new FileReader()
    reader.onload = function (event) {
        const url = event.target.result
        const img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = url
        gImg = img
        addNewImgToData(url);
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    document.querySelector('.meme-editor-container').style.display = 'flex';
    // renderCanvas();
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    renderText();
}

// function onShare() {
//     console.log('var =')

// }

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}