/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can use ArcadePhysics to resolve collisions against a group of GameObjects
*
**/

class CollisionWithGroups extends Kiwi.State {

    constructor() {
        super('CollisionWithGroups');
    }

    preload() {

        //Load in our assets...
        this.addSpriteSheet('choppa', 'assets/war/characters/choppa-mounted.png', 150, 117);
        this.addImage('rocket', 'assets/static/bullet-rocket.png');

        //Make the stage a bit smaller for now.
        this.game.stage.resize(800, 250);
    }

    bulletGroup: Kiwi.Group;
    helicopter: CustomObject;

    create() {

        //Create our Choppa
        this.helicopter = new CustomObject(this, this.textures.choppa, 100, 80);
        this.helicopter.box.hitbox = new Kiwi.Geom.Rectangle(40, 38, 86, 80);
        this.addChild(this.helicopter);
        this.helicopter.animation.add('moving', [1, 2, 3, 4, 5, 6], 0.1, true, true);

        //Create our bullet group.
        this.bulletGroup = new Kiwi.Group(this);
        this.addChild(this.bulletGroup);


        //Create a few bullets
        for (var i = 0; i < 6; i++) {

            //Create the bullet objects off screen and at random points.
            var bullet = new CustomObject(this, this.textures.rocket, this.game.stage.width + Math.random() * this.game.stage.width, this.game.stage.height * Math.random());
            bullet.scaleX = -1; //Flip the bullets so that they are flying towards the helicopter
            bullet.physics.velocity.x = -5; //Make the bullets move towards the helicopter
            this.bulletGroup.addChild(bullet); //Add them

        }

    }

    update() {
        //update the base state
        super.update();

        /*
        * Since we want the bullets to constantly keep coming we will loop through the Groups members and check for collisions ourselves 
        * BUT the ArcadePhysics Component also contains 'overlapsGroup' and 'overlapsArray' methods you can use. 
        */

        for (var i = 0; i < this.bulletGroup.members.length; i++) {
            var overlaped = this.helicopter.physics.overlaps(<Kiwi.Entity>this.bulletGroup.members[i], false);

            if (this.bulletGroup.members[i].x + (<Kiwi.Entity>this.bulletGroup.members[i]).width < 0 || overlaped) {

                this.bulletGroup.members[i].x = this.game.stage.width + 100;
                this.bulletGroup.members[i].y = this.game.stage.height * Math.random();

            } 

        }


    }

}

//Create a new Custom Tank GameObject
class CustomObject extends Kiwi.GameObjects.Sprite {

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

var game = new Kiwi.Game('game', 'KiwiExample', CollisionWithGroups, gameOptions);  