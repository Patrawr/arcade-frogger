//enforce strict mode for ES5
"use strict";

// Enemies our player must avoid
let allEnemies = [];

let CONSTANTS = {
    "COL_MULT" : 101,
    "ROW_MULT" : 83
}
// @description Base class of a moving object
class movingObject {
    constructor(col = 0, row = 0, sprite) {
        this.sprite = sprite;
        this.col = col;
        this.row = row;
        this.x = 0;
        this.y = 0;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
class Enemy extends movingObject {
    constructor(col = 0, row = 1, speed = 1) {
        super(col, row, 'images/enemy-bug.png');
        
        this.speed = speed;
        this.width = 70;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        //checking if enemy has gone off screen, if so reset to left side of canvas (offscreen)
        if (this.col > numCols) {
            this.col = -1;
        }

        //add to the y position based on speed and univerals delta
        //speed can differ between enemies but they should all behave consistantly across devices
        this.col += this.speed * dt;

        //convert rows and columns to absolute x and y positions to be rendered onscreen
        this.x = this.col * CONSTANTS.COL_MULT;
        this.y = this.row * CONSTANTS.ROW_MULT - 20;
        
        this.checkCollisions();
    }

    //collision checker checks if player and enemy are in the same row and if any part
    //of the enemy intersects with any part of the player (based on position and width)
    checkCollisions() {
        if (this.row === player.row &&
            ((this.x >= player.x && this.x <= player.x + player.width) ||
            (this.x + this.width >= player.x && this.x + this.width <= player.x + player.width))
        ) {
            console.log("Collision!!");
            reset();
        }
    }
}


//player class that handles position and logic for player character
class Player extends movingObject {
    constructor(col = 0 , row = 0) {
        //calling super constructor, movingObject
        super (col, row, 'images/char-boy.png');
        
        this.height = 100;
        this.width = 100;
        this.timer = 0;

        this.reset();
    }

    //updates row and column and converts to x and y abosolute coordinates for rendering
    update(col = 0, row = 0) {
        
        this.col += col;
        //if player has won, do not let them leave until reset
        if (this.timer === 0) {
            this.row += row;
        }
        
        this.x = this.col * CONSTANTS.COL_MULT;
        this.y = this.row * CONSTANTS.ROW_MULT - 30;

        //checks if the player has won by reaching the water
        this.checkWin();
    };


    //resets the player randomly
    reset() {
        this.col = getRndInteger(0,4);
        this.row = getRndInteger(4,5);
        //resets the timer
        this.timer = 0;
        let winbar = document.getElementById("win-bar");

        //win message will linger for a little after the player is reset
        if (winbar != null) {
            setTimeout(() => winbar.style.display = "none"
            , 1500);
        }
    }

    
    checkWin() {
        //if player has reached the top, then they've won!
        if (this.row === 0 && this.timer === 0) {
            document.getElementById("win-bar").style.display = "block";
            //let the player stay in the top    
            this.timer = setTimeout(reset, 700);
        }
    }
    

    handleInput(keyCode) {
        switch (keyCode) {
            case 'left':
                if (this.col > 0) {
                    this.update(-1);
                }
                break;

            case 'right':
                if (this.col < numCols - 1) {
                    this.update(1);
                }
                break;

            case 'up':
                if (this.row > 0) {
                    this.update(0, -1);
                }
                break;

            case 'down':
                if (this.row < numRows -1) {
                    this.update(0, 1);
                }
                break;
        }
    };
}


//spawning enemines during init
function spawnEnemies(amount) {
    for (let i = 0; i < amount; i++) {
        //randomizing col, row and speed
        allEnemies.push(new Enemy(getRndInteger(0,4), getRndInteger(1,3), getRndInteger(2,3)));
    }
}

//spawns enemies and gives them random location and speed
spawnEnemies(4);
let player = new Player();

//resets the game
function reset() {
    player.reset();
}

//utility function for generating random integers in a range
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
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

