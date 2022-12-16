'use strict'



function onInitGallery(){
    renderGallery()
}

function renderGallery(filterd){
    if(!filterd){
        var strHTML = gImgs.map(img => `
        <img class="photo" onclick="onImgSelect(${img.id})" src="images/meme-imgs_square/${img.id}.jpg" alt="">
        `)

    }else{
        var strHTML = filterd.map(img => `
        <img class="photo" onclick="onImgSelect(${img.id})" src="images/meme-imgs_square/${img.id}.jpg" alt="">
        `)
    }

    document.querySelector('.gallery').innerHTML = strHTML.join('')
}

function onImgSelect(id){
    toggleDisplay(false,'about')
    console.log('id:', id)
    setImg(id)
    console.log('gMeme.id :', gMeme.id )
    renderMeme()

}




//* DATALIST
function renderDataList(){
    const options = Object.keys(gKeywordSearchCountMap)
    const strHTML = options.map( li =>`
    <option value="${li}"></option>
    `)



    document.querySelector('datalist').innerHTML = strHTML.join('')
}


function onDataList(filterBy){
    renderGallery(filterGallery(filterBy))
    
    console.log('filterBy:', filterBy)
}