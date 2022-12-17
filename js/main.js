'use strict'


function onInit(){
    onInitGallery()
    onInitMeme()
    renderDataList()
}



//get color value
function onColorPick(ev, name) {
    setLineTxColors(ev, name)

    renderMeme()

}

function onFontSizeChange(name){
    setFontSize(name)
 
    renderMeme()
}


function onSwitchLine(){
    const idx =  setSelectedLineIdx()
    setFocusState(idx)
    renderMeme()
    
    
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



            break

        case 'gallery':
            document.querySelector('.gallery').classList.remove('display')
            document.querySelector('.editor').classList.remove('display')
            break
    }
}



function onFlexable(){
    console.log('randomText:', randomText)
    gMeme.selectedImgId = getRandomInt(0,gImgs.length)
    addLine() 
    addLine() 
    gMeme.lines.forEach(line => line.size = getRandomInt(50,100) )
    gMeme.lines.forEach(line =>line.txt = randomText[getRandomInt(0,randomText.length)] )
    gMeme.lines.forEach(line =>line.fillColor = getRandomColor() )
    gMeme.lines.forEach(line =>line.textColor = getRandomColor() )

    renderMeme()
}
