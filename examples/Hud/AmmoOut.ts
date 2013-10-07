/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of a few more basic HUD Widgets
**/

class AmmoOut extends Kiwi.State {

    constructor() {
        super('AmmoOut');
    }

    preload() {
        this.addSpriteSheet('desertBackdrop', 'assets/spritesheets/desert.png', 768, 512);
        this.addSpriteSheet('vc', 'assets/war/characters/vietcong-sheet-ak47.png', 150, 117);
        this.addImage('bulletHUD', 'assets/static/bullet-rotated.png');
        this.addImage('bullet', 'assets/static/bullet-normal.png');
    }

    vc: Kiwi.GameObjects.Sprite;
    bullets: Kiwi.GameObjects.StaticImage[];
    isDown: boolean = false;
    frameDelay: number = 10;
    currentFrame: number = 0;
    bulletCount: Kiwi.HUD.Widget.IconBar;

    create() {
        this.game.stage.height = 512;
        this.game.stage.width = 768;
        
        this.bullets = [];

        var background = new Kiwi.GameObjects.StaticImage(this, this.textures.desertBackdrop, 0, 0);
        background.cellIndex = 1;
        this.addChild(background);

        this.vc = new Kiwi.GameObjects.Sprite(this, this.textures.vc, 100, 300);
        this.addChild(this.vc);

        this.game.input.onDown.add(this.down, this);
        this.game.input.onUp.add(this.up, this);

        if (this.game.deviceTargetOption !== Kiwi.TARGET_BROWSER) this.game.input.touch.maximumPointers = 1;
        
        this.bulletCount = new Kiwi.HUD.Widget.IconBar(this.game, this.textures.bulletHUD, 30, 30, 10, 10);
        this.game.huds.defaultHUD.addWidget(this.bulletCount);

       
    }

    down() {
        this.isDown = true;
    }

    up() {
        this.isDown = false;
    }

    update() {
        super.update();

        if (this.isDown) {
            this.currentFrame++;

            if (this.currentFrame >= this.frameDelay) {
                this.currentFrame = 0;
                this.spawnBullet();
            }
        } else {
            if (this.currentFrame < this.frameDelay) this.currentFrame++;
        }

        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.SPACEBAR) && this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.SHIFT)) {
            this.bulletCount.range.current = 30;
        }

        //move the bullets 
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].x += 7;
            if (this.bullets[i].x > this.game.stage.width) { 
                this.removeChild(this.bullets[i], true);
                this.bullets.splice(i, 1);
                i--;
            }
        }
    }

    spawnBullet() {
        if (this.bulletCount.range.current >= this.bulletCount.range.min) {
            this.bulletCount.range.current--;
            this.bullets.push(new Kiwi.GameObjects.StaticImage(this, this.textures.bullet, this.vc.x + this.vc.width - 20, this.vc.y + this.vc.height / 2 + 10));
            this.addChild(this.bullets[this.bullets.length - 1]);
        }
    }

}
