/// <reference path="../../src/Kiwi.ts" />

  class AlphaComponent extends Kiwi.State {

        constructor() {

            super('AlphaComponent');

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

            this.zombie.alpha.alpha(0.8);
            this.zombie2.alpha.alpha(0.2);
            this.zombie3.alpha.alpha(1);

            this.addChild(this.zombie);
            this.addChild(this.zombie2);
            this.addChild(this.zombie3);
        }

        update() {

            super.update();
            if (this.zombie3.alpha.alpha() > 0)
                this.zombie3.alpha.alpha(this.zombie3.alpha.alpha() - 0.01);
            else
                this.zombie3.alpha.alpha(1);
        }


    }
