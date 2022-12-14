'use strict'


function onInit(){
    onInitGallery()
    onInitMeme()

}



//get color value
function onColorPick(ev, name) {
    switch (name) {
        case 'fillColor':
            gFillColor = ev
            console.log('gColorFill:', gFillColor)

            break
        case 'borderColor':
            gBorderColor = ev
            console.log('gColorBorder:', gBorderColor)
            break
    }
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