/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can use the ArcadePhysics Component that are on TileMaps to Interact with another GameObject with ArcadePhysics to create a basic Platformer Game.
*
**/

class TilemapPlatformer extends Kiwi.State {

    constructor() {
        super('TilemapPlatformer');
    }

    preload() {
        //Load in our Tilemap Spritesheet. We will be using this for our tile assets.
        this.addSpriteSheet('desertSpritesheet', 'assets/war/tiles/tile-spritesheet.png', 48, 48);

        //Load in our Character
        this.addSpriteSheet('desertSoldier', 'assets/war/characters/desert-soldier.png', 150, 117);

        //Make the stage a bit smaller for now.
        this.game.stage.resize(800, 250);
    }

    tilemap: Kiwi.GameObjects.Tilemap.TileMap;
    soldier: CustomSoldier;

    create() {

        //Create the Tilemap. We don't pass in the json or the atlas at this stage since we aren't creating it using a JSON file
        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this);

        //Sets the properties of the tilemap. You don't have to do this and can provide it when you create your tilemap but it is easier to do at this stage as it will then be inherited by default. 
        this.tilemap.setTo(48, 48, 17, 6)

        // Create's a bunch of tiletypes based on an list of cellIndexs we want to use for each one.
        this.tilemap.createTileTypes([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

        //Give the tile types we have added collision areas.
        for (var i = 1; i < this.tilemap.tileTypes.length; i++)
            this.tilemap.tileTypes[i].allowCollisions = Kiwi.Components.ArcadePhysics.ANY;

        this.tilemap.createTileTypes([32, 35]);

        //Create our tilemap. Tilemap data in Kiwi is a 1D array.
        var tilemapdata = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0,
            6, 0, 3, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 10, 11, 4, 4,
            6, 0, 7, 8, 8, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8,
            6, 0, 7, 8, 8, 8, 9, 0, 3, 4, 5, 0, 0, 0, 0, 7, 8,
        ];

        // Create our TileMapLayer.
        this.tilemap.createNewLayer('Desert', this.textures.desertSpritesheet, tilemapdata);

        //Add the layer to the state.
        this.addChild(this.tilemap.layers[0]);

        //Create our Character
        this.soldier = new CustomSoldier(this, this.textures.desertSoldier, 96, 20);
        this.addChild(this.soldier);

        //Add in all of the animations it has
        this.soldier.animation.add('walking', [1, 2, 3, 4, 5, 6], 0.09, true);
        this.soldier.animation.add('idle', [0], 0.1, false, true);
        this.soldier.animation.add('goingUp', [9], 0.1, false);
        this.soldier.animation.add('goingDown', [10], 0.1, false);
    }

    update() {
        //update the base state
        super.update();

        //Move the player/character
        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
            this.soldier.scaleX = -1;
            this.soldier.physics.velocity.x = -15;
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
            this.soldier.scaleX = 1;
            this.soldier.physics.velocity.x = 15;
        } else {
            this.soldier.physics.velocity.x = 0;
        }

        //Check for collisions
        this.tilemap.layers[0].physics.overlapsTiles(this.soldier, true);

        //Are we on the ground?
        if (this.soldier.physics.isTouching(Kiwi.Components.ArcadePhysics.DOWN)) {

            //Does the player want to up?
            if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.UP)) {
                this.soldier.physics.velocity.y = -30;
                this.soldier.animation.play('goingUp');

                //No velocity? Ok then we are standing still....duh de doo
            } else if (this.soldier.physics.velocity.x == 0) {
                this.soldier.animation.play('idle');

                //Not jumping or standing still? Then lets walk  (and we aren't already)
            } else if (this.soldier.animation.currentAnimation.name != 'walking') {
                this.soldier.animation.play('walking');

            }

            //So we're not touching the ground, are we going down?
        } else if (this.soldier.physics.velocity.y > 0) {
            this.soldier.animation.play('goingDown');
        }

    }

}

class CustomSoldier extends Kiwi.GameObjects.Sprite {

    constructor(state, texture, x, y) {
        super(state, texture, x, y);

        //Lets modify out hitbox so that it is more representative of our actual location
        this.box.hitbox = new Kiwi.Geom.Rectangle(40, 38, 43, 80);

        //Now lets add the ArcadePhysics Component to our new GameObject
        this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
        this.physics.acceleration.y = 4;
    }

    physics: Kiwi.Components.ArcadePhysics;

    //Update Loop
    update() {
        super.update();

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