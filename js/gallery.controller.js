'use strict'



function onInitGallery(){
    renderGallery()
}

function renderGallery(){
    const strHTML = `
    <img onclick="onImgSelect(this.src)" src="images/meme-imgs_square/1.jpg" alt="">
    <img onclick="onImgSelect(this.src)" src="/images/dog.jpg" alt="">

    `

    document.querySelector('.gallery').innerHTML = strHTML
}

function onImgSelect(url){
    setImg(url)
    renderMeme()

}