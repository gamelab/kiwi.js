/**
* This script is a demonstration of how you can rotate a entity in Kiwi.
* This can be any entity!
* Meaning it could be a static image or a sprite.
**/
var Rotation = new Kiwi.State('Rotation');

Rotation.preload = function () {
    this.addSpriteSheet('snake', 'assets/spritesheets/snake.png', 150, 117);
}

Rotation.create = function () {
    this.game.stage.resize(800, 250);

    /**
    * When you want to scale an entity down you can access the transform property that is located on every entity.
    * Note: Some entities have the scaleX/scaleY aliased for ease of use.
    **/
    //Create the snake
    this.snakeA = new Kiwi.GameObjects.Sprite(this, this.textures.snake, 10, 30);
    this.addChild(this.snakeA);

    //Create the second snake
    this.snakeB = new Kiwi.GameObjects.StaticImage(this, this.textures.snake, 300, 20);
    this.addChild(this.snakeB);

    /**
    * In order to change the rotation point you have to go to the transform object.
    * Note that the coordinates here are in relation to the entities coordinates.
    * E.g. 0,0 will be the top left corner of the entity.
    *
    * By default the rotation point is the center.
    **/
    this.snakeB.transform.rotPointX = 0;
    this.snakeB.transform.rotPointY = 0;

    this.snakes = new Kiwi.Group(this);

    this.snakes.x = 500;
    this.snakes.y = 50;

    var s1 = new Kiwi.GameObjects.Sprite(this, this.textures.snake, 100, 0);
    var s2 = new Kiwi.GameObjects.Sprite(this, this.textures.snake, -100, 0);

    this.snakes.addChild(s1);
    this.snakes.addChild(s2);

    this.addChild(this.snakes);
}

Rotation.update = function () {
    Kiwi.State.prototype.update.call(this);
    this.snakes.rotation += 0.05;

    /**
    * Rotate the sprites by 1 degree in opposite directions.
    **/
    this.snakeA.transform.rotation += Kiwi.Utils.GameMath.degreesToRadians(1);
    this.snakeB.rotation -= Kiwi.Utils.GameMath.degreesToRadians(1);
}



//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', Rotation,  gameOptions);