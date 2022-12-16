'use strict'


var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gSelctedImg

const STORAGE_KEY = 'saved-memes'
let gSavedMemes = loadFromStorage(STORAGE_KEY) || []

var gMeme = {
    id: makeId(length = 6),
    selectedImgId: 5,
    selectedLineIdx: 0,
    img: '',
    lines: [
        {
            txt: '',
            size: 40,
            align: 'left',
            fillColor: 'red',
            textColor: 'red',
            isFocus: true,
            x: 250,
            y: 50,
        },
        {
            txt: 'I eat hello',
            size: 20,
            align: 'left',
            fillColor: 'red',
            textColor: 'red',
            isFocus: false,
            x: 250,
            y: 350
        }
    ]
}


var randomText = []

function getStings() {
    for (let i = 0; i < 15; i++) {

        randomText.push(makeLorem(2))
    }

}



let { lines } = gMeme.lines





function drawImg() {
    const elImg = new Image() // Create a new html img element
    elImg.src = gImgs[gMeme.selectedImgId].url // Send a network req to get that image, define the img src
    // setTimeout(() => {
    //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // }, 10);
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    return elImg
}


function drawText(line, x, y) {
    const text = line.txt
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.fillColor
    gCtx.fillStyle = line.textColor
    gCtx.font = `${line.size}px arial`;
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}


function setLineTxt(text) {
    gMeme.lines.find(line => line.isFocus).txt = text

}


function setImg(id) {
    gMeme.id = makeId(length = 6)
    gMeme.selectedImgId = id - 1
}


function setLineTxColors(color, key) {
    const memeToChange = gMeme.lines.find(line => line.isFocus)
    switch (key) {
        case 'fillColor':
            memeToChange.fillColor = color

            break
        case 'borderColor':
            memeToChange.textColor = color
            break
    }

}

function setSelectedLineIdx(id) {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx)

        gMeme.selectedLineIdx++
    }

    return gMeme.selectedLineIdx
}


function setFocusState(idx) {
    gMeme.lines.forEach(line => line.isFocus = false)
    gMeme.lines[idx].isFocus = true
}



function getMemeFromSaved(id) {

    const memeToLoad = gSavedMemes.find(meme => meme.id === id)
    memeToLoad.id = makeId(length = 6)

    gMeme = { ...memeToLoad }
    gMeme.id = makeId(length = 6)


}


function setDeleteMeme(id) {
    const idx = gSavedMemes.findIndex(meme => meme.id === id)
    gSavedMemes.splice(idx, 1)
    saveToStorage(STORAGE_KEY, gSavedMemes)

}




function setMemeToSave() {

    var image = gElCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    gMeme.img = image
    gMeme.id = makeId(length = 6)
    const currMeme = { ...gMeme }
    gSavedMemes.push(currMeme)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}



function setFontSize(name) {
    const lineTochange = gMeme.lines.find(line => line.isFocus)
    if (name === 'minus') {
        lineTochange.size--
    } else {
        lineTochange.size++
    }
}