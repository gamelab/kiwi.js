/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can add Objects to Groups, and then rotate the Group to also affect the GameObjects inside of it.
**/

class GroupRotation extends Kiwi.State {

    constructor() {
        super('GroupRotation');
    }

    preload() {
        this.game.stage.resize(800, 250);
        this.addImage('rocket', 'assets/static/bullet-rocket.png');
    }

    rockets1: Kiwi.Group;
    rockets2: Kiwi.Group;

    create() {

        //Create Two Rocket Groups and add them to the stage.
        this.rockets1 = this.createRockets(100, (this.game.stage.height / 2) - 50);
        this.rockets2 = this.createRockets(600, (this.game.stage.height / 2) - 50);

        //You can try to move the Rotation Point of a Group but it will not work.
        this.rockets2.transform.rotPointX = 400;
    }

    update() {
        super.update();

        //Rotate the Groups
        this.rockets1.rotation += 0.05;
        this.rockets2.rotation += 0.025;
    }

    //Creates a new Rocket group at the position passed. 
    createRockets(x,y):Kiwi.Group {

        //Create a new Group and add it to the stage
        var rockets = new Kiwi.Group(this);
        rockets.x = x;
        rockets.y = y;
        this.addChild(rockets);

        //Create a few new Rockets.
        /*
        * Because you can't move a groups point of Rotation we are going to add the rockets around the Groups normal position (which will be its RotationPoint).
        * This is so that when it is rotated the individual items will move around that point and maintain the V shape.
        */
        var half = 45;
        rockets.addChild(new Kiwi.GameObjects.StaticImage(this, this.textures.rocket, 0, 0));          //Middle 
        rockets.addChild(new Kiwi.GameObjects.StaticImage(this, this.textures.rocket, half, half));    //Right 
        rockets.addChild(new Kiwi.GameObjects.StaticImage(this, this.textures.rocket, -half, half));   //Left

        //Rotate them individually, Just to make them face the same way.
        for (var i = 0; i < rockets.members.length; i++) {
            rockets.members[i].rotation = -Math.PI / 2;
        }

        //Return the Rockets
        return rockets;
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

var game = new Kiwi.Game('game', 'KiwiExample', GroupRotation, gameOptions);