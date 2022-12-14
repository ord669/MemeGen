'use strict'

let gElCanvas
let gCtx
let gStartPos

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInitMeme() {
    renderEmojiGallery()
    renderMemeGallery()
    getStings()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    //Calc the center of the canvas
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    //Create the circle in the center
    createCircle(center)

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


function renderMeme() {
    // getMeme()
    drawImg()
    drawImg().onload = () => {
        gMeme.lines.forEach(line => {
            drawText(line, line.x, line.y)

        })
    }

}





function onDown(ev) {
    const pos = getEvPos(ev)
    // pick line
    findClick(pos)

    // Get the ev pos from mouse or touch

    if (!findClick(pos)) return
    console.log('stopHere:', 'stopHere')
    setLineDrag(true)

    //Save the pos we start from
    gStartPos = pos
    console.log('here:', 'here')
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gMeme.lines.find(line => line.isFocus)) return

    const { isDrag } = gMeme.lines.find(line => line.isFocus)

    if (!isDrag) return



    const pos = getEvPos(ev)
    const { x, y } = pos

    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    if (isCircleClicked(pos)) {
        if (x > gStartPos.x || y > gStartPos.y) onResizeLine(true)
        if (x < gStartPos.x || y < gStartPos.y) onResizeLine(false)

    }

    moveLine(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme()
}

function onUp() {
    // setCircleDrag(false)
    setLineDrag(false)

    document.body.style.cursor = 'grab'
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
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

function onTextInput(ev) {
    setLineTxt(ev)
    renderMeme()

}
function onSaveMeme() {
    cancelFocus()
    setTimeout(() => {

        setMemeToSave()
        renderMemeGallery()
        renderMeme()
        toggleDisplay(false, 'memes')


        
    }, 100);
}



function renderMemeGallery() {

    const strHTML = gSavedMemes.map(meme => `
    <div class="meme-card"><button class="button" onclick="onDeleteMeme('${meme.id}')" class="delete-btn">X</button>
    <img class="photo" onclick="onMemeSelect('${meme.id}')" src="${meme.img}" alt="">
    </div>
    `)
    document.querySelector('.meme-gallery').innerHTML = strHTML.join('')
}



function onMemeSelect(id) {
    toggleDisplay(false, 'editor')
    console.log('id:', id)
    getMemeFromSaved(id)
    renderMeme()
}


function onDeleteMeme(id) {
    console.log('id:', id)
    setDeleteMeme(id)
    renderMemeGallery()

}


function renderEmojiGallery() {
    const strHTML = emojis.map(emoji => `
    <div class="emoji" onclick="onEmojiSelect('${emoji.name}')">${emoji.emoji}
    </div>
    `)
    document.querySelector('.emojis').innerHTML = strHTML.join('')
}



function onEmojiSelect(emoji) {
    getEmojiSelect(emoji)
    renderMeme()
}


function onAddLine() {
    addLine()
    renderMeme()

}






// function isClicked(clickedPos) {

//     const line = gMeme.lines.find(line => line.isFocus)
//     console.log('lineos:', line)
//     const { x, y, size } = line

//     // Calc the distance between two dots
//     const distance = Math.sqrt((x - clickedPos.x) ** 2 + (y - clickedPos.y) ** 2)
//     //If its smaller then the radius of the circle we are inside

//     return distance <= size
// }






function onDeleteLine() {
    removeLine()
    renderMeme()
}






//* upload to facebook

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}



//* download


function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}











//*! circle
function drawArc(x, y, size = 6, color = 'blue') {
    gCtx.beginPath()
    gCtx.lineWidth = '6'
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.fillStyle = color
    gCtx.fill()

}



function renderCircle() {
    //Get the props we need from the circle
    const { pos, color, size } = getCircle()
    //Draw the circle
    drawArc(pos.x, pos.y, size, color)
}




function onResizeLine(minusPlus) {
    if (minusPlus) {
        resizeLine(minusPlus)
    } else {
        resizeLine(false)

    }

    renderMeme()
}





