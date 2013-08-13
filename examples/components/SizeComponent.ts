/// <reference path="../../src/Kiwi.ts" />

   class SizeComponent extends Kiwi.State {

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


            //size component has been removed....
            this.zombie = new Kiwi.GameObjects.Sprite( this.textures.zombie, 33, 40);
            this.zombie2 = new Kiwi.GameObjects.Sprite(this.textures.zombie, 216, 40);
            this.zombie3 = new Kiwi.GameObjects.Sprite(this.textures.zombie, 320, 180);

            this.zombie2.width = 50;
            this.zombie2.height = 100;
            this.zombie3.width = 30;
            this.zombie3.height = 41;

            this.addChild(this.zombie);
            this.addChild(this.zombie2);
            this.addChild(this.zombie3);
        }

        update() {

            super.update();

        }


    }

