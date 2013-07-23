/// <reference path="../../src/Kiwi.ts" />

    export class SizeComponent extends Kiwi.State {

        constructor() {

            super('SizeComponent');

        }

        zombie: Kiwi.GameObjects.Sprite;
        zombie2: Kiwi.GameObjects.Sprite;
        zombie3: Kiwi.GameObjects.Sprite;

        preload() {

            this.addImage('zombie', 'assets/zombie.png');
        }

        create() {

            this.zombie = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 33, 40);
            this.zombie2 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 216, 40);
            this.zombie3 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 320, 180);

            this.zombie2.size.setTo(50, 100);
            this.zombie3.size.setTo(30, 41);

            this.addChild(this.zombie);
            this.addChild(this.zombie2);
            this.addChild(this.zombie3);
        }

        update() {

            super.update();

        }


    }

