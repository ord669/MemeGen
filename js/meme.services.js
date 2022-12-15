'use strict'


var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gSelctedImg 

const STORAGE_KEY = 'saved-memes'
let gSavedMemes = loadFromStorage(STORAGE_KEY) || []

var gMeme = {
    id:makeId(length = 6),
    selectedImgId: 5,
    selectedLineIdx: 0,
    img:'',
    lines: [
        {
            txt: '',
            size: 40,
            align: 'left',
            fillColor: 'red',
            textColor: 'red',
            isFocus:true,
            x:250,
            y:50,
        },
        {
            txt: 'I eat hello',
            size: 20,
            align: 'left',
            fillColor: 'red',
            textColor: 'red',
            isFocus:false,
            x:250,
            y:350
        }
    ]
}
var gImgs = [
    { 
        id: 1, 
        url: 'images/meme-imgs_square/1.jpg', 
        keywords: ['funny', 'cat'] 
    },
    { 
        id: 2, 
        url: 'images/meme-imgs_square/2.jpg', 
        keywords: ['funny', 'cat'] 
    },
    { 
        id: 3, 
        url: 'images/meme-imgs_square/3.jpg', 
        keywords: ['funny', 'cat'] 
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

var randomText =[]

function getStings(){
    for(let i = 0 ; i <15 ; i++){
        
        randomText.push(makeLorem( 2))
}
        
}
console.log('randomText:',randomText )



let { lines} = gMeme.lines

let gFillColor = '#FFFFFF'
let gBorderColor = '#bdf524'
let gFontSize = 40


// function getMeme() {
//      drawImg()
     
// }


// function getMeme() {
    
//     drawImg()
//     drawImg().onload = () => {
//         gMeme.lines.forEach(line =>{
//             drawText(line, line.x, line.y)

//         })
//     }
// }


function drawImg() {
    const elImg = new Image() // Create a new html img element
    elImg.src = gImgs[gMeme.selectedImgId].url // Send a network req to get that image, define the img src
    // setTimeout(() => {
    //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // }, 10);
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    return elImg
}


function drawText(line, x, y) {
    const text = line.txt
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.fillColor
    gCtx.fillStyle = line.textColor
    gCtx.font = `${
        40
        
    }px arial`;
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}


function setLineTxt(text) {
    gMeme.lines.find(line => line.isFocus).txt= text
   
}


function setImg(id) {
    gMeme.id=makeId(length = 6)
    gMeme.selectedImgId = id -1
}


function setLineTxColors(color,key) {
    const memeToChange = gMeme.lines.find(line => line.isFocus)
    switch (key) {
        case 'fillColor':
            memeToChange.fillColor = color

            break
        case 'borderColor':
            memeToChange.textColor = color
            break
    }
   
}

function setSelectedLineIdx(id){
    if(gMeme.selectedLineIdx === gMeme.lines.length - 1 ){
        gMeme.selectedLineIdx = 0
    }else{
        console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx)

        gMeme.selectedLineIdx ++
    }

    return gMeme.selectedLineIdx
}


function setFocusState(idx){
    gMeme.lines.forEach(line => line.isFocus =false)
    gMeme.lines[idx].isFocus = true
}



function getMemeFromSaved(id){
    
    const memeToLoad = gSavedMemes.find(meme => meme.id === id)
    memeToLoad.id = makeId(length = 6)
    
    gMeme = {...memeToLoad}
    gMeme.id = makeId(length = 6)
    // gMeme.id=makeId(length = 6)

    
}


function  setDeleteMeme(id){
    const idx = gSavedMemes.findIndex(meme => meme.id === id)
    gSavedMemes.splice(idx,1)
    saveToStorage(STORAGE_KEY, gSavedMemes)

}
