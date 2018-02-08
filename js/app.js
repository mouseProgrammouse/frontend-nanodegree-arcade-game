// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = 0;
  //generate random position (0 to 2)
  this.y = Math.floor(Math.random() * 3) * 80 + 60;
  //speed between 100-400
  this.speed = Math.floor(Math.random() * 300 + 100);
};

//Update the default settings for enemy
// - position (x,y)
// - speed
Enemy.prototype.reset = function() {
  this.x = 0;
  //generate random position (0 to 2)
  this.y = Math.floor(Math.random() * 3) * 80 + 60;
  //speed between 100-400
  this.speed = Math.floor(Math.random() * 300 + 100);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  //if enemy rich the end of screen
  //start again
  if (this.x > 500)
    this.reset();
  else
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-pink-girl.png';
  //start position for player
  this.x = 205;
  this.y = 300;
  //score
  this.score = 0;
  //alive
  this.alive = true;
};

//inherit
Player.prototype = Object.create(Enemy.prototype);

//Show current score on board
Player.prototype.renderScore = function() {
  ctx.font = '18px serif';
  ctx.fillStyle = '#000000';
  ctx.fillText(this.score, 450, 40);
}

// Collision detection.
// When player and enemy occupy the same space,
// the player will die
//objects - array of objects which located on the board (enemy or gems)
Player.prototype.checkCollisions = function(objects) {
  const player = this;
  objects.forEach(function(object) {
    //compare position
    if ((Math.abs(object.x - player.x) < 80) && (Math.abs(object.y - player.y) < 60))
      player.alive = false; //player is die:(
  });
}


//set the default position for player
Player.prototype.resetPosition = function() {
  this.x = 205;
  this.y = 300;
}

//Update location of player
Player.prototype.update = function() {
  //check if we got beyond the boundaries of the game's Board
  if (this.x < 0)
    this.x = 5;
  if (this.x > 500)
    this.x = 405;
  if (this.y > 400)
    this.y = 380;
  //player reaches the water
  //reset player back to the initial position
  if (this.y < 0) {
    //show popup
    //alert('Win!');
    this.score += 10;
    this.resetPosition();
  }
};

//move the player according to input key
Player.prototype.handleInput = function(keyCode) {
  //the player cannot move off screen
  //depends of key code
  switch (keyCode) {
    case 'left':
      this.x -= 100;
      break;
    case 'right':
      this.x += 100;
      break;
    case 'up':
      this.y -= 80;
      break;
    case 'down':
      this.y += 80;
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//generate 3 enemies
const count = 3;
const allEnemies = [];
for (let i = 0; i < count; i++) {
  allEnemies.push(new Enemy());
}
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
