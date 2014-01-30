/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can use add the ArcadePhysics Component onto GameObjects.
*
**/

class Basics extends Kiwi.State {

    constructor() {
        super('Basics');
    }

    preload() {

        //German TankTank, British Tank
        this.addSpriteSheet('btank', 'assets/war/characters/wwII-british-tank.png', 150, 117);
        this.addSpriteSheet('gtank', 'assets/war/characters/wwII-german-tank.png', 150, 117);

        //Make the stage a bit smaller for now.
        this.game.stage.resize(800, 250);
    }

    germantank: CustomTank;
    britishtank: CustomTank;

    create() {

        //Create our German Tank (CustomTank is a new Class we have created further down the page)
        this.germantank = new CustomTank(this, this.textures.gtank, 60, 120);
        this.addChild(this.germantank);

        //Create our British Tank (CustomTank is a new Class we have created further down the page)
        this.britishtank = new CustomTank(this, this.textures.btank, 600, 120);
        this.addChild(this.britishtank);
        this.britishtank.scaleX = -1; //Flip that tank to face the other way


        //Add in the animations for the tanks (and make them play)
        this.germantank.animation.add('walking', [1, 2, 3, 4, 5, 6], 0.09, true, true);
        this.britishtank.animation.add('walking', [1, 2, 3, 4, 5, 6], 0.09, true, true);

        //Make the tanks move on the x axis
        this.germantank.physics.acceleration.x = 1;
        this.britishtank.physics.acceleration.x = -1;

        //Make the tanks a bit bouncy!
        this.germantank.physics.elasticity = 0.5;
        this.britishtank.physics.elasticity = 0.5;
    }

    update() {
        //update the base state
        super.update();

        /*
        * Check to see if the german tank overlaps the british tank 
        * And if they do seperate them.
        * Param One - Other GameObject to check for a collision against.
        * Param Two - IF they overlap should they seperate?
        */
        this.germantank.physics.overlaps(this.britishtank, true);
    }

}

//Create a new Custom Tank GameObject
class CustomTank extends Kiwi.GameObjects.Sprite {

    constructor(state, texture, x, y) {
        super(state, texture, x, y);

        //Lets modify out hitbox so that it is more representative of our actual location
        this.box.hitbox = new Kiwi.Geom.Rectangle(40, 38, 86, 80);

        //Now lets add the ArcadePhysics Component to our new GameObject
        this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
    }

    physics: Kiwi.Components.ArcadePhysics;

    //Update Loop
    update() {
        super.update();
        //Update the component each frame
        this.physics.update();
    }

}


//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if (typeof gameOptions == "undefined") var gameOptions = {};

var game = new Kiwi.Game('game', 'KiwiExample', TilemapPlatformer, gameOptions); 