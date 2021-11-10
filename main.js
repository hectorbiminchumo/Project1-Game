
//Elementos del DOM (canvas)
const $canvas = document.querySelector("canvas");
const ctx= $canvas.getContext("2d");

//Variables globales
let frames = 0;
const keys={};
const bullets = [];
const enemyShip=[];
const enemyShip2 = [];
const enemyShip3 = [];

//Definir las clases del juego
class Board {
    constructor(){
        this.x=0;
        this.y=0;
        this.width = $canvas.width;
        this.height = $canvas.height;
        this.image = new Image();
        this.image.src = "http://3.bp.blogspot.com/-89wTEhm2SAs/UeKl0-0WCZI/AAAAAAAAOPY/dLmDPksGh-A/s280/sprite_effects_fire_sprite_fx_0129.png";
    }

    draw(){

        this.y+=2;

    if(this.y>this.height)this.y =0;
    ctx.drawImage(this.image,this.x, this.y, this.width, this.height);
    ctx.drawImage(
        this.image,
        this.x,
        this.y - this.height,
        this.width,
        this.height
    );
    }
}




class Character{
    constructor (x,y){
        this.x= x;
        this.y= y;
        this.width = 80;
        this.height= 80;
        this.image = new Image();
        this.move = 60;
        this.image.src = "./images/spaceship-2.png"
        this.health = 3;
        
    }
    
    draw(){
        
        //limite en el eje x
        this.x;
        if(this.x >$canvas.width - this.width - 20)
        this.x = $canvas.width - this.width - 20;
        if(this.x < 20)
        this.x = 20;

        //limite en el eje Y

        this.y;
        if(this.y <0)
        this.y = 0;
        if(this.y > $canvas.height - 60 )
        this.y = $canvas.height - 60;
        
        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        
    }
    
    moveLeft(){
        this.x -= this.move;
    }
    moveRight(){
        this.x += this.move;
    }
    moveUp(){
        this.y -= this.move;
    }
    moveDown(){
        this.y += this.move;
    }
    isTouching(obj){
        return (   
        this.x < obj.x + obj.width-20 &&
        this.x + this.width-20 > obj.x &&
        this.y < obj.y + obj.height-20 &&
        this.y + this.height-20 > obj.y
      );
    }
}

class Bullet {
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.width = 2;
            this.height = 8;
            this.color = "white";

        }
        draw(){
            this.y--;
            ctx.fillStyle= this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        isTouchingBullet(obj){
            return (   
                this.x < obj.x + obj.width-20 &&
                this.x + this.width-20 > obj.x &&
                this.y < obj.y + obj.height-20 &&
                this.y + this.height-20 > obj.y
              );
        }
        
}

class Enemies extends Character{
constructor(x,y) {
    super(x,y);
    this.image.src="./images/enemy.png"
}
draw(){
    this.y+=2;
    this.x-=1;
    if(this.x > $canvas.width - this.width - 60)
    this.x = $canvas.width - this.width - 60;
    // if(this.x<60)
    // this.x = 60;

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

}

class Enemies2 extends Character{
    constructor(x,y){
        super(x,y);
        this.image.src = "./images/spaceship-red.png"
        this.height= 70;
        this.width= 100;
    }

    draw(){
        this.y+=2;
        this.x+=1;
        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }


}


class Enemies3 extends Character {
    constructor(x,y){
        super(x,y);
        this.image.src = "./images/spaceship-transparent.png";
        this.height= 70;
        this.width= 100;
    }

    draw(){
        this.y+=2;
        this.x;

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}

//Instancias de las clases

const board = new Board();
const nave = new Character(235,550)


// Funciones del flujo del juego

function startGame(){
    update();
}

function clearCanvas(){
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

function checkKeys(){
    document.onkeydown = (event)=>{
        switch(event.key){

            case "ArrowLeft":
                nave.moveLeft();
                break;
            case "ArrowRight":
                nave.moveRight();
                break;
            case "ArrowUp":
                nave.moveUp();
                break;
            case "ArrowDown":
                nave.moveDown();
                break;
            case " ":
                const bullet = new Bullet(nave.x+40, nave.y);
                bullets.push(bullet);
            // case "Enter":
            //     startGame();    
            //     break;
                default:
                    break;

        }
    }

}

function generateEnemies(){
    if(frames%40 === 0 ){
        const x = Math.floor(Math.random()*380);
        const enemy = new Enemies(x,0);
        enemyShip.push(enemy);

    }
}

function drawEnemies(){
    enemyShip.forEach((enemy)=> enemy.draw());
}

function generateEnemies2(){
    if(frames%40 === 0){
        const x = Math.floor(Math.random()*380);
        const enemy2 = new Enemies2(x,0);
        enemyShip2.push(enemy2);
    }
}

function drawEnemies2(){
    enemyShip2.forEach((enemy2)=> enemy2.draw());
}

function generateEnemies3(){
    if(frames%150 === 0){
        const x = Math.floor(Math.random()*380);
        const enemy3 = new Enemies3(x,0);
        enemyShip3.push(enemy3);
    }
}

function drawEnemies3(){
    enemyShip3.forEach((enemy3)=> enemy3.draw());
}


function printBullets(){
    bullets.forEach((bullet) => bullet.draw());
}
function gameOver(){


}
function checkBulletsEnemies(){
    enemyShip.forEach((randomsEnemy)=>{
        bullets.forEach((randomBullet)=>{
            if(randomBullet.isTouchingBullet(randomsEnemy)){
                enemyShip.splice(randomsEnemy,1);
                
            }

        })

    })

}
function checkBulletsEnemies2(){
    enemyShip2.forEach((randomsEnemy)=>{
        bullets.forEach((randomBullet)=>{
            if(randomBullet.isTouchingBullet(randomsEnemy)){
                enemyShip2.splice(randomsEnemy,1);
                
            }

        })

    })

}
function checkBulletsEnemies3(){
    enemyShip3.forEach((randomsEnemy)=>{
        bullets.forEach((randomBullet)=>{
            if(randomBullet.isTouchingBullet(randomsEnemy)){
                enemyShip3.splice(randomsEnemy,1);
                
            }

        })

    })

}


//Se detiene el juego incluso antes de que se toquen.
function checkCollitions(){
    enemyShip.forEach((randomEnemy)=>{
        if(nave.isTouching(randomEnemy)){
            if(nave.health > 0){
                nave.health--;
                enemyShip.splice(randomEnemy,1);
            }else {
                alert("Game Over");
                
            }
        }
    })
    enemyShip2.forEach((randomEnemy)=>{
        if(nave.isTouching(randomEnemy)){
            if(nave.health > 0){
                nave.health--;
                enemyShip2.splice(randomEnemy,1);
            }else{
                alert("Game Over")
            }
        }
    })   
    enemyShip3.forEach((randomEnemy)=>{
        if(nave.isTouching(randomEnemy)){
            if(nave.health>0){
                nave.health--;
                enemyShip3.splice(randomEnemy,1);
            } else{
                alert("Game Over")
            }
        }
    })
        
    // bullets.forEach((randomEnemy)=>{
    //     if(bullet.isTouching(randomEnemy)){

    //     }

    // })

}

function update(){
    
    //1. Calcular el estado
    frames++;
    checkKeys();
    checkCollitions();
    checkBulletsEnemies();
    checkBulletsEnemies2();
    checkBulletsEnemies3();
    //2. Limpiar el canvas
    clearCanvas();
    //3. Dibujar
    board.draw();
    nave.draw();
    printBullets();
    generateEnemies();
    drawEnemies();
    generateEnemies2();
    drawEnemies2();
    generateEnemies3();
    drawEnemies3();

    requestAnimationFrame(update);
}

//Funciones de interaccion con el usuario


startGame();