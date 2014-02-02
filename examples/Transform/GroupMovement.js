/**
* This script is a demonstration of how you can apply transforms to a group and how it affects the gameobjects inside of it.
**/
var GroupMovement = new Kiwi.State('GroupMovement');

GroupMovement.init = function() {    
    this.numSnakes = 30;
    this.game.stage.resize(800, 250);
    this.direction = 'right';
}

GroupMovement.preload = function () {
    this.game.stage.resize(800, 250);
    this.addSpriteSheet('snake', 'assets/spritesheets/snake.png', 150, 117);
}

GroupMovement.create = function () {
    //to see information about animations look at the animation component section
    this.textures.snake.sequences.push(new Kiwi.Animations.Sequence('slither', [1, 2, 3, 4, 5, 6], 0.1, true));

    //create a new group and add it to the stage
    this.snakes = new Kiwi.Group(this);
    this.addChild(this.snakes);

    for (var i = 0; i < this.numSnakes; i++) {
        var s = new Kiwi.GameObjects.Sprite(this, this.textures.snake, Math.random() * this.game.stage.width, Math.random() * this.game.stage.height - 117);
        this.snakes.addChild(s);
        s.animation.play('slither');
    }
}

GroupMovement.update = function () {
    Kiwi.State.prototype.update.call(this);

    if (this.direction == 'right') {
        this.snakes.scaleX = 1;
        this.snakes.x += 3;

        if (this.snakes.x > this.game.stage.width) {
            this.direction = 'left';
            this.snakes.x *= 2;
        }
    } else {
        this.snakes.scaleX = -1;
        this.snakes.x -= 3;

        if (this.snakes.x < -150) {
            this.direction = 'right';
            this.snakes.x -= this.game.stage.width;
        }
    }
}



//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', GroupMovement,  gameOptions);