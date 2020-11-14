var dog,happyDog,dogImg;
var database;
var foodS,foodStock;
var feedTime, lastFed, feed, addFood, food;

function preload(){
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  foodObj = new Food();

  database = firebase.database();
  dog = createSprite(240,220,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  feed = createButton("FEED");
  feed.position(400, 100);
  feed.mousePressed(feed);

  addFood = createButton("ADD FOOD");
  addFood.position(500, 100);
  addFood.mousePressed(addFood);

function draw() {  
  background(140, 210, 144);
  food.display();
  feedTime = database.ref('feedTime');
  feedTime.on('value', function(data){
  lastFed = data.val();
})

if(lastFed >=12){
  text("LAST FEED :" + lastFed % 12 + 'pm', 350, 30);
} else if(lastFed === 0){
  text("LAST FEED : 12 am", 350, 30);
}else {
  text("LAST FEED :"+ lastFed+'am', 350, 30);
}
  drawSprites();
  
}
}

//function to read values from DB
function readStock(data){
  foodS = data.val();
  }

  function feedDog(){
    dog.addImage(happyDog);
    food.updateFoodStock(food.getFoodStock()-1)
    database.ref('/').update({
      Food:food.getFoodStock(),
      feedTime:hour()
    })
  }
  function addFood(){
    foodS++
    db.ref('/').update({
      Food:foodS
    })
  }
