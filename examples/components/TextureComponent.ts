/// <reference path="../../src/Kiwi.ts" />

    export class TextureComponent extends Kiwi.State {

        constructor() {

            super('TextureComponent');

        }

        zombie: Kiwi.GameObjects.Sprite;
        zombie2: Kiwi.GameObjects.Sprite;
        zombie3: Kiwi.GameObjects.Sprite;

        preload() {

            this.addImage('zombie', 'assets/zombie.png');
            this.addImage('spartan', 'assets/spartan.png');
            this.addImage('indiana', 'assets/indiana.png');
        }

        create() {

            this.zombie = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 7, 40);
            this.zombie2 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 138, 40);
            this.zombie3 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 269, 40);

            this.zombie2.texture = new Kiwi.Components.Texture('spartan', this.game.cache);
            this.zombie3.texture = new Kiwi.Components.Texture('indiana', this.game.cache);

            this.addChild(this.zombie);
            this.addChild(this.zombie2);
            this.addChild(this.zombie3);
        }

        update() {

            super.update();

        }


    }

