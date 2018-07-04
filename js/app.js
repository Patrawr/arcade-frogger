let allEnemies = [];
// Enemies our player must avoid
class Enemy {
    constructor(col, row) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.col = col;
        this.row = row;
        this.speed = 2;
        this.width = 100;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.col > numCols) {
            this.col = -1;
        }
        this.col += this.speed * dt;
        
        this.checkCollisions();
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.col * 101, this.row * 83 - 20);
    }

    checkCollisions() {
        if (this.row === player.row &&
            ((this.col >= player.col && this.col <= player.col + player.width) ||
            (this.col + this.width >= player.col && this.col + this.width <= player.col + player.width))
        ) {
            console.log("Collision!!");
        }
    }
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(col, row) {
        this.sprite = 'images/char-boy.png';
        this.col = col;
        this.row = row;
        this.x = 0;
        this.y = 0;
        this.height = 100;
        this.width = 100;
    }


    update(col = 0, row = 0) {
        this.col += col;
        this.row += row;

        this.x = this.col * 101;
        this.y = this.row * 83 - 30;
    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
let player = new Player(3,5);


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

