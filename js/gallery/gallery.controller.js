'use strict'



function onInitGallery() {
    renderGallery()
}

function renderGallery(filterd) {
    if (!filterd) {
        gImgs = [
            {
                id: 1,
                url: 'images/meme-imgs_square/1.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 2,
                url: 'images/meme-imgs_square/2.jpg',
                keywords: ['dogs']
            },
            {
                id: 3,
                url: 'images/meme-imgs_square/3.jpg',
                keywords: ['dogs', 'baby']
            },
            {
                id: 4,
                url: 'images/meme-imgs_square/4.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 5,
                url: 'images/meme-imgs_square/5.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 6,
                url: 'images/meme-imgs_square/6.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 7,
                url: 'images/meme-imgs_square/7.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 8,
                url: 'images/meme-imgs_square/8.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 9,
                url: 'images/meme-imgs_square/9.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 10,
                url: 'images/meme-imgs_square/10.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 11,
                url: 'images/meme-imgs_square/11.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 12,
                url: 'images/meme-imgs_square/12.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 13,
                url: 'images/meme-imgs_square/13.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 14,
                url: 'images/meme-imgs_square/14.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 15,
                url: 'images/meme-imgs_square/15.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 16,
                url: 'images/meme-imgs_square/16.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 17,
                url: 'images/meme-imgs_square/17.jpg',
                keywords: ['funny', 'cat']
            },
            {
                id: 18,
                url: 'images/meme-imgs_square/18.jpg',
                keywords: ['funny', 'cat']
            }
        
        ];
        var strHTML = gImgs.map(img => `
        <img class="photo" onclick="onImgSelect(${img.id})" src="images/meme-imgs_square/${img.id}.jpg" alt="">
        `)

    } else {
        var strHTML = filterd.map(img => `
        <img class="photo" onclick="onImgSelect(${img.id})" src="images/meme-imgs_square/${img.id}.jpg" alt="">
        `)
    }

    document.querySelector('.gallery').innerHTML = strHTML.join('')
}

function onImgSelect(id) {
    gMeme.lines=[]
    setImg(id)
    renderMeme()
    
    toggleDisplay(false, 'editor')

}




//* DATALIST
function renderDataList() {
    const options = Object.keys(gKeywordSearchCountMap)
    const strHTML = options.map(li => `
    <option value="${li}"></option>
    `)



    document.querySelector('datalist').innerHTML = strHTML.join('')
}


function onDataList(filterBy) {
    const options = Object.keys(gKeywordSearchCountMap)
    if (!options.includes(filterBy)) gKeywordSearchCountMap[filterBy] = 1
    renderGallery(filterGallery(filterBy))

}




function renderSearchWords() {
    const searchKeys = Object.keys(gKeywordSearchCountMap)
    const strHTML = searchKeys.map(searchKey => `
    <p style="font-size:${17 + gKeywordSearchCountMap[searchKey]}px;" onclick="onClickSearchWord('${searchKey}')">${searchKey}</p>
    `
    )


    document.querySelector('.search-words').innerHTML = strHTML.join('')
}

function onClickSearchWord(searchKey) {
    gKeywordSearchCountMap[searchKey]++
    onDataList(searchKey)
    renderSearchWords()

    console.log('searchKey:', searchKey)
}