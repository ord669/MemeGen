'use strict'

const STORAGE_MEME_KEY = 'savedMemes'

function onInit(){
    
    onInitGallery()
    onInitMeme()

}



//get color value
function onColorPick(ev, name) {
    setLineTxColors(ev, name)

    renderMeme()

}

function onFontSizeChange(name){
    console.log('clickes=d:', 'clickes')
    setFontSize(name)
   
    renderMeme()
}


function onSwitchLine(){
    const idx =  setSelectedLineIdx()
    setFocusState(idx)
    
    
}


function toggleDisplay(ev,pressedOn){
    if(ev){ev.stopPropagation()}
    
    console.log('pressedOn:',pressedOn )
    switch (pressedOn) {
        case 'memes':
            document.querySelector('.gallery').classList.add('display')
            document.querySelector('.editor').classList.add('display')
            document.querySelector('.meme-gallery').classList.remove('display')
            renderMemeGallery()
            break

        case 'about':
            document.querySelector('.gallery').classList.add('display')
            document.querySelector('.search').classList.add('display')
            document.querySelector('.editor').classList.remove('display')
            onInitMeme()



            break

        case 'gallery':
            document.querySelector('.gallery').classList.remove('display')
            document.querySelector('.editor').classList.remove('display')
            break
    }
}


function onFlexable(){
    // console.log(' getRandomInt(0,gImgs):',  getRandomInt(1,gImgs.length+1))
    gMeme.selectedImgId = getRandomInt(1,gImgs.length+1)
    renderMeme()
}

function onSaveMeme(){
    var image = gElCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    gSavedMemes.push(image)

    saveToStorage(STORAGE_MEME_KEY, gSavedMemes)

}




