/**
* This script is a demonstration of how you can programmtically create a texture atlas (or image or sprite sheet)
* WARNING:Make sure you understand the performance implications of doing this - see below
**/
var GenSprite = new Kiwi.State('Sprite');

GenSprite.preload = function () {
    this.game.stage.resize(800, 250);
    
}

GenSprite.create = function () {
  
    //Create a canvas to draw on and draw some stuff on it
    this.spriteCanvas = document.createElement("canvas");
    this.spriteCanvas.width = 256;
    this.spriteCanvas.height = 256;
    this.ctx = this.spriteCanvas.getContext("2d");
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(30, 30, 80, 80);
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(40, 40, 60, 60);
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(50, 50, 40, 40);
    this.ctx.fillStyle = "yellow";

    //Create a new textureAtlas - in this case a SingleImage, and pass the canvas as the image.
    this.genAtlas = new Kiwi.Textures.SingleImage("mySprite", this.spriteCanvas);
    //add the new tlas to the texturelibrary
    this.textureLibrary.add(this.genAtlas);
    //create a sprite
    this.genSprite = new Kiwi.GameObjects.Sprite(this, this.textures.mySprite, 200, 100);
    this.addChild(this.genSprite);

}

var t = 0;

GenSprite.update = function () {
    Kiwi.State.prototype.update.call(this);
    //move the sprite
    this.genSprite.x++;

    //you can keep drawing on the canvas 
    this.ctx.beginPath();
    this.ctx.arc(0, 0, t++, 0, Math.PI * 2);
    this.ctx.fill();
    //IMPORTANT: if you update a canvas you need to mark the textureAtlas as dirty if using WebGL.
    // This will force a reupload of the texture - this is a very time consuming operation, so you normally would
    // not want to be doing this every frame. It's intended more for text fields and the like that get updated occaionally.
    // this particular example is very inefficient in WebGL because of this.
    this.genAtlas.dirty = true;


}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if(typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', GenSprite, gameOptions);