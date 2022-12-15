'use strict'

let gElCanvas
let gCtx
let gStartPos

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInitMeme() {
    renderMemeGallery()
    getStings()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    //Calc the center of the canvas
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    //Create the circle in the center
    // createCircle(center)

    addListeners()
    // renderCanvas()
    renderMeme()

}


function renderCanvas() {
    //Set the backgournd color to grey
    gCtx.fillStyle = '#ede5ff'
    //Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    // renderCircle()
}


function renderMeme(){
    // getMeme()
    drawImg()
    drawImg().onload = () => {
        gMeme.lines.forEach(line => {
            drawText(line, line.x, line.y)
        })
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

    
    const pos = getEvPos(ev)
    console.log('pos:', pos)
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





              

function getFont(fontSize,fontBase) {

    var ratio = fontSize / fontBase;   // calc ratio
    var size = gElCanvas.width * ratio;   // get font size based on current width
    return (size|0) + 'px sans-serif'; // set font
}



function setMemeToSave(){

    var image = gElCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    gMeme.img = image
    gMeme.id = makeId(length = 6)

}


function renderMemeGallery(){
    
    const strHTML = gSavedMemes.map(meme => `
    <div class="meme-card"><button onclick="onDeleteMeme('${meme.id}')" class="delete-btn">X</button>
    <img class="photo" onclick="onMemeSelect('${meme.id}')" src="${meme.img}" alt="">
    </div>
    `)
    document.querySelector('.meme-gallery').innerHTML = strHTML.join('')
}



function onMemeSelect(id){
    console.log('id:',id )
    getMemeFromSaved(id)
    renderMeme()
}


function onDeleteMeme(id){
console.log('id:', id)
    setDeleteMeme(id)
    renderMemeGallery()

}