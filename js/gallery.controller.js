'use strict'



function onInitGallery(){
    renderGallery()
}

function renderGallery(){
    const strHTML = gImgs.map(img => `
    <img class="photo" onclick="onImgSelect(${img.id})" src="images/meme-imgs_square/${img.id}.jpg" alt="">
    `)

    document.querySelector('.gallery').innerHTML = strHTML.join('')
}

function onImgSelect(id){
    toggleDisplay(false,'about')
    console.log('id:', id)
    setImg(id)
    console.log('gMeme.id :', gMeme.id )
    renderMeme()

}