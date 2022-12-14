'use strict'


let gMeme 
let gMemeImg = '/images/dog.jpg'
let gText = ''

let gFillColor = '#FFFFFF'
let gBorderColor = '#bdf524'
let gFontSize = 40 


function getMeme(){
    gMeme =  drawImg()

    return gMeme
}






function drawImg() {
    const elImg = new Image() // Create a new html img element
    elImg.src = gMemeImg // Send a network req to get that image, define the img src
    // setTimeout(() => {
    //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // }, 10);
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gText, 200, 50)

    }
}



function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gBorderColor
    gCtx.fillStyle = gFillColor
    gCtx.font = `${gFontSize }px arial`;
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}


function setLineTxt(text){
    gText = text 
}


function setImg(url){
    gMemeImg = url
}