/// <reference path="../../src/Kiwi.ts" />

class TextureAtlas extends Kiwi.State {

    constructor() {
        super('TextureAtlas');
    }

    preload() {
        this.addTextureAtlas('atlasImage', 'assets/textureatlas/1945_sprites.png', 'atlasJson', 'assets/textureatlas/atlas.min.json'); 
    }

    public orangeEnemy: Kiwi.GameObjects.Sprite;
    public blueEnemyA: Kiwi.GameObjects.Sprite;
    public blueEnemyB: Kiwi.GameObjects.Sprite;
    public greenEnemyA: Kiwi.GameObjects.Sprite;
    public greenEnemyB: Kiwi.GameObjects.Sprite;

    public playerPlane: Kiwi.GameObjects.Sprite;

    public submarineA: Kiwi.GameObjects.Sprite;
    public submarineB: Kiwi.GameObjects.Sprite;

    create() {

        this.submarineA = new Kiwi.GameObjects.Sprite(this.textures.atlasImage, 120, 400);
        this.submarineB = new Kiwi.GameObjects.Sprite(this.textures.atlasImage, 670, 400);
        this.submarineA.animation.play('submarineRise');
        this.submarineB.animation.play('submarineRise');

        this.blueEnemyA = new Kiwi.GameObjects.Sprite(this.textures.atlasImage, 80, 100);
        this.blueEnemyB = new Kiwi.GameObjects.Sprite(this.textures.atlasImage, 680, 100);
        this.blueEnemyA.animation.play('enemyBlueIdle');
        this.blueEnemyB.animation.play('enemyBlueIdle');

        this.orangeEnemy = new Kiwi.GameObjects.Sprite(this.textures.atlasImage, 380, 200);
        this.orangeEnemy.animation.play('enemyOrangeIdle');
        
        this.greenEnemyA = new Kiwi.GameObjects.Sprite(this.textures.atlasImage, 230, 150);
        this.greenEnemyB = new Kiwi.GameObjects.Sprite(this.textures.atlasImage, 530, 150);
        this.greenEnemyA.animation.play('enemyGreenIdle');
        this.greenEnemyB.animation.play('enemyGreenIdle');

        this.playerPlane = new Kiwi.GameObjects.Sprite(this.textures.atlasImage, 365, 300);
        this.playerPlane.animation.play('Player');

        this.blueEnemyA.input.onRelease.add(this.spinB, this);
        this.blueEnemyB.input.onRelease.addOnce(this.flipB, this);
        this.orangeEnemy.input.onRelease.add(this.spinO, this);
        this.greenEnemyA.input.onRelease.addOnce(this.flipG, this);
        this.greenEnemyB.input.onRelease.add(this.spinG, this);

        this.playerPlane.input.onRelease.addOnce(this.submarinesAreGo, this);

        this.addChild(this.blueEnemyA);
        this.addChild(this.blueEnemyB);
        this.addChild(this.orangeEnemy);
        this.addChild(this.greenEnemyA);
        this.addChild(this.greenEnemyB);

        this.addChild(this.playerPlane);  

    }

    submarinesAreGo() {
        this.addChild(this.submarineA);
        this.addChild(this.submarineB);
    }

    spinB() {
        this.blueEnemyA.animation.play('enemyBlueSpin');
        this.blueEnemyA.animation.getAnimation('enemyBlueSpin').onStop.add(function () {
            this.blueEnemyA.animation.play('enemyBlueIdle');
        }, this);
    }
    flipB() {
        this.blueEnemyB.animation.play('enemyBlueFlip');
        this.blueEnemyB.animation.getAnimation('enemyBlueFlip').onStop.add(function () {
            this.blueEnemyB.animation.play('enemyBlueUpsidedown');
        }, this);
    }
    spinO() {
        this.orangeEnemy.animation.play('enemyOrangeSpin');
        this.orangeEnemy.animation.getAnimation('enemyOrangeSpin').onStop.add(function () {
            this.orangeEnemy.animation.play('enemyOrangeIdle');
        }, this);
    }
    flipG() {
        this.greenEnemyA.animation.play('enemyGreenFlip');
        this.greenEnemyA.animation.getAnimation('enemyGreenFlip').onStop.add(function () {
            this.greenEnemyA.animation.play('enemyGreenUpsidedown');
        }, this);
    }
    spinG() {
        this.greenEnemyB.animation.play('enemyGreenSpin');
        this.greenEnemyB.animation.getAnimation('enemyGreenSpin').onStop.add(function () {
            this.greenEnemyB.animation.play('enemyGreenIdle');
        }, this);
    }



}