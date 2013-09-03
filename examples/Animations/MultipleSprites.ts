/// <reference path="../../src/Kiwi.ts" />

class MultipleSprites extends Kiwi.State {

    constructor() {
        super('MultipleSprites');
    }

    preload() {
        this.addSpriteSheet('zombie', 'assets/zombieSprite.png', 150, 117);
    }

    public zombieA: Kiwi.GameObjects.Sprite;
    public zombieB: Kiwi.GameObjects.Sprite;
    public zombieC: Kiwi.GameObjects.Sprite;
    
    create() {

        this.textures.zombie.sequences.push(new Kiwi.Animation.Sequence('walkright', [1, 2, 3, 4, 5, 6], 0.1, true));
        this.textures.zombie.sequences.push(new Kiwi.Animation.Sequence('liedown', [0, 7, 8], 0.15, false));
        this.textures.zombie.sequences.push(new Kiwi.Animation.Sequence('explode', [11, 12, 13, 14, 15], 0.05, false));

        this.zombieA = new Kiwi.GameObjects.Sprite(this.textures.zombie, 100, 10);
        this.zombieB = new Kiwi.GameObjects.Sprite(this.textures.zombie, 300, 10);
        this.zombieC = new Kiwi.GameObjects.Sprite(this.textures.zombie, 500, 10);
        
        this.addChild(this.zombieA);
        this.addChild(this.zombieB);
        this.addChild(this.zombieC); 

        this.zombieA.input.onRelease.add(this.walk, this); 
        this.zombieB.input.onRelease.add(this.liedown, this);
        this.zombieC.input.onRelease.add(this.explode, this);
    }

    walk() {
        this.zombieA.animation.play('walkright');
    }

    liedown() {
        this.zombieB.animation.play('liedown');
    }

    explode() {
        this.zombieC.animation.play('explode');
    }

}