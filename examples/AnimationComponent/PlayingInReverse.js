/**
* This script is a demonstration of how you can go to the reverse an animation.
**/
var PlayingInReverse = new Kiwi.State('PlayingInReverse');
    
PlayingInReverse.preload = function () {
    this.game.stage.resize(800, 250);
    this.addSpriteSheet('zombie', 'assets/spritesheets/zombie.png', 150, 117);
}

PlayingInReverse.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Click anywhere make the zombie moonwalk!', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //Add to stage
    this.zombie = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, 300, 30);
    this.addChild(this.zombie);

    //Add the animation and make sure save the animation that we just added.
    this.walkAnim = this.zombie.animation.add('forwards', [1, 2, 3, 4, 5, 6], 0.2, true);
    this.zombie.animation.play('forwards');

    //When the animation gets clicked reverse it.
    this.zombie.input.onUp.add(this.reverse, this);
}

//Reverse the animation.  If the animation is currently not playing is reverse then reverse. If it is then play in reverse.
PlayingInReverse.reverse = function () {
    this.walkAnim.reverse = !this.walkAnim.reverse;
}
  


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', PlayingInReverse,  gameOptions);