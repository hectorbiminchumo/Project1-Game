
//Elementos del DOM (canvas)
const $canvas = document.querySelector("canvas");
const ctx= $canvas.getContext("2d");
const $button= document.querySelector(".buttonStart");
const $buttonReset= document.querySelector(".buttonReset");

//Variables globales
let intervalId;
let frames = 0;
const keys={};
const bullets = [];
const enemyShip=[];
const enemyShip2 = [];
const enemyShip3 = [];
let scoreMax=100;
let score=0;
let isGameOver=false;
let isGameWin= false;
let health=100;
const damage=1;
let soundOn=0;
const sound= new Audio();
sound.src="./images/music.mp3";
const soundWin= new Audio()
soundWin.src="./images/Win.mp3";
const soundOver= new Audio();
soundOver.src="./images/GameOver.mp3"


//Definir las clases del juego
class Board {
    constructor(){
        this.x=0;
        this.y=0;
        this.width = $canvas.width;
        this.height = $canvas.height;
        this.image = new Image();
        this.image.src = "http://3.bp.blogspot.com/-89wTEhm2SAs/UeKl0-0WCZI/AAAAAAAAOPY/dLmDPksGh-A/s280/sprite_effects_fire_sprite_fx_0129.png";
        // this.background = new Image();
        // this.background.src = "./images/inner-spaceship.jpeg"
        this.win = new Image();
        this.win.src = "https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/701c4c50c3eb020.png"
        
    }

    draw(){

        this.y++;

    if(this.y>this.height)this.y =0;
    ctx.drawImage(this.image,this.x, this.y, this.width, this.height);
    ctx.drawImage(
        this.image,
        this.x,
        this.y - this.height,
        this.width,
        this.height
        
    );
    if(score===scoreMax){
            
            ctx.drawImage(this.win,0,0,$canvas.width,$canvas.height);
            

    }

    //Score del juego
    ctx.font = "15px sans-serif";
        ctx.fillText(`Score : ${score}`,400,30);
        // ctx.fillText(`Life: ${health}`,410.58);
        ctx.fillStyle = "White"
    }

  


}



class Character{
    constructor (x,y){
        this.x= x;
        this.y= y;
        this.width = 40;
        this.height= 40;
        this.image = new Image();
        this.move = 40;
        this.image.src = "./images/spaceship-2-cut.png"
        this.health = 100;

        
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
        ctx.font = "15px sans-serif";
        ctx.fillText(`Health : ${this.health}`,400,60);
    }
    stop(){
        if(gameOver=true) this.move=0;
       
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
        this.x < obj.x + obj.width-10 &&
        this.x + this.width-10 > obj.x &&
        this.y < obj.y + obj.height-10 &&
        this.y + this.height-10 > obj.y
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
            this.audio = new Audio();
            this.audio.src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-69838/cartoon_anime_laser_shoot_hard_fast_001_71523.mp3"

        }
        draw(){
            this.y--;
            ctx.fillStyle= this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        shootSound(){
            this.audio.volume = 0.2;
            this.audio.play();
        }
        isTouchingBullet(obj){
            return (   
                this.x < obj.x + obj.width &&
                this.x + this.width > obj.x &&
                this.y < obj.y + obj.height &&
                this.y + this.height > obj.y
              );
        }
        
}

class Enemies extends Character{
constructor(x,y) {
    super(x,y);
    this.image.src="./images/enemy-cut.png"
    this.damage=10;
}
draw(){
    this.y+=2;
    this.x-=1;
    this.width= 25;
    this.height=25;
    if(this.x > $canvas.width - this.width - 60)
    this.x = $canvas.width - this.width - 60;

   

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

}

class Enemies2 extends Character{
    constructor(x,y){
        super(x,y);
        this.image.src = "./images/spaceship-red-cut.png"
        this.height= 20;
        this.width= 30;
        this.damage=10;
    }

    draw(){
        this.y+=3;
        this.x+=1;
        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }


}


class Enemies3 extends Character {
    constructor(x,y){
        super(x,y);
        this.image.src = "./images/spaceship-transparent-cut.png";
        this.height= 35;
        this.width= 50;
        this.damage=10;
    }

    draw(){
        this.y+=4;
        this.x;

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}

//Instancias de las clases

const board = new Board();
const nave = new Character(235,550)



// Funciones del flujo del juego

function startGame(){
    if(intervalId) return;
    intervalId = setInterval(()=>{
        update();

    }, 1000/60);
    if(soundOn===0){
    
       
        sound.play();
        sound.volume=0.2;
        soundOn++;
    }

}
function gameOver(){
    if(isGameOver){
        ctx.font= "40px sans-serif";
        ctx.fillText("Game Over",$canvas.width/4, $canvas.height/2);
        sound.pause();
        soundOver.play();

        
    }else if(isGameWin===true){
        gameWin();
        
    }
}

function gameWin(){
    isGameWin===true;
    clearInterval(intervalId);
    sound.pause();
    soundWin.play();
    

}




function checkKeys(){
    document.onkeydown = (event)=>{
        event.preventDefault();
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
                const bullet = new Bullet(nave.x+20, nave.y);
                bullet.shootSound();
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
    if(frames%20 === 0 ){
        const x = Math.floor(Math.random()*380);
        const enemy = new Enemies(x,0);
        enemyShip.push(enemy);

    }
}

function drawEnemies(){
    if(score===scoreMax) {return}
    else{ 
        enemyShip.forEach((enemy)=> enemy.draw());
        
    }
}

function generateEnemies2(){
    if(frames%20 === 0){
        const x = Math.floor(Math.random()*380);
        const enemy2 = new Enemies2(x,0);
        enemyShip2.push(enemy2);
    }
}

function drawEnemies2(){
    
    if(score===scoreMax) {return}
    else{
        
        enemyShip2.forEach((enemy2)=> enemy2.draw());
        
    }
}

function generateEnemies3(){
    if(frames%200 === 0){
        const x = Math.floor(Math.random()*380);
        const enemy3 = new Enemies3(x,0);
        enemyShip3.push(enemy3);
    }
}

function drawEnemies3(){
    if(score===scoreMax) {return}
    else{

        enemyShip3.forEach((enemy3)=> enemy3.draw());

    }
}


function printBullets(){
    

        bullets.forEach((bullet) => bullet.draw());

}

function checkBulletsEnemies(){
    enemyShip.forEach((randomsEnemy)=>{
        bullets.forEach((randomBullet)=>{
            if(randomBullet.isTouchingBullet(randomsEnemy)){
                enemyShip.splice(randomsEnemy,1);
                bullets.splice(randomBullet,1);
                
                if(!isGameOver) {
                    
                    score+=10}
                    

                
            }

        })

    })

}
function checkBulletsEnemies2(){
    enemyShip2.forEach((randomsEnemy)=>{
        bullets.forEach((randomBullet)=>{
            if(randomBullet.isTouchingBullet(randomsEnemy)){
                enemyShip2.splice(randomsEnemy,1);
                bullets.splice(randomBullet,1);
                if(!isGameOver) {
                    
                    score+=10;}

                
            }

        })

    })

}
function checkBulletsEnemies3(){
    enemyShip3.forEach((randomsEnemy)=>{
        bullets.forEach((randomBullet)=>{
            if(randomBullet.isTouchingBullet(randomsEnemy)){
                enemyShip3.splice(randomsEnemy,1);
                bullets.splice(randomBullet,1);
               if(!isGameOver) {
                    
                        score+=10;}
                
                
            }

        })

    })

}


//Se detiene el juego incluso antes de que se toquen.
function checkCollitions(){
    enemyShip.forEach((randomEnemy)=>{
        if(nave.isTouching(randomEnemy)){
            if(nave.health > 0){
                nave.health-= randomEnemy.damage;
                enemyShip.splice(0,1);
            }else if(nave.health<=0){
                nave.health===0;
                clearInterval(intervalId);
                isGameOver= true;
                
            }
            }else if (score===scoreMax){
                gameWin();
                clearInterval(intervalId);

        }
        console.log(nave.health);
    })
    enemyShip2.forEach((randomEnemy)=>{
        if(nave.isTouching(randomEnemy)){
            if(nave.health > 0){
                nave.health-=randomEnemy.damage;
                enemyShip2.splice(0,1);

            }else if(nave.health<=0){ 
                nave.health===0; 
                clearInterval(intervalId);
                isGameOver= true;
            }else if (score===5){
                
                gameWin();
                clearInterval(intervalId);
            }
            
        }
    })   
    enemyShip3.forEach((randomEnemy)=>{
        if(nave.isTouching(randomEnemy)){
            if(nave.health>0){
                nave.health -=randomEnemy.damage;
                enemyShip3.splice(0,1);
            }else if(nave.health<=0){ 
                nave.health===0;
                clearInterval(intervalId);
                isGameOver= true;
            }
            } else if (score===scoreMax){
                gameWin();
                clearInterval(intervalId);
        }
    })
        


}

function update(){
    
    //1. Calcular el estado
    frames++;
    checkKeys();
    checkBulletsEnemies();
    checkBulletsEnemies2();
    checkBulletsEnemies3();
    checkCollitions();
    //2. Limpiar el canvas
    clearCanvas();
    //3. Dibujar
    gameWinCheck()
    printBullets();
    generateEnemies();
    drawEnemies();
    generateEnemies2();
    drawEnemies2();
    generateEnemies3();
    drawEnemies3();
    gameOverCheck();
    
    
    
    // requestAnimationFrame(update);
}
function gameOverCheck(){

    if(isGameWin===true){
        board.draw()

    }else gameOver();

}
function gameWinCheck(){
    board.draw();
    if(score===scoreMax){gameWin();
     }
    else{ nave.draw();}

}

//Funciones de interaccion con el usuario
function clearCanvas(){
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}



$button.addEventListener("click",event=> {
    
    startGame();
    
})


$buttonReset.addEventListener("click",event=> {
    window.location.reload();

})