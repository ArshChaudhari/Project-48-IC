
var butterfly, butterflyA;
var goodfish, goodfishA;

var powerup, powerupA;
var powerpic, powerpicI;
var coin, coinI;

var moth, mothA;
var evilfish, evilfishA;
var redskull, redskullI;
var bomb, bombI;
var blast, blastI;

var trophy, trophyI;
var gun, bullet;
var straightgun, straightgunI;

var start, startI;
var gameover, gameoverI;
var restart, restartI;

var backgroundsprite, backgroundI;
var engine, world, angle;
var edges;

var Start = 1 ;
var Play = 2;
var Win = 3;
var Lose = 0;
var gamestate = 1;

var powerupsound, collectsound; 
var obstaclesound, bombsound;  

var score = 0;
var life = 5;
 
var butterflygroup, goodfishgroup;
var mothgroup, bombgroup, redskullgroup, evilfishgroup;
var coingroup, powerupgroup; 
var bulletarray = [];

function preload(){
 backgroundI = loadImage("./others/scifibg.png");
 straightgunI = loadImage("./others/gun.png");

 butterflyA = loadAnimation("./collectibles/butterfly1.png","./collectibles/butterfly2.png");
 goodfishA = loadAnimation("./collectibles/goodfish1.png","./collectibles/goodfish2.png");

 mothA = loadAnimation("./obstacles/evilmoth1.png","./obstacles/evilmoth2.png");
 evilfishA = loadAnimation("./obstacles/evilfish1.png","./obstacles/evilfish2.png");
 redskullI = loadImage("./obstacles/redskull.png");
 bombI = loadImage("./obstacles/bomb2.png");
 blastI = loadImage("./obstacles/blast2.png");

 coinI = loadImage("./collectibles/coin1.png");
 powerupA = loadAnimation("./collectibles/powerup1.png","./collectibles/powerup2.png");
 powerpicI = loadImage("./collectibles/power.png");
 trophyI = loadImage("./others/trophy.png");

 startI = loadImage("./others/start.png");
 gameoverI = loadImage("./others/gameover.png");
 restartI = loadImage("./others/reset.png");

 collectsound = loadSound("./sounds/collectsound.wav");
 obstaclesound = loadSound("./sounds/obstaclesound.mp3");
 bombsound = loadSound("./sounds/bombsound.mp3");
 powerupsound = loadSound("./sounds/powerupsound.mp3");
}

function setup() {
 createCanvas(600,500);

 engine = Matter.Engine.create();
 world = engine.world;
 angle = -PI / 4;

 backgroundsprite = createSprite(width/2,height/2);
 backgroundsprite.addImage(backgroundI);
 backgroundsprite.scale = 1.5;
 
 gun = new Gun(50 ,470 ,100 , 60);
 butterflygroup = new Group();
 goodfishgroup = new Group();
 
 mothgroup = new Group();
 bombgroup = new Group();
 redskullgroup = new Group();
 evilfishgroup = new Group();
 
 coingroup = new Group();
 powerupgroup = new Group();
 
 start = createSprite(300,450);
 start.addImage(startI);
 
 restart = createSprite(300,350);
 restart.addImage(restartI);
 
 straightgun = createSprite(315,355);
 straightgun.addImage(straightgunI);
 straightgun.scale = 0.15;

 restart.visible = false;
 restart.scale = 0.1;

 gameover = createSprite(300,200);
 gameover.addImage(gameoverI);
 gameover.scale = 0.7;
 gameover.visible = false;
}

function draw() {
  background("white");
  
  drawSprites();
  Matter.Engine.update(engine);

 if(gamestate == 1){  
  start.visible = true;
   
  if(mousePressedOver(start)){
    gamestate = 2
  }

   fill("black");
   textSize(35);
   text("Sniper Shot", width/2 - 80, 50);

   fill("maroon");
   textSize(20);
   text("Welcome! In this game you have to shoot the good collectibles - butterflies and clownfishes and try to achieve 50 points. Beware of the bombs, evilfishes, redskulls and moths! You have just 5 lives. Try to collect as many coins and powerups as possible. You can change the angle of your gun using your left and right keys. Press space to shoot. Click on start to play the game. Later you can click on restart to play it again. Enjoy the game!",70,78,500,300); 
 }

 if(gamestate == 2){
  start.visible = false;
  straightgun.visible = false;

  gun.display();
  edges = createEdgeSprites();

  spawnmoths();
  spawnevilfish();
  spawnbombs();
  spawnredskulls();

  spawngoodfish();
  spawnbutterflies();
 
  spawnpowerups();
  spawncoins();
  
  for(var i=0; i < bulletarray.length; i++){
    showBullets(i);
  }
  
  fill("black");
  textSize(25);
  text("Score: " + score, 10, 30);
  text("Lives: " + life, 10, 60);
 }
}

function spawnmoths(){
var selectmoth = Math.round(random(250,500));

if(frameCount % 135 == 0){
 moth = createSprite(selectmoth,520);
 moth.addAnimation("mothobstacle",mothA);
 moth.scale = 0.15;

 moth.velocityY = -11;
 moth.lifetime = 80;
 mothgroup.add(moth);
}
}

function spawnevilfish(){
 var selectevilfish = Math.round(random(100,225));

 if(frameCount % 269 == 0){
  evilfish = createSprite(-20,selectevilfish);
  evilfish.addAnimation("evilfishobstacle",evilfishA);
  evilfish.scale = 0.5;

  evilfish.velocityX = 10;
  evilfish.lifetime = 80;
  evilfishgroup.add(evilfish);
 }
}

function spawngoodfish(){
 var selectgoodfish = Math.round(random(100,225));
  
 if(frameCount % 303 == 0){
  goodfish = createSprite(-20,selectgoodfish);
  goodfish.addAnimation("goodfishcollectible",goodfishA);
  goodfish.scale = 0.2;
  
  goodfish.velocityX = 12;
  goodfish.lifetime = 60;
  goodfishgroup.add(goodfish);
 }
}

function spawnbutterflies(){
 var selectbutterfly = Math.round(random(250,500));
   
 if(frameCount % 402 == 0){
  butterfly = createSprite(selectbutterfly,520);
  butterfly.addAnimation("butterflycollectible",butterflyA);
  butterfly.scale = 0.2;
   
  butterfly.velocityY = -11;
  butterfly.lifetime = 70;
  butterflygroup.add(butterfly);
 }
}

function spawnpowerups(){
 var selectpowerup = Math.round(random(100,225));
   
 if(frameCount % 709 == 0){
  powerup = createSprite(620,selectpowerup);
  powerup.addAnimation("powerup",powerupA);
  powerup.scale = 1.0;
   
  powerup.velocityX = -11;
  powerup.lifetime = 70;
  powerupgroup.add(powerup);
 }
}

function spawnbombs(){
 var selectbomb = Math.round(random(250,500));

 if(frameCount % 617 == 0){
  bomb = createSprite(selectbomb,-20);
  bomb.addImage("bombobstacle",bombI);
  bomb.scale = 0.2;

  bomb.velocityY = 20;
  bomb.lifetime = 80;
  bombgroup.add(bomb);
 }
}

function spawnredskulls(){
 var selectredskull = Math.round(random(100,225));
 
 if(frameCount % 472 == 0){
  redskull = createSprite(620,selectredskull);
  redskull.addImage("redskullobstacle",redskullI);
  redskull.scale = 0.4;
 
  redskull.velocityX = -11;
  redskull.lifetime = 80;
  redskullgroup.add(redskull);
 }
}

function spawncoins(){
 var selectcoin = Math.round(random(250,500));

 if(frameCount % 93 == 0){
  coin = createSprite(selectcoin,-20);
  coin.addImage("coin",coinI);
  coin.scale = 0.4;

  coin.velocityY = 10;
  coin.lifetime = 80;
  coingroup.add(coin);
 }
}

function keyPressed() {
  if (keyCode === 32) {
    bullet = new Bullet(gun.x , gun.y - 15, 50, 50);
     
    Matter.Body.setAngle(bullet.body, gun.angle);
    bulletarray.push(bullet)
  }
}

function showBullets(index) {
  bulletarray[index].display();

  if (bullet.body.position.x >= 600 || bullet.body.position.y >= 500) {
    Matter.World.remove(world, bullet.body);
    bulletarray.splice(index, 1);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    bulletarray[bulletarray.length - 1].shoot();
  }
}
