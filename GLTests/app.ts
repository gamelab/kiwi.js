/// <reference path="../build/kiwi.d.ts" />



class GLTest1 extends Kiwi.State {

    constructor() {
        super('GLTest');
    }
    
    preload() {
       
        this.addImage('s3232', 'assets/s3232.png');
    }
    
    //where the pirate is saved.
    s3232: Kiwi.GameObjects.Sprite;

    create() {

       

        this.s3232 = new Kiwi.GameObjects.Sprite(this, this.textures.s3232, 100, 100);              //create the pirate
        this.addChild(this.s3232);                                                                   //add it to the state                    

    }

}


if (typeof gameOptions == "undefined") var gameOptions = {renderer:Kiwi.RENDERER_WEBGL};

var game = new Kiwi.Game('game', 'KiwiExample', GLTest1, gameOptions);