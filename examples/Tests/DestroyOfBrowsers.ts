/// <reference path="../../src/Kiwi.ts" />

class DestroyOfBrowsers extends Kiwi.State {

    constructor() {
        super('DestroyOfBrowsers');
    }

    zombies: Kiwi.Group;
    zombagNumber: number = 200;

    preload() {
        this.addSpriteSheet('zombie', 'assets/zombieSprite.png', 150, 117);
    }

    create() {
        this.zombies = new Kiwi.Group(this);
        this.addChild(this.zombies);
        this.spawnZombies();
        this.game.input.onUp.add(this.spawnZombies, this);
    }
    

    spawnZombies() {
        this.removeChild(this.zombies);
        var n = this.destroyUnused();
        console.log('Number removed', n);
        this.zombies = new Kiwi.Group(this);
        this.addChild(this.zombies);

        for (var i = 0; i < this.zombagNumber; i++) {

            var z = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, Math.random() * this.game.stage.width, Math.random() * this.game.stage.height)
            z.animation.play();
            this.zombies.addChild(z);

        }

    }

}