'use strict'


function onInit() {
    onInitGallery()
    onInitMeme()
    renderDataList()
    renderSearchWords()
}



//get color value
function onColorPick(ev, name) {
    setLineTxColors(ev, name)

    renderMeme()

}

function onFontSizeChange(name) {
    setFontSize(name)

    renderMeme()
}


function onSwitchLine() {
    const idx = setSelectedLineIdx()
    setFocusState(idx)
    renderMeme()


}


function toggleDisplay(ev, pressedOn) {
    if (ev) ev.stopPropagation() 

    switch (pressedOn) {
        case 'memes':
            document.querySelector('.gallery').classList.add('display')
            document.querySelector('.editor').classList.add('display')
            document.querySelector('.seacrh-container').classList.add('display')
            document.querySelector('.meme-gallery').classList.remove('display')
            break

        case 'gallery':
            document.querySelector('.seacrh-container').classList.remove('display')

            document.querySelector('.gallery').classList.remove('display')
            document.querySelector('.editor').classList.add('display')
            document.querySelector('.meme-gallery').classList.add('display')
            renderGallery(false)

            break
            case 'editor':
            document.querySelector('.seacrh-container').classList.add('display')

            document.querySelector('.gallery').classList.add('display')
            document.querySelector('.editor').classList.remove('display')
            document.querySelector('.meme-gallery').classList.add('display')

            break
    }
}



function onFlexable() {
    toggleDisplay(false,'editor')
    console.log('randomText:', randomText)
    gMeme.selectedImgId = getRandomInt(0, gImgs.length)
    addLine()
    addLine()
    gMeme.lines.forEach(line => line.size = getRandomInt(50, 100))
    gMeme.lines.forEach(line => line.txt = randomText[getRandomInt(0, randomText.length)])
    gMeme.lines.forEach(line => line.fillColor = getRandomColor())
    gMeme.lines.forEach(line => line.textColor = getRandomColor())

    renderMeme()
}




function toggleMenu(){
    document.body.classList.toggle('menu-open')

}