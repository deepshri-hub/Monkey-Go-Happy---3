var backImage,backgr;
var player, player_running;
var ground,ground_img;
var stone1,stone2,stone3,stone4,stone5,stonesGroup;
var bananaGroup;

var score=0;

var gameOver;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  stone1 = loadImage("stone.png");
  stone2 = loadImage("stone.png");
  stone3 = loadImage("stone.png");
  stone4 = loadImage("stone.png");
  stone5 = loadImage("stone.png");

  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  stonesGroup = new Group();
  bananaGroup = new Group();
  
  score = 0; 

}

function draw() { 
  background(0);
  text("Score: "+ score, 500,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
  
  
     player.collide(ground);
    spawnBanans();
    spawnStones();
  
    if(stonesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    
    ground.velocityX = 0;
    player.velocityY = 0;
    stonesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    stonesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
  }

  drawSprites();
}

function spawnBanans(){

  if (frameCount % 80 === 0){
var banana = createSprite(600,250,40,10);
banana.y = random(120,200);
banana,scale = 0.5;
banana.velocityX = -4;

banana.lifetime = 300;
player.drawSpritesepyh = banana.depth+1;
bananaGroup.addImage(banana);
  }
}

function spawnStones() {
  if(frameCount % 60 === 0) {
    var stonesGroup = createSprite(600,165,10,40);
  
    stonesGroup.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: stonesGroup.addImage(stone1);
              break;
      case 2: stonesGroup.addImage(stone2);
              break;
      case 3: stonesGroup.addImage(stone3);
              break;
      case 4: stonesGroup.addImage(stone4);
              break;
      case 5: stonesGroup.addImage(stone5);
              break;
      case 6: stonesGroup.addImage(stone6);
              break;
      default: break;
    }
   }
  }