/// <reference path="../../src/Kiwi.ts" />

    export class ColorComponent extends Kiwi.State {

        constructor() {

            super('ColorComponent');

        }

        zombie: Kiwi.GameObjects.Sprite;
        zombie2: Kiwi.GameObjects.Sprite;
        zombie3: Kiwi.GameObjects.Sprite;

        preload() {

            this.addImage('zombie', 'assets/zombie.png');
        }

        create() {

            this.zombie = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 7, 40);
            this.zombie2 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 138, 40);
            this.zombie3 = new Kiwi.GameObjects.Sprite('zombie', this.game.cache, 269, 40);

            this.zombie2.components.add(new Kiwi.Components.Color(50, 200, 60));
            this.zombie2.components.add(new Kiwi.Components.Color(150, 0, 150));

            this.addChild(this.zombie);
            this.addChild(this.zombie2);
            this.addChild(this.zombie3);

        }

        update() {

            super.update();


        }


    }

