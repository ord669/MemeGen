'use strict'

var gKeywordSearchCountMap = { 
    'funny': 12, 
    'cat': 16, 
    'baby': 3, 
    'hat': 8, 
    'haim': 4, 
    'dogs': 1
}

//*! finish filter
var gImgs = [
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


function filterGallery(filterBy){
    const filterGallery = gImgs.filter(img => img.keywords.includes(filterBy))
    return filterGallery
}
