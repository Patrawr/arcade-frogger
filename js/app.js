let allEnemies = [];
// Enemies our player must avoid
class Enemy {
    constructor(col, row) {
        //loading the image for the enemy
        this.sprite = 'images/enemy-bug.png';
        this.col = col;
        this.row = row;
        this.x = 0;
        this.y = 0;
        this.speed = 2;
        this.width = 70;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        //checking if enemy has gone off screen, if so rest to left side of canvas (offscreen)
        if (this.col > numCols) {
            this.col = -1;
        }

        //add to the y position based on speed and univerals delta
        //speed can differ between enemies but they should all behave consistantly across devices
        this.col += this.speed * dt;

        //convert rows and columns to absolute x and y positions to be rendered onscreen
        this.x = this.col * 101;
        this.y = this.row * 83 - 20;
        
        this.checkCollisions();
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
class Player {
    constructor(col = 0 , row = 0) {
        this.sprite = 'images/char-boy.png';
        this.col = col;
        this.row = row;
        this.x = 0;
        this.y = 0;
        this.height = 100;
        this.width = 100;
        this.timer = 0;

        this.reset();
    }


    update(col = 0, row = 0) {
        this.col += col;
        this.row += row;

        this.x = this.col * 101;
        this.y = this.row * 83 - 30;

        //checks if the player has won by reaching the water
        this.checkWin();
    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //resets the player
    reset() {
        this.col = getRndInteger(0,4);
        this.row = getRndInteger(4,5);
        this.timer = 0;
    }

    
    checkWin() {
        if (this.row === 0 && this.timer === 0) {
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies.push(new Enemy(0,1));
let player = new Player();

//resets the game
function reset() {
    player.reset();
}

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

