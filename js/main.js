'use strict'


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
    if(name === 'minus'){
        gFontSize--
    }else{
        gFontSize++
    }
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