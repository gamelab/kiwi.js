/**
* This script is a demonstration of how you can add callbacks to the input component.
**/
var InputComponent = new Kiwi.State('InputComponent');
    
InputComponent.preload = function () {
    this.game.stage.resize(800, 250);
    this.addImage('ninja', 'assets/static/ninja.png');
    this.addImage('bullet', 'assets/static/bullet-normal.png');
}

InputComponent.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Click the ninja to make him fire!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //Create the ninja. Enable the input component by passing true.
    this.ninja = new Kiwi.GameObjects.Sprite(this, this.textures.ninja, 10, 10, true);
    this.addChild(this.ninja);

    /**
    * Add a callback to the onUp event.
    * Other events are:
    * onDown
    * onEntered
    * onLeft
    **/
    this.ninja.input.onUp.add(this.shoot, this);

    //create a new array to hold the bullets
    this.bullets = [];
}

//The modern day ninja shoots
InputComponent.shoot = function () {
    //create a new bullet. StaticImage will do here since we don't want to do any collision or animation that involves spritesheets.
    var bullet = new Kiwi.GameObjects.StaticImage(this, this.textures.bullet, this.ninja.x + this.ninja.width, this.ninja.y + this.ninja.height / 2);
    this.addChild(bullet);
    this.bullets.push(bullet);
}

InputComponent.update = function () {
    Kiwi.State.prototype.update.call(this);

    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].x += 10;
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

var game = new Kiwi.Game('game', 'KiwiExample', InputComponent,  gameOptions);