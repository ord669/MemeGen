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