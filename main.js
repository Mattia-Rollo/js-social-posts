//  Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post.
// Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
// - id del post, numero progressivo da 1 a n
// - nome autore,
// - foto autore,
// - data in formato americano (mm-gg-yyyy),
// - testo del post,
// - immagine (non tutti i post devono avere una immagine),
// - numero di likes.
// *Non è necessario creare date casuali*
// *Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)*
// Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
// Milestone 3- Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
// BONUS
//  1. Formattare le date in formato italiano (gg/mm/aaaa)
// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
//  3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
// Consigli del giorno:
// > Ragioniamo come sempre a step.
// > Prima scriviamo nei commenti la logica in italiano e poi traduciamo in codice.
// > console.log() è nostro amico.
// > Quando un pezzo di codice funziona, chiediamoci se possiamo scomporlo in funzioni più piccole.
"use strict";

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2022-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "",
        "author": {
            "name": "Sofia Perlari",
            "image": null
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "",
        "author": {
            "name": "Alessandro Sainato",
            "image": null
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];


const container = document.getElementById('container');

let postsHtml = ''; 

for(let obj of posts) {
    
    let currentTime = new Date();
    let created = new Date(obj.created);
    
    let time = currentTime.getMonth() - created.getMonth();
    
    
    console.log(time);

    let firstLetters = obj.author.name.split(' ').map(word => word[0]).join('');

    let iconProfile = (obj.author.image == null) ? `<div class='profile-pic-default'><span>${firstLetters}</span></div>` :`<img class="profile-pic" src="${obj.author.image}" alt="${obj.author.name}"> `;

    postsHtml += `
    <div class="post">
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
                ${iconProfile}                
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${obj.author.name}</div>
                <div class="post-meta__time">${time} mesi fa</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${obj.content}</div>
    <div class="post__image">
        <img src="${obj.media}" alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" href="#nogo" data-postid="${obj.id}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${obj.id}" class="js-likes-counter">${obj.likes}</b> persone
            </div>
        </div> 
    </div>            
</div>
    `;

}

container.innerHTML = postsHtml;

const myLikePost = [];

// console.log('Hello world'.split(' ').map(word => word[0]));
const likeCounter = document.getElementsByClassName('js-likes-counter')
const btnsLike = document.getElementsByClassName('js-like-button');

for(let btn of btnsLike){
    let isLiked = false;
    // console.log(btn);
    btn.addEventListener('click', function(){
        
    //value 
    let dataPostid = btn.dataset.postid;
    //
    // console.log(dataPostid);
    if(!isLiked){
        btn.classList.add('like-button--liked');
        isLiked = true;
        // console.log(btn);
        
        posts[dataPostid-1].likes += 1;
        
        likeCounter[dataPostid-1].innerHTML = posts[dataPostid-1].likes;
        
        myLikePost.push(dataPostid);
        // console.log(posts[this.dataset.postid-1].likes);
        
    }else{
        isLiked = false;
        btn.classList.remove('like-button--liked')
        posts[dataPostid-1].likes -= 1;
        likeCounter[dataPostid-1].innerHTML = posts[dataPostid-1].likes;
        console.log(dataPostid);
        let index = myLikePost.indexOf(dataPostid);
        
        if(myLikePost.includes(dataPostid)){
            myLikePost.splice(index,1);
        };
    }
    console.log(isLiked);
    console.log(myLikePost);
}
)
}



// function like(){
//     let isLiked;
//     console.log(isLiked)
//     if(!isLiked){
//         isLiked = true;
//     }else {
//         isLiked = false;
//     }
    
// }
// like();
