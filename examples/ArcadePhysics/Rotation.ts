/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can use add the ArcadePhysics Component onto GameObjects and use the Angular portion of the Component.
*
**/

class Rotation extends Kiwi.State {

    constructor() {
        super('Rotation');
    }

    preload() {

        //Load in the Rocket
        this.addImage('rocket', 'assets/static/bullet-rocket.png');

        //Make the stage a bit smaller for now.
        this.game.stage.resize(800, 250);
    }

    create() {

        //Create a Rocket
        var rocket = new CustomRocket(this, this.textures.rocket, 100, 80);
        this.addChild(rocket);

        //Rotate the Rocket
        rocket.physics.angularVelocity = 1;


        //Create another Rocket
        var rocket2 = new CustomRocket(this, this.textures.rocket, 500, 80);
        this.addChild(rocket2);

        //Give the second rocket some acceleration and set a maximum amount to rotate
        rocket2.physics.angularAcceleration = 0.05;
        rocket2.physics.maxAngular = 3;

        //Change the rotation point of the Rocket
        rocket2.rotPointX = rocket2.width;

    }

}

//Create a new Custom Rocket GameObject
class CustomRocket extends Kiwi.GameObjects.StaticImage {

    constructor(state, texture, x, y) {
        super(state, texture, x, y);

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

var game = new Kiwi.Game('game', 'KiwiExample', Rotation, gameOptions);  