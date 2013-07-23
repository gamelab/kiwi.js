/// <reference path="../../src/Kiwi.ts" />

    export class AlphaComponent extends Kiwi.State {

        constructor() {

            super('AlphaComponent');

        }

        zombie: Kiwi.GameObjects.Sprite;
        zombie2: Kiwi.GameObjects.Sprite;

        preload() {

            this.addImage('zombie', 'assets/zombie.png');
        }

        create() {

            this.zombie = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 33, 40);
            this.zombie2 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 216, 40);

            this.zombie.alpha.alpha(0.8);
            this.zombie2.alpha.alpha(0.2);

            this.addChild(this.zombie);
            this.addChild(this.zombie2);
        }

        update() {

            super.update();

        }


    }
