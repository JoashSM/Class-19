var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.3;

  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw(){
  background(0);
    
    if(tower.y > 400){
      tower.y = 300
    }
   
    if(keyDown("space")){
      ghost.velocityY=-10
    }
    ghost.velocityY+=0.8

    if(keyDown("LEFT_ARROW")){
      ghost.x-=3
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x+=3
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
    }
   if(climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
   }
    spawndoors();
    drawSprites();
  }

function spawndoors(){
  if(frameCount%240==0){
  var door = createSprite(200,-50)
  door.addImage(doorImg)
  door.velocityY=1
  door.lifetime=600
  doorGroup.add(door)
  door.x=Math.round(random(120,400))
  door.depth=ghost.depth-1
  
  //climber
  var climber = createSprite(200,10)
  climber.addImage(climberImg)
  climber.velocityY=1
  climber.lifetime=600
  climberGroup.add(climber)
  climber.x=door.x
  climber.depth=ghost.depth-1

  //Invisible block
  var invisibleBlock = createSprite(200,15,climber.width,1)
  
  invisibleBlock.velocityY=1
  invisibleBlock.lifetime=600
  invisibleBlockGroup.add(invisibleBlock)
  invisibleBlock.x=door.x
  invisibleBlock.depth=ghost.depth-1
  invisibleBlock.shapeColor="green"

}

}
