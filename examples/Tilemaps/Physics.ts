/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of how you can make an object collide with a tilemap in Kiwi.
**/

class Physics extends Kiwi.State {

    constructor() {
        super('Physics');
    }

    preload() {
        this.addSpriteSheet('desertImage', 'assets/war/tiles/tile-spritesheet.png', 48, 48);
        this.addJSON('desertJson', 'assets/war/json/desert.json');
        this.addSpriteSheet('mujahadeen', 'assets/war/characters/mujahadeen.png', 150, 117, true);
    }

    muja: MujaSprite;
    tilemap: Kiwi.GameObjects.Tilemap.TileMap;
    upPressed: boolean = false;
    vy: number = -5;
    down: boolean = false;
    pointer: Kiwi.Input.Pointer;

    create() {


        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this);
        this.tilemap.createFromFileStore('desertJson', this.textures.desertImage, Kiwi.GameObjects.Tilemap.TileMap.FORMAT_TILED_JSON);
        this.addChild(this.tilemap);
        this.tilemap.setCollisionRange(0, 35, Kiwi.Components.ArcadePhysics.ANY, true);

        this.muja = new MujaSprite(this, this.textures.mujahadeen, 300, 0);
        this.muja.animation.add('moving', [1, 2, 3, 4, 5, 6], 0.1, true, false);
        this.muja.animation.switchTo('moving', true);
        this.muja.animation.stop();

        this.addChild(this.muja);

        if (Kiwi.DEVICE.touch) {
            this.game.input.touch.maximumPointers = 1;
            this.game.input.onDown.add(this.move, this);
            this.game.input.onUp.add(this.stop, this);
        }
    }

    move(x, y,timeUp,timeDown,duration,pointer) {
        this.down = true;
        this.pointer = pointer;
    }

    stop() {
        this.down = false;
        this.pointer = null;
    }

    update() {
        super.update();

        if (Kiwi.DEVICE.touch == false) {
            if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
                this.muja.x -= 5;
                this.muja.animation.resume();
                this.muja.scaleX = -1;
            } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
                this.muja.x += 5;
                this.muja.animation.resume();
                this.muja.scaleX = 1;
            } else {
                this.muja.animation.pause();
            }

            if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.UP) && this.upPressed == false) {
                this.vy = 15;
                this.upPressed = true;
            } else if (this.game.input.keyboard.isUp(Kiwi.Input.Keycodes.UP)) {
                this.upPressed = false;
            }

        } else {
            if (this.down) {
                if (this.pointer.x > this.game.stage.width / 2) {
                    this.muja.x += 5;
                    this.muja.animation.resume();
                    this.muja.scaleX = 1;
                } else {
                    this.muja.x -= 5;
                    this.muja.animation.resume();
                    this.muja.scaleX = -1;
                }
            } else {
                this.muja.animation.pause();
            }
        }

        if (this.vy > -9) this.vy--;

        this.muja.y -= this.vy;

        this.tilemap.collideSingle(this.muja);
    }


}

class MujaSprite extends Kiwi.GameObjects.Sprite {

    constructor(state, texture, x,y,input=false) {
        super(state, texture, x, y, input);
        this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this));
    }

    physics: Kiwi.Components.ArcadePhysics;

    update() {
        super.update();
        this.physics.update();
    }

}