'use strict'

let gElCanvas
let gCtx
let gStartPos

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInitMeme() {
    if(loadFromStorage(STORAGE_MEME_KEY).length > 0) renderMemeGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    //Calc the center of the canvas

    //Create the circle in the center
    // createCircle(center)

    addListeners()
    // renderCanvas()
    renderMeme()
    renderGallery()

}


function renderCanvas() {
    //Set the backgournd color to grey
    gCtx.fillStyle = '#ede5ff'
    //Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    // renderCircle()
}





function renderMeme() {
    const {x : centerX , y : centerY} = getCenter(gElCanvas)
    
   

    const elImg = new Image() // Create a new html img element
    elImg.src = gImgs[gMeme.selectedImgId].url // Send a network req to get that image, define the img src
    // setTimeout(() => {
    //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // }, 10);
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gMeme.lines[0], centerX, centerY-(gElCanvas.height/3))
        drawText(gMeme.lines[1], centerX, centerY+(gElCanvas.height/3))

    }
}






function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // if (!isCircleClicked(pos)) return
    // setCircleDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // const { isDrag } = getCircle()

    // if (!isDrag) return
    renderMeme()

    
    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    // moveCircle(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    // renderCanvas()
}

function onUp() {
    // setCircleDrag(false)
    document.body.style.cursor = 'grab'
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderMeme()
}


function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        console.log('ev:', ev)
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onTextInput(ev){
    setLineTxt(ev)
    renderMeme()

}



function renderMemeGallery(){
    const strHTML = gSavedMemes.map(img => `
    <img class="photo"  src="${img}" alt="">
    `)
    console.log('strHTML:',strHTML )
    document.querySelector('.meme-gallery').innerHTML = strHTML.join('')
}