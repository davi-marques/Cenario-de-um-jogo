const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 564;

const largura = canvas.width;
const altura = canvas.height;

let left = right = up = down = false;

// Contador de sprites
let count = 0;
let posI = 0;
let Up_ou_Down = false;

// Array
let sprite = [];
let blocks = [];



// Imagens
const bg = new Image();
bg.src = 'floresta.png';

const heroImg = new Image();
heroImg.src = 'hero.png';

let hero = {
    speed: 2.6,

    srcX: 0,
    srcY: 1,

    width: 32,
    height: 32,

    posX: 700,
    posY: 228,
}



// Funções

window.addEventListener('keydown', apertou, false);
window.addEventListener('keyup', tirou, false);

function apertou(event) {
    let key = event.keyCode;
    switch (key) {
        case 87:
            up = true;
            down = false;
            left = false;
            right = false;
        break;
        case 65:
            up = false;
            down = false;
            left = true;
            right = false;
        break;
        case 83:
            up = false;
            down = true;
            left = false;
            right = false;
        break;
        case 68:
            up = false;
            down = false;
            left = false;
            right = true;
        break;
    }
}
function tirou(event){
    let key = event.keyCode;
    switch (key) {
        case 87:
            up = false;
        break;
        case 65:
            left = false;
        break;
        case 83:
            down = false;
        break;
        case 68:
            right = false;
        break;
    }
}


function spri(posY){
    count++;
    hero.srcY = hero.height * posY;
    if(count >= 20){
        count = 0;
    }
    hero.srcX = Math.floor(count / 10) * hero.width;
}

function animation(){

    if (down) { // Para baixo
        spri(0);
        posI = 0;
        Up_ou_Down = true;

    } else if (up) { // Para cima
        spri(2);
        posI = 2;
        Up_ou_Down = true;

    } else if (right) { // Para direita
        spri(1);
        posI = 1;
        Up_ou_Down = false;

    } else if (left) { // Para esquerda
        spri(3);
        posI = 3;
        Up_ou_Down = false;

    } else {
        count = 0;
        hero.srcY = hero.height * posI;
        if (Up_ou_Down) {
            hero.srcX = Math.floor(20 / 10) * hero.width;
        } else {
            hero.srcX = Math.floor((count+20) / 10) * hero.width;
        }
    }
}


function render(){
    ctx.clearRect(0, 0, largura, altura);
    ctx.drawImage(bg, 0, 0, largura, altura);
    ctx.drawImage(heroImg, hero.srcX, hero.srcY, hero.width, hero.height, hero.posX, hero.posY, hero.width, hero.height);
    animation(); // Animação

    for(let i in sprite){
        let spr = sprite[i];
        ctx.fillStyle = spr.color;
        ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
    }
}


function movement(){
    if (up){
        hero.posY -= hero.speed;
    } else if (down) {
        hero.posY += hero.speed;
    } else if (left) {
        hero.posX -= hero.speed;
    } if (right) {
        hero.posX += hero.speed;
    }

    hero.posX = Math.max(0, Math.min(largura - hero.width, hero.posX));
    hero.posY = Math.max(0, Math.min(altura - hero.height, hero.posY));

    for (let c in blocks) {
        let blk = blocks[c];
        blockRect(hero, blk);
    }
}

function update(){
    window.requestAnimationFrame(update, canvas);
    render();
    movement();
}

update();

