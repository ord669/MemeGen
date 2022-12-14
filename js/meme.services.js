'use strict'


var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gSelctedImg 

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            fillColor: 'red',
            textColor: 'red',
            isFocus:true
        },
        {
            txt: 'I eat hello',
            size: 20,
            align: 'left',
            fillColor: 'red',
            textColor: 'red',
            isFocus:false
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


let { lines} = gMeme.lines

let gFillColor = '#FFFFFF'
let gBorderColor = '#bdf524'
let gFontSize = 40


// function getMeme() {
//      drawImg()
     
// }


function getMeme() {
    
    const elImg = new Image() // Create a new html img element
    elImg.src = gImgs[gMeme.selectedImgId].url // Send a network req to get that image, define the img src
    // setTimeout(() => {
    //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // }, 10);
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gMeme.lines[0], 250, 50)
        drawText(gMeme.lines[1], 250, 350)

    }
}



function drawText(line, x, y) {
    console.log('line:',line )
    const text = line.txt
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.fillColor
    gCtx.fillStyle = line.textColor
    gCtx.font = `${gFontSize}px arial`;
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}


function setLineTxt(text) {
    gMeme.lines.find(line => line.isFocus).txt= text
   
}


function setImg(id) {
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