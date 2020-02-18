// Initialize some Variables
// Min/Max Enemy Speed
const min = 60;
const max = 150;
let ecounter = 0;
let winSound = document.getElementById('winSound');
let loseSound = document.getElementById('loseSound');



// Enemies our player must avoid
let Enemy = function(x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // End prebuilt
    // Variables for enemy position and speed
    this.x = x;
    this.y = y;
    this.speed = s;
    ecounter += 1;
    this.name = "enemy" + ecounter;
    exdist = 0;
    eydist = 0;



};

// Get distance from player
Enemy.prototype.getDistance = function() {

  // Distance between two objects for box collision detection.
  // Thanks to Chris Courses for the insight into
  // simple collision detection and shout out to my man Pythagoras for his theorem
  // Adapted from: https://www.youtube.com/watch?v=XYzA_kPWyJ8
  function getXDist (x1, x2){
    let xDist = x2 - x1;

    return Math.sqrt(Math.pow(xDist, 2));
  }

  function getYDist (y1, y2){
    let yDist = y2 - y1;

    return Math.sqrt(Math.pow(yDist, 2));

  }

  // Get distance of this enemy from player
  exdist = getXDist(this.x, player.x);
  eydist = getYDist(this.y, player.y);

};

// Check for collision with player or edge of board
Enemy.prototype.checkCollision = function() {

  // Collision logic if enemy and player collide
  if (exdist < 84 && eydist < 50) {
    this.speed = 0;
    console.log(this.name + " hit!");

    loseSound.pause();
    loseSound.currentTime = 0;
    loseSound.play();

    // Reset all enemies and randomize speed
    enemy1.reset();
    enemy2.reset();
    enemy3.reset();

    // Reset player to starting position
    player.reset();
  }

  // If enemy moves off the canvas, reset and randomize speed
  if (this.x > 606) {
    for (enemy of allEnemies) {
      this.reset();
    }
  }

};

Enemy.prototype.reset = function() {
  this.x = -100;
  enSpeed = Math.floor(Math.random() * (max - min)) + min;
  this.speed = enSpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates enemies horizontal movement speed
    this.x += this.speed * dt;

    // Get distance from player
    this.getDistance();

    // Check for player or board collision
    this.checkCollision();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y) {

  // The image sprite for our player.
  // This uses the same helper as Enemy
  this.sprite = 'images/char-boy.png';

  // Variables for player position
  this.x = x;
  this.y = y;

};

// Handle player input during game
Player.prototype.handleInput = function (keyPress) {
  console.log(keyPress);

  if (keyPress == 'left' && this.x != 0){
    this.x += (-101);
    console.log(this.x);
  } else if (keyPress == 'right' && this.x != 404) {
    this.x += 101;
    console.log(this.x);
  } else if (keyPress == 'up' && this.y != -16) {
    this.y += (-84);
    console.log(this.y);
  } else if (keyPress == 'down' && this.y != 404) {
    this.y += 84;
    console.log(this.y);
  }

};

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 404;
};

Player.prototype.checkForWin = function() {
  if (this.y == -16) {

    winSound.pause();
    winSound.currentTime = 0;
    winSound.play();

    enemy1.reset();
    enemy2.reset();
    enemy3.reset();
    player.reset();

  }

};

Player.prototype.update = function(dt) {
  player.checkForWin();
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Now instantiate your objects.
const enemy1 = new Enemy(-100, 60, 250);
const enemy2 = new Enemy(-100, 142, 250);
const enemy3 = new Enemy(-100, 228, 250);

const character = new Player(202, 404);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = character;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
