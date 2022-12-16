'use strict'


let gSelctedImg

const STORAGE_KEY = 'saved-memes'
let gSavedMemes = loadFromStorage(STORAGE_KEY) || []

var gMeme = {
    id: makeId(length = 6),
    selectedImgId: 5,
    selectedLineIdx: 0,
    img: '',
    lines: [

    ]
}


const emojis = [
    {
        emoji: '😀',
        name: 'happy'

    },
    {
        emoji: '😅',
        name: 'sweet'

    },
    {
        emoji: '🥹',
        name: 'about-to-cry'

    },
    {
        emoji: '😜',
        name: 'thong-out'

    },
    {
        emoji: '😱',
        name: 'sceard'

    },
    {
        emoji: '🤯',
        name: 'mind-blown'

    },
    {
        emoji: '😬',
        name: 'afraid'

    },
    {
        emoji: '🤢',
        name: 'sick'

    }
]

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

    const metrics = gCtx.measureText(text);
    line.width = metrics.width
    line.hight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    line.borderTop = y - metrics.actualBoundingBoxAscent
    line.borderBottom = y + line.hight
    line.borderLeft = x - metrics.actualBoundingBoxLeft - 5
    line.borderRight = x + line.width + 10

    if (text.length > 0 && line.isFocus) drawRect(x - metrics.actualBoundingBoxLeft - 5, y - metrics.actualBoundingBoxAscent - 5, line.width + 10, line.hight + 10)


    console.log('line:', line)
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


function getEmojiSelect(emoji) {
    const emojiToAdd = emojis.find(emo => emo.name === emoji)
    const emojiToPush = createLine(emojiToAdd.emoji)
    gMeme.lines.push(emojiToPush)
    console.log('emojiToPush:', emojiToPush)
    makeFocus(emojiToPush.id)

}


function createLine(txt = 'new line', x = 250, y = 350) {
    return {
        id: makeId(length = 6),
        txt,
        size: 40,
        align: 'left',
        fillColor: 'red',
        textColor: 'red',
        isFocus: false,
        x,
        y

    }
}


function addLine() {
    const newLine = createLine()
    gMeme.lines.push(newLine)
    makeFocus(newLine.id)

}

function setLineWidth() {

}




function drawRect(x, y, width, hight) {
    // First way - drawing a rect by specifying a patch using the .rect() method,
    // and then filling it with the .fill() method and stroking it with the .stroke() method
    gCtx.beginPath()
    // gCtx.rect(x, y, 150, 150)
    // gCtx.strokeStyle = 'black'
    // gCtx.stroke()
    // gCtx.fillStyle = 'orange'
    // gCtx.fill()

    // Second way - using the built in .fillRect() and .strokeRect() methods to directly
    // paint on the canvas, without using a path
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x, y, width, hight)
}



function setLineDrag(isDrag) {
    gMeme.lines.find(line => line.isFocus).isDrag = isDrag

    // gMeme.lines[gMeme.selectedLineIdx]
}




function moveLine(dx, dy) {
    console.log('gMeme.lines.find(line => line.isFocus):', gMeme.lines.find(line => line.isFocus))
    gMeme.lines.find(line => line.isFocus).x += dx
    gMeme.lines.find(line => line.isFocus).y += dy
}



function makeFocus(id) {
    if (!id) return
    gMeme.lines.forEach(line => line.isFocus = false)
    const focusedLine = gMeme.lines.find(line => line.id === id)
    if (focusedLine) focusedLine.isFocus = true

}



function findClick(clickedPos) {
    const { x, y } = clickedPos

    console.log('clickedPos.x:', clickedPos.x)
    console.log('clickedPos.y:', clickedPos.y)
    console.log('x:', x)
    console.log('y:', y)


    const lineFind = gMeme.lines.find(line =>
        x > line.borderLeft  &&
        x < line.borderRight  &&
        y < line.borderBottom &&
        y > line.borderTop
    )
    console.log('lineFind:', lineFind)
    if (lineFind) makeFocus(lineFind.id)
    // if(x - (width/2)<x &&x < x+(width/2)){
    //     
    // }

}


function clickAndChoose(clickedPos) {
    const lineFind = gMeme.lines.find(line => {
        const { x, y, size } = line
        const distance = Math.sqrt((x - clickedPos.x) ** 2 + (y - clickedPos.y) ** 2)
        return distance <= size

    })
    console.log('lineFind:', lineFind)
    makeFocus(lineFind.id)
    console.log('lineFind:', lineFind)

    // Calc the distance between two dots
    //If its smaller then the radius of the circle we are inside

}






function removeLine(){
    const idx = gMeme.lines.findIndex(line => line.isFocus)
    gMeme.lines.splice(idx, 1)

}

