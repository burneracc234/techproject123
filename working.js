
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//score
var score = 0;
var enemyScore = 0;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var enemyX = blockSize * 15
var enemyY = blockSize * 15

var enemyVelocityX = 0;
var enemyVelocityY = 0;

var enemyBody = [];



//ability to change direction

var directionChangeTrueFalse = true;
var direcitonChangeTrueFalseEnemy = true;
var lastPressedKey;
var lastPressedKeyEnemy;
var e;
var wrongWay;
var wrongWayEnemy;
//food
var foodX;
var foodY;
var foodXX;
var foodYY;

var gameOver = false;
window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); ///used for drawing on the board


    placeFood();

    document.addEventListener("keydown", saveKeyPress);
    document.addEventListener("keydown", enemyKeyPress);

    setInterval(update);

}

function update() {
    
    if (gameOver == true) {
        return;
    }
    
    // Clear the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Draw the food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // checking for snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        // adding new body block
        for (let i = 0; i < blockSize; i++) {
            snakeBody.push([...snakeBody[snakeBody.length - 1]]);
        }
     
        score++;
        
        placeFood();
    }

    // Update the snake's position
    snakeX += velocityX ;
    snakeY += velocityY ;

    enemyX += enemyVelocityX;
    enemyY += enemyVelocityY;

    // Draw the snake's head
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //draw the enemy snake head
    context.fillStyle = "violet";
    context.fillRect(enemyX, enemyY, blockSize, blockSize);

    // Draw each segment of the snake's body
    context.fillStyle = "lime";
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    
    if (snakeX < 0 || snakeX > blockSize * cols || snakeY < 0 || snakeY > blockSize * rows){
        gameOver = true;
        alert("womp womp game over");
        console.log("game over method 1: out of bounds")
    }

    for (let i = 0; i< snakeBody.length; i++) {
        if ((snakeX == snakeBody [i][0] && snakeY == snakeBody [i][1] && snakeBody.length > 1) ) {
            alert('game over womp womp')
            console.log("gameover method 2: colliding with own body");
            gameOver = true;
        }
    }
    // moving snake
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    // Update the first segment of the snake's body with the head's position
    snakeBody[0] = [snakeX, snakeY];

    // Check direction turning conditions
    conditionsMet();
    conditionsMetEnemy();
    //wrongdireciton
    
}

//changing direction based on the keypress input
function changeDirection(lastPressedKey) {
    if (lastPressedKey == "ArrowUp" && directionChangeTrueFalse == true && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
        lastPressedKey = null;
        
    }
    else if (lastPressedKey == "ArrowDown" && directionChangeTrueFalse == true && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
        lastPressedKey = null;
        
    }
    else if (lastPressedKey == "ArrowRight" && directionChangeTrueFalse == true && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
        lastPressedKey = null;
        
    }
    else if (lastPressedKey == "ArrowLeft" && directionChangeTrueFalse == true && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
        lastPressedKey = null;
    }
}

function enemyDirection(lastPressedKeyEnemy) {
    if (lastPressedKeyEnemy == "w" && direcitonChangeTrueFalseEnemy == true && enemyVelocityY != 1) {
        enemyVelocityX = 0;
        enemyVelocityY = -1;
        lastPressedKeyEnemy = null;
        
    }
    else if (lastPressedKeyEnemy == "s" && direcitonChangeTrueFalseEnemy == true && enemyVelocityY != -1) {
        enemyVelocityX = 0;
        enemyVelocityY = 1;
        lastPressedKeyEnemy = null;
        
    }
    else if (lastPressedKeyEnemy == "d" && direcitonChangeTrueFalseEnemy == true && enemyVelocityX != -1) {
        enemyVelocityX = 1;
        enemyVelocityY = 0;
        lastPressedKeyEnemy = null;
        
    }
    else if (lastPressedKeyEnemy == "a" && direcitonChangeTrueFalseEnemy == true &&enemyVelocityX != 1) {
        enemyVelocityX = -1;
        enemyVelocityY = 0;
        lastPressedKeyEnemy = null;
    }
}
//placing food within the canvas
function placeFood() {
    //(0-1) *cols -> (0-19.99999999) -> (0-19) *25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    for (let i = 0; i< snakeBody.length; i++) { //if food is placed on the snake body, place food again
        if (foodX == snakeBody [i][0] || foodY == snakeBody [i][1]){
            placeFood();
        }
    }
}
//checking if condition is met (the snake is on the grid)
function conditionsMet() {
        if  (snakeX % blockSize == 0 && snakeY % blockSize == 0) {
            directionChangeTrueFalse = true;
            changeDirection(lastPressedKey);
            
        }
        else {
            directionChangeTrueFalse = false;
            
            //next time the condition is true, then execute command
        }

}

function conditionsMetEnemy() {
    if  (enemyX % blockSize == 0 && enemyY % blockSize == 0) {
        direcitonChangeTrueFalseEnemy = true;
        enemyDirection(lastPressedKeyEnemy);
        
    }
    else {
        direcitonChangeTrueFalseEnemy = false;
        
        //next time the condition is true, then execute command
    }

}
//saving key presss
function saveKeyPress(event) {
    wrongDirection();
    if (event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowLeft" || event.key == "ArrowRight"){
            lastPressedKey = event.key;
        }
        
    }
     console.log(wrongWay)
    if (wrongWay == false){
        changeDirection(lastPressedKey);}



function enemyKeyPress(event) {
    wrongDirectionEnemy();
    if (event.key == "w" || event.key == "a" || event.key == "s" || event.key == "d"){
        
        lastPressedKeyEnemy = event.key;
        console.log(lastPressedKeyEnemy)
    }

    if (wrongWayEnemy == false){
        enemyDirection(lastPressedKeyEnemy);
    }
    
    
}

function wrongDirection (){//the wrong way condition to ensure that the change of direction is smoother because it previously was not due to the condition that the change could only occur if the snake was moving in the right direction was created in a very late part of the command
    if (velocityX == 1 && lastPressedKey ==  'ArrowLeft')
        wrongWay = true;
    else if (velocityX == -1 && lastPressedKey ==  'ArrowRight')
        wrongWay = true;
    else if (velocityY == 1 && lastPressedKey ==  'ArrowUp')
        wrongWay = true;
    else if (velocityY == -1 && lastPressedKey ==  'ArrowDown')
        wrongWay = true;
    else {
        wrongWay = false;
    }
}

function wrongDirectionEnemy (){//the wrong way condition to ensure that the change of direction is smoother because it previously was not due to the condition that the change could only occur if the snake was moving in the right direction was created in a very late part of the command
    if (enemyVelocityX== 1 && lastPressedKeyEnemy ==  'a')
        wrongWayEnemy = true;
    else if (enemyVelocityX == -1 && lastPressedKeyEnemy ==  'd')
        wrongWayEnemy = true;
    else if (enemyVelocityY == 1 && lastPressedKeyEnemy ==  'w')
        wrongWayEnemy = true;
    else if (enemyVelocityY == -1 && lastPressedKeyEnemy ==  's')
        wrongWayEnemy = true;
    else {
        wrongWayEnemy = false;
    }
}
